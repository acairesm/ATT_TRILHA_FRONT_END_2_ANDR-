import type { Task } from '../App'

type Props = { task: Task; onToggle: (id: number) => void; onRemove: (id: number) => void }

export default function TaskItem({ task, onToggle, onRemove }: Props) {
  return (
    <li className="list-group-item d-flex align-items-center gap-2">
      <input
        type="checkbox"
        className="form-check-input m-0"
        aria-label="Concluída"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span className={task.done ? 'flex-grow-1 text-decoration-line-through text-muted' : 'flex-grow-1'}>
        {task.text}
      </span>
      <button className="btn btn-sm btn-outline-danger" onClick={() => onRemove(task.id)}>
        Remover
      </button>
    </li>
  )
}
