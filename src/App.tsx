import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'

export type Task = { id: number; text: string; done: boolean }
type Filter = 'todas' | 'pendentes' | 'concluidas'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => JSON.parse(localStorage.getItem('tasks') ?? '[]'))
  const [filter, setFilter] = useState<Filter>('todas')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function add(text: string) {
    const newTask = { id: Date.now(), text: text, done: false }
    setTasks([...tasks, newTask])
  }

  function toggle(id: number) {
    const newTasks = tasks.map(t => {
      if (t.id === id) return { ...t, done: !t.done }
      return t
    })
    setTasks(newTasks)
  }

  function remove(id: number) {
    const newTasks = tasks.filter(t => t.id !== id)
    setTasks(newTasks)
  }

  let visible = tasks
  if (filter === 'pendentes') visible = tasks.filter(t => !t.done)
  if (filter === 'concluidas') visible = tasks.filter(t => t.done)

  const pending = tasks.filter(t => !t.done).length

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h1 className="mb-4">Lista de tarefas</h1>
      <TaskForm onAdd={add} />

      <div className="btn-group my-3">
        <button
          className={filter === 'todas' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'}
          onClick={() => setFilter('todas')}
        >
          todas
        </button>
        <button
          className={filter === 'pendentes' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'}
          onClick={() => setFilter('pendentes')}
        >
          pendentes
        </button>
        <button
          className={filter === 'concluidas' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'}
          onClick={() => setFilter('concluidas')}
        >
          concluidas
        </button>
      </div>

      <ul className="list-group">
        {visible.map(t => (
          <TaskItem key={t.id} task={t} onToggle={toggle} onRemove={remove} />
        ))}
      </ul>

      <p className="text-muted mt-3">{pending} tarefa(s) pendente(s)</p>
    </div>
  )
}
