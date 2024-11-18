import React from 'react'
import useStore from '../store/useStore'
import { FaTrash, FaCheck } from 'react-icons/fa'

const GoalList = () => {
  const goals = useStore((state) => state.goals)
  const updateGoal = useStore((state) => state.updateGoal)
  const deleteGoal = useStore((state) => state.deleteGoal)

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="glass p-4 rounded-xl space-y-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{goal.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => updateGoal(goal.id, { ...goal, completed: !goal.completed })}
                className={`p-2 rounded ${
                  goal.completed ? 'bg-green-500' : 'bg-gray-500'
                }`}
              >
                <FaCheck className="text-white" />
              </button>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="p-2 bg-red-500 rounded"
              >
                <FaTrash className="text-white" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p><span className="font-semibold">Specific:</span> {goal.specific}</p>
            <p><span className="font-semibold">Measurable:</span> {goal.measurable}</p>
            <p><span className="font-semibold">Achievable:</span> {goal.achievable}</p>
            <p><span className="font-semibold">Relevant:</span> {goal.relevant}</p>
            <p><span className="font-semibold">Time-bound:</span> {goal.timeBound}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GoalList
