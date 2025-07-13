import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { RouterComp } from './Screens/Router/Router'
import { Toaster } from './components/ui/sonner';
import ErrorBoundary from './Screens/ErrorBoundary/ErrorBoundary';

function App() {

  return (
    <BrowserRouter>
        <Toaster />
        <ErrorBoundary>
          <RouterComp/>
        </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
