import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'

const notesAdapter = createEntityAdapter();

const initialState = notesAdapter.getInitialState({
  status: 'idle',
  error: null,
  // notes: [] // was used before createEntityAdapter was added
});

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async () => {
    await timeout(1000);
    return [{text: 'fetched note', id: Date.now().toString()}];
  }
)

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    save(state, action) {
      if (!action.payload) {
        notesAdapter.addOne(state, { text: '', id: Date.now().toString(), isArchived: false });
        // state.notes.push({ text: '', id: Date.now().toString(), isArchived: false }); // was used before createEntityAdapter was added
      } else {
        const { id, text, isArchived } = action && action.payload
        // const existingNote = state.notes.find((note) => note.id === id)
        console.log(state.entities);
        const existingNote = state.entities[id];
        if (existingNote) {
          existingNote.text = text;
          existingNote.isArchived = isArchived;
        } else {
          // state.notes.push(action.payload) // was used before createEntityAdapter was added
        notesAdapter.addOne(state, action.payload);
          // notesAdapter.addOne(); // was used before createEntityAdapter was added
        }
      }
    },
  },
  extraReducers: {
    [fetchNotes.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchNotes.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // state.notes = state.notes.concat(action.payload) // was used before createEntityAdapter was added
      notesAdapter.upsertMany(state, action.payload);
    },

  }
})

export const saveAsync = (state, cb) => dispatch => {
  setTimeout(() => {
    dispatch(save(state));
    cb();
  }, 1000);
};

export const { save } = notesSlice.actions

// export const selectNotes = state => state.notes.notes; // was used before createEntityAdapter was added
export const selectStatus = state => state.notes.status;
// export const selectNote = (state, date) => selectNotes(state).find(({ id }) => id === date); // was used before createEntityAdapter was added

export const {
  selectAll: selectNotes,
  selectById: selectNote
} = notesAdapter.getSelectors(state => state.notes)

export default notesSlice.reducer
