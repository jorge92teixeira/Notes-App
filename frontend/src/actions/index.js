/* eslint-disable no-plusplus */
let nextNoteId = 0;
export const addNote = (title, content) => (
  {
    type: 'ADD_NOTE',
    id: (nextNoteId++).toString(),
    title,
    content,
  }
);

export const setVisibilityFilter = (filter) => (
  {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  });

export const toggleNote = (id) => (
  {
    type: 'TOGGLE_NOTE',
    id,
  });
