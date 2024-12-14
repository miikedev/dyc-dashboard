import { ThemeToggle } from "./components/theme-toggle"
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { ThemeProvider } from "./components/theme-provider"

import './App.css'

const darkModeAtom = atomWithStorage('darkMode', false)
const counter = atom(0)
import { Button } from './components/ui/button';
function App() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  const [count, setCounter] = useAtom(counter);
  const increment = () => setCounter(prev => prev + 1);
  const decrement = () => setCounter(next => next - 1);
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <h1>{count}</h1>
        <div className="my-3"></div>
        <Button onClick={increment}>increase</Button>
        <div className="my-3"></div>
        <Button onClick={decrement}>decrease</Button>
        <Button onClick={() => setDarkMode(!darkMode)}>toggle theme</Button>
      </ThemeProvider>
    </>
  )
}

export default App
