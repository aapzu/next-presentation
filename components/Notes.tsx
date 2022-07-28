import { FC } from "react";
import styled from "styled-components";
import Note from "./Note";
import { Note as NoteType } from "../types";

const NotesContainer = styled.div`
  flex: 1;
  padding-top: 16px;
  overflow: auto;
`;

const Notes: FC<{
  notes: NoteType[];
  deleteNote: (id: string) => Promise<void>;
}> = ({ notes, deleteNote }) => (
  <NotesContainer>
    {notes?.map((note) => (
      <Note key={note.id} note={note} deleteNote={deleteNote} />
    ))}
  </NotesContainer>
);

export default Notes;
