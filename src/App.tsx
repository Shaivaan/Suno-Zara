import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { RouterComp } from './Screens/Router/Router'
import { Toaster } from './components/ui/sonner';

function App() {

  return (
    <BrowserRouter>
        <Toaster />
        <RouterComp/>
    </BrowserRouter>
  )
}

export default App
