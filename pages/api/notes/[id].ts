import type { NextApiRequest, NextApiResponse } from "next";
import { Low, JSONFile } from 'lowdb'
import { Note } from "../../../types";

let _db: Low<Note[]>

const getDb = () => {
  const adapter = new JSONFile<Note[]>('db.json')
  _db ||= new Low(adapter)
  return _db
}

export const getNote = async (noteId: string) => {
  const db = getDb()
  await db.read()
  db.data ||= []
  const note = db.data.find(({ id }) => id === noteId)
  return note
}

export const deleteNote = async (noteId: string) => {
  const db = getDb()
  await db.read()
  db.data ||= []
  db.data = db.data.filter(({ id }) => id !== noteId)
  await db.write()
};

export default async function handler(
  req: NextApiRequest & { method: string },
  res: NextApiResponse
) {
  const { id } = req.query
  if (req.method === 'GET') {
    const note = await getNote(id as string)
    res.send(note)
  } else if (req.method === "DELETE") {
    await deleteNote(id as string);
    res.end();
  } else {
    res.status(405).end();
  }
}
