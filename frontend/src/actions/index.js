/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
let nextNoteId = 0;
export const addNote = (title, content) => (
  {
    type: 'ADD_NOTE',
    id: (nextNoteId++).toString(),
    title,
    content,
  }
);
