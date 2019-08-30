/* eslint-disable no-plusplus */
import { v4 } from 'node-uuid';

export const addNote = (title, content) => (
  {
    type: 'ADD_NOTE',
    id: v4(),
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
