export async function getNotes() {
  const res = await fetch("/api/notes")
  if (res.ok)
    return await res.json()
  else
    throw new Error
}

export async function getNote(id: number | string) {
  const res = await fetch(`/api/note/${id}`)
  if (res.ok)
    return await res.json()
  else
    throw new Error
}

export async function createNote() {
  const res = await fetch(`/api/note`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(["", "", new Date().toISOString()])
  })
  if (res.ok)
    return await res.json()
  else
    throw new Error
}

export async function updateNote(id: number | string, updated_title: string, updated_text: string) {
  const res = await fetch(`/api/note/${id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([updated_title, updated_text, new Date().toISOString()])
  })
  if (res.ok)
    return await res.json()
  else
    throw new Error
}

export async function deleteNote(id: number | string) {
  //extract note id from path
  const res = await fetch(`/api/note/${id}`, {
    method: 'DELETE'
  })
  if (res.ok)
    return await res.json()
  else
    throw new Error
}

