import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { RouterComp } from './Screens/Router/Router'
import { useEffect } from 'react'
import useZustandStore from './Zustand/store';
import useLocalStorage from './hooks/use-localstorage';
import { localStorageKeys } from './lib/utils';

function App() {
  const {getData} = useLocalStorage(localStorageKeys.volume);
  const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
  const handleStoreVolume = ()=> {
    const lsVolume = getData();
    const volume = lsVolume ? +lsVolume : 100
    handleMusicPlayer({volume});
  } 

  useEffect(()=>{
      handleStoreVolume();
  },[]) 

  return (
    <BrowserRouter>
        <RouterComp/>
    </BrowserRouter>
  )
}

export default App
