import { useCallback } from 'react';

export const indexDbUtils = {
  dbName: 'musicApp',
  storeNames: {
    likeSongs: 'likeSongs',
    likeAlbums : 'likeAlbums',
    likePlaylist : 'likePlaylist',
    likeArtist : 'likeArtist',
  }
};

interface UseIndexedDBResult {
  addItem: (data: any, key?: string | number,storeName?:string) => Promise<void>;
  removeItem: (key: string | number,storeName?:string) => Promise<void>;
  getItems : (storeName?:string) => Promise<any[]>;
}

interface UseIndexedDBOptions {
  storeName: string;
  version?: number;
}

export const useIndexedDB = ({ 
  storeName, 
  version = 2 
}: UseIndexedDBOptions): UseIndexedDBResult => {
  
  const openDB = useCallback((): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(indexDbUtils.dbName, version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create all possible stores to avoid future issues
        Object.values(indexDbUtils.storeNames).forEach(store => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
          }
        });
      };
    });
  }, [version]);

  const addItem = useCallback(async (data: any, key?: string | number,targetStoreName=storeName): Promise<void> => {
    try {
      const db = await openDB();
      const transaction = db.transaction([targetStoreName], 'readwrite');
      const store = transaction.objectStore(targetStoreName);
      
      if (key !== undefined) {
        await new Promise<void>((resolve, reject) => {
          const request = store.put({ ...data, id: key });
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      } else {
        await new Promise<void>((resolve, reject) => {
          const request = store.add(data);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }
      
      db.close();
    } catch (error) {
      console.error('Error adding item to IndexedDB:', error);
      throw error;
    }
  }, [openDB, storeName]);

  const removeItem = useCallback(async (key: string | number, targetStoreName=storeName): Promise<void> => {
    try {
      const db = await openDB();
      const transaction = db.transaction([targetStoreName], 'readwrite');
      const store = transaction.objectStore(targetStoreName);
      
      await new Promise<void>((resolve, reject) => {
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
      
      db.close();
    } catch (error) {
      console.error('Error removing item from IndexedDB:', error);
      throw error;
    }
  }, [openDB, storeName]);


const getItems = useCallback(async (targetStoreName=storeName): Promise<any[]> => {
  try {
    const db = await openDB();
    const transaction = db.transaction([targetStoreName], 'readonly');
    const store = transaction.objectStore(targetStoreName);
    
    const result = await new Promise<any[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
    
    db.close();
    return result;
  } catch (error) {
    console.error('Error getting items from IndexedDB:', error);
    throw error;
  }
}, [openDB, storeName]);

  return {
    addItem,
    removeItem,
    getItems
  };
};

const useIndexedDBLibSong = ()=>{
     const { addItem:addSongToDB, removeItem:removeSongFromDB, getItems:getLikedSongs } = useIndexedDB({ 
    storeName: indexDbUtils.storeNames.likeSongs 
  });
  return {addSongToDB,removeSongFromDB, getLikedSongs};
}

const useIndexedDbLibraryData = ()=>{
   const { addItem: addToLibrary, removeItem:removeFromLibrary, getItems:getLibraryData } = useIndexedDB({ 
    storeName: indexDbUtils.storeNames.likePlaylist 
  });
  return {addToLibrary, removeFromLibrary, getLibraryData};
};

export {useIndexedDBLibSong, useIndexedDbLibraryData};