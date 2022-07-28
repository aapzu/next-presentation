import { FC } from "react";
import styled from "styled-components";
import { Note as NoteType } from "../types";
import { DateTime } from "luxon";

const formatDate = (date: number) =>
  DateTime.fromMillis(date)
    .setZone("Europe/Helsinki")
    .toFormat("dd.MM.yyyy HH:mm");

const NoteRow = styled.a`
  display: flex;
  align-items: center;
  padding: 8px 32px;
  background-color: lightcoral;
  border-radius: 10px;
  margin-bottom: 8px;
  text-decoration: none;
  color: initial;
`;

const NoteText = styled.p`
  flex: 1;
`;

const NoteDate = styled.span`
  margin-right: 4px;
`;

const Note: FC<{
  note: NoteType;
  deleteNote?: (id: string) => Promise<void>;
}> = ({ note: { date, text, id }, deleteNote }) => {
  return (
    <NoteRow key={date} href={`/notes/${id}`}>
      <NoteText>{text}</NoteText>
      <NoteDate>{formatDate(date)}</NoteDate>
      {id && deleteNote && <button onClick={() => deleteNote(id)}>X</button>}
    </NoteRow>
  );
};
export default Note;
