import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import {
  save,
  saveAsync,
  selectNote
} from './notesSlice';
import { useSelector, useDispatch } from 'react-redux';

export const Note = (props) => {
  const dispatch = useDispatch();
  let id = props.id;
  let textChangedByUser;

  if (props.match) {
    id = props.match.params.id;
  }
  const currentNote = useSelector((state) => selectNote(state, id));

  const [text, setText] = useState(props.text || currentNote.text);
  const [redirect, setRedirect] = useState(false);
  function handleChange(e) {
    setText(e.target.value);
    textChangedByUser = true;
  }

  function handleSave() { // can be used for saving without timeout
    dispatch(save({ id, text }));
  }

  function handleAsyncSave() {
    dispatch(saveAsync({ id, text }, () => setRedirect(true)))

  }

  const noteButton = props.disabled
    ? <Link to={`/edit/${props.id}`}>Edit</Link>
    // : <button onClick={handleSave}>Save</button>; // can be used for saving without timeout
    : <button onClick={handleAsyncSave}>Async Save</button>;

  function handleArchive() {
    const textForSave = textChangedByUser ? text : props.text;
    dispatch(save({ text: textForSave, id, isArchived: !props.isArchived }))
  }

  const archiveButtonHandler = props.isArchived
    ? <button onClick={handleArchive}>Restore</button>
    : <button onClick={handleArchive}>Move to Archive</button>;

  return (
    <div>
      <textarea value={text} onChange={handleChange} disabled={props.disabled}></textarea>
      {noteButton}
      {archiveButtonHandler}
      {redirect ? <Redirect push to="/" /> : null}
    </div>
  )
}