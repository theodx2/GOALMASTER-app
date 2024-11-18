import React, { useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import GoalForm from './components/GoalForm'
import GoalList from './components/GoalList'
import useStore from './store/useStore'

function App() {
  const darkMode = useStore((state) => state.darkMode)
  const toggleDarkMode = useStore((state) => state.toggleDarkMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen p-4 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">SMART Goals Tracker</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full glass"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <GoalForm />
        <GoalList />
      </div>
    </div>
  )
}

export default App
