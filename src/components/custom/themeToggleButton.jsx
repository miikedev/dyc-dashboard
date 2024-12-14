import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme-provider'
import { Button } from '../ui/button'

const ThemeToggleButton = () => {
    const { theme, setTheme } = useTheme()
    const renderedIcon = theme === 'dark' ? <Sun /> : <Moon />
    return (
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="m-3">{renderedIcon}</Button>
    )
}

export {ThemeToggleButton}