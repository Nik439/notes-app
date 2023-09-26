import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./database.db", 
  driver: sqlite3.Database,
});

export async function GET(req, context) {
  const {params} = context
  const note = await db.get("SELECT id, title, text FROM notes WHERE id = ?", params.id);

  return new Response(JSON.stringify(note), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function DELETE(req, context) {
  const {params} = context
  await db.run("DELETE FROM notes WHERE id = ?", params.id);

  return new Response(JSON.stringify(`Note with id:${params.id} was deleted`), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function PUT(req, context) {
  const {params} = context
  const res = await req.json()
  await db.run(`UPDATE notes SET title = ?, text = ?, last_update = ? WHERE id = ?`, ...res, params.id )

  return new Response(JSON.stringify(res), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}