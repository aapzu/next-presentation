import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import type { NextPage, NextPageContext } from "next";
import axios from "axios";
import { Note as NoteType } from "../../types";
import Note from "../../components/Note";

const Container = styled.div`
  max-width: 600px;
  height: 100%;
  padding: 0 16px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;

const NotesPage: NextPage<{ apiNote: NoteType | undefined }> = ({
  apiNote
}) => {
  const [note, setNote] = useState<NoteType | undefined>(apiNote);

  const getNote = useCallback(async () => {
    if (!apiNote?.id) return;
    const { data } = await axios.get(`/api/notes/${apiNote.id}`);
    setNote(data);
  }, [apiNote]);

  useEffect(() => {
    getNote();
  }, [getNote]);

  return <Container>{note && <Note note={note} />}</Container>;
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const { getNote } = await import("../api/notes/[id]");
  return {
    props: {
      apiNote: await getNote(id as string)
    }
  };
}

export default NotesPage;
