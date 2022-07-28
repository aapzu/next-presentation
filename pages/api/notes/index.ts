import type { NextApiRequest, NextApiResponse } from "next";
import { Low, JSONFile } from 'lowdb'
import { Note } from "../../../types";
import { v4 as uuid } from 'uuid'

let _db: Low<Note[]>

const getDb = () => {
  const adapter = new JSONFile<Note[]>('db.json')
  _db ||= new Low(adapter)
  return _db
}

const addNote = async (note: Note) => {
  const db = getDb()
  await db.read()
  db.data ||= []
  db.data.push(note)
  await getDb().write()
}

export const getNotes = async () => {
  const db = getDb()
  await db.read()
  db.data ||= []
  return getDb().data
};

export default async function handler(
  req: NextApiRequest & { method: string },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const note = { id: uuid(), ...req.body }
    await addNote(note);
    res.send(note);
  } else if (req.method === "GET") {
    const notes = await getNotes();
    res.send(notes);
  } else {
    res.status(405).end();
  }
}
