import { create } from 'zustand';

const useZustandStore = create<StateStoreType>((set) => ({
  // State
  isSidebarVisible: false,
  
  // Actions
  toggleMobileMenu: () => 
    set((state) => ({ isSidebarVisible: !state.isSidebarVisible })),
}));

export default useZustandStore;