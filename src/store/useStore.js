import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      goals: [],
      darkMode: false,
      addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
      updateGoal: (id, updatedGoal) =>
        set((state) => ({
          goals: state.goals.map((goal) => (goal.id === id ? updatedGoal : goal)),
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        })),
      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'goals-storage',
    }
  )
)

export default useStore
