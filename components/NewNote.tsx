import { FC, FormEventHandler } from "react";
import styled from "styled-components";

const NewNoteContainer = styled.form`
  padding: 8px 0;
  display: flex;

  textarea {
    resize: none;
    flex: 1;
    height: 40px;
  }
`;

const NewNote: FC<{ onSubmit: FormEventHandler<HTMLFormElement> }> = ({
  onSubmit
}) => {
  return (
    <NewNoteContainer onSubmit={onSubmit}>
      <textarea name="text" />
      <button>Add</button>
    </NewNoteContainer>
  );
};

export default NewNote;
