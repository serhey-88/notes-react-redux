import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  save,
  selectNotes,
  fetchNotes,
  selectStatus
} from './notesSlice';
import { Note } from './Note';

export function Notes(props) {
  const notes = useSelector(selectNotes);
  const notesStatus = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if(notesStatus === 'idle') {
      dispatch(fetchNotes())
    }
  }, [notesStatus, dispatch]);

  if(notesStatus === 'loading') {
    return <div>Loading</div>
  }

  const renderedNotes = notes.map((note) => {
    if (!note) {
      return null;
    }
    const noteElem = (<Note
      disabled={true}
      key={note.id}
      text={note.text}
      isArchived={note.isArchived}
      id={note.id}
    ></Note>);
    if (!note.isArchived && !props.archive) {
      return noteElem
    }
    if (note.isArchived && props.archive) {
      return noteElem
    }
    return null;
  });

  return (
    <div>
      {props.archive ? null : <button onClick={() => dispatch(save())}>Add</button>}
      <hr />
      {renderedNotes}
    </div>
  );
}
