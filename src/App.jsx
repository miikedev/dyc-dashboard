import { atom, useAtom } from 'jotai'

import './App.css'

const counter = atom(0)
import { Button } from './components/ui/button';
import { ThemeToggleButton } from './components/custom/themeToggleButton';
function App() {
  const [count, setCounter] = useAtom(counter);
  const increment = () => setCounter(prev => prev + 1);
  const decrement = () => setCounter(next => next - 1);
  return (
    <>
        <h1>{count}</h1>
        <div className="my-3"></div>
        <Button onClick={increment}>increase</Button>
        <div className="my-3"></div>
        <Button onClick={decrement}>decrease</Button>
        <div className="my-3"></div>
        <ThemeToggleButton/>

    </>
  )
}

export default App
