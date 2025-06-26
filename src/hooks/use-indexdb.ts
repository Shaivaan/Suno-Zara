import { indexDbUtils } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';

interface BaseItem {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UseIndexedDBOptions {
  dbName: string;
  storeName: string;
  version?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface UseIndexedDBReturn<T extends BaseItem> {
  items: T[];
  loading: boolean;
  error: string | null;
  add: (item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => Promise<T>;
  edit: (id: number, updates: Partial<Omit<T, 'id' | 'createdAt'>>) => Promise<T>;
  remove: (id: number) => Promise<void>;
  clear: () => Promise<void>;
}

export function useIndexedDB<T extends BaseItem>({
  dbName,
  storeName,
  version = 1,
  sortBy = 'createdAt',
  sortOrder = 'desc'
}: UseIndexedDBOptions): UseIndexedDBReturn<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [db, setDb] = useState<IDBDatabase | null>(null);

  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      try {
        const request = indexedDB.open(dbName, version);
        
        request.onerror = () => {
          setError('Failed to open database');
          setLoading(false);
        };
        
        request.onsuccess = () => {
          setDb(request.result);
          setError(null);
        };
        
        request.onupgradeneeded = () => {
          const database = request.result;
          if (!database.objectStoreNames.contains(storeName)) {
            const store = database.createObjectStore(storeName, { 
              keyPath: 'id', 
              autoIncrement: true 
            });
            store.createIndex('createdAt', 'createdAt', { unique: false });
            store.createIndex('updatedAt', 'updatedAt', { unique: false });
          }
        };
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Database initialization failed');
        setLoading(false);
      }
    };

    initDB();
  }, [dbName, storeName, version]);

  // Load items when database is ready
  useEffect(() => {
    if (db) {
      loadItems();
    }
  }, [db]);

  const loadItems = useCallback(async () => {
    if (!db) return;
    
    try {
      setLoading(true);
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onsuccess = () => {
        const allItems = request.result as T[];
        const sortedItems = sortItems(allItems);
        setItems(sortedItems);
        setLoading(false);
      };
      
      request.onerror = () => {
        setError('Failed to load items');
        setLoading(false);
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items');
      setLoading(false);
    }
  }, [db, storeName, sortBy, sortOrder]);

  const sortItems = useCallback((itemsToSort: T[]): T[] => {
    return [...itemsToSort].sort((a, b) => {
      const aValue:any = a[sortBy as keyof T];
      const bValue:any = b[sortBy as keyof T];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [sortBy, sortOrder]);

  const add = useCallback(async (item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> => {
    if (!db) throw new Error('Database not initialized');
    
    const now = new Date();
    const newItem = {
      ...item,
      createdAt: now,
      updatedAt: now
    } as T;
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(newItem);
      
      request.onsuccess = () => {
        const addedItem = { ...newItem, id: request.result as number } as T;
        setItems(prevItems => sortItems([...prevItems, addedItem]));
        resolve(addedItem);
      };
      
      request.onerror = () => {
        reject(new Error('Failed to add item'));
      };
    });
  }, [db, storeName, sortItems]);

  const edit = useCallback(async (id: number, updates: Partial<Omit<T, 'id' | 'createdAt'>>): Promise<T> => {
    if (!db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const getRequest = store.get(id);
      
      getRequest.onsuccess = () => {
        const existingItem = getRequest.result as T;
        if (!existingItem) {
          reject(new Error('Item not found'));
          return;
        }
        
        const updatedItem = {
          ...existingItem,
          ...updates,
          updatedAt: new Date()
        } as T;
        
        const putRequest = store.put(updatedItem);
        
        putRequest.onsuccess = () => {
          setItems(prevItems => 
            sortItems(prevItems.map(item => item.id === id ? updatedItem : item))
          );
          resolve(updatedItem);
        };
        
        putRequest.onerror = () => {
          reject(new Error('Failed to update item'));
        };
      };
      
      getRequest.onerror = () => {
        reject(new Error('Failed to find item'));
      };
    });
  }, [db, storeName, sortItems]);

  const remove = useCallback(async (id: number): Promise<void> => {
    if (!db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      
      request.onsuccess = () => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        resolve();
      };
      
      request.onerror = () => {
        reject(new Error('Failed to delete item'));
      };
    });
  }, [db, storeName]);

  const clear = useCallback(async (): Promise<void> => {
    if (!db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      
      request.onsuccess = () => {
        setItems([]);
        resolve();
      };
      
      request.onerror = () => {
        reject(new Error('Failed to clear items'));
      };
    });
  }, [db, storeName]);

  return {
    items,
    loading,
    error,
    add,
    edit,
    remove,
    clear
  };
}


const useStoreVolume = ()=>{
    const { add, items, edit } = useIndexedDB<any>({
        dbName: indexDbUtils.dbName,
        storeName: indexDbUtils.storeNames.volume
    });

    const updateVolume = async(volume: number) => {
        const volumeId = items[0]?.id;
        if (volumeId) await edit(volumeId, { volume });
        else await add({ volume });
    };
    const volume = items[0]?.volume;

    return {volume, updateVolume};
}


export {useStoreVolume};