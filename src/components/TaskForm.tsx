import { useState, type FormEvent } from 'react'

export default function TaskForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text.trim())
    setText('')
  }

  return (
    <form className="input-group" onSubmit={submit}>
      <input
        className="form-control"
        placeholder="Nova tarefa"
        aria-label="Nova tarefa"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="btn btn-success">Adicionar</button>
    </form>
  )
}
