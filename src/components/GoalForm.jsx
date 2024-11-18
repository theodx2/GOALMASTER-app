import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useStore from '../store/useStore'

const GoalForm = () => {
  const addGoal = useStore((state) => state.addGoal)
  const [formData, setFormData] = useState({
    title: '',
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: '',
    subTasks: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addGoal({
      id: uuidv4(),
      ...formData,
      createdAt: new Date().toISOString(),
      completed: false
    })
    setFormData({
      title: '',
      specific: '',
      measurable: '',
      achievable: '',
      relevant: '',
      timeBound: '',
      subTasks: []
    })
  }

  return (
    <form onSubmit={handleSubmit} className="glass p-6 rounded-xl space-y-4">
      <input
        type="text"
        placeholder="Goal Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 rounded bg-white/10 border border-white/20"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Specific: What do you want to accomplish?"
          value={formData.specific}
          onChange={(e) => setFormData({ ...formData, specific: e.target.value })}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          placeholder="Measurable: How will you track progress?"
          value={formData.measurable}
          onChange={(e) => setFormData({ ...formData, measurable: e.target.value })}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          placeholder="Achievable: Is it realistic?"
          value={formData.achievable}
          onChange={(e) => setFormData({ ...formData, achievable: e.target.value })}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          placeholder="Relevant: Why is this important?"
          value={formData.relevant}
          onChange={(e) => setFormData({ ...formData, relevant: e.target.value })}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          placeholder="Time-bound: When do you want to achieve this?"
          value={formData.timeBound}
          onChange={(e) => setFormData({ ...formData, timeBound: e.target.value })}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
      >
        Add Goal
      </button>
    </form>
  )
}

export default GoalForm
