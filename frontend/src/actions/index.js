import axios from 'axios';
import { FETCH_NOTES } from './types';

const baseUrl = 'http://localhost:3001/api';
const testJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlMUB0ZXN0ZTEuY29tIiwiaWQiOiI1ZDVkMmEyNmUyMDIxZjJhOWNlY2IyMmIiLCJpYXQiOjE1NjYzODY3MzR9.JLMIxZ9h1KB72v-4Fl8xqzA6bk79AfY-ihONrFHCo8Y';

export const fetchNotes = () => async (dispatch) => {
  const response = await axios
    .get(`${baseUrl}/notes`, {
      headers: {
        Authorization: `bearer ${testJWT}`,
      }
    });

  dispatch({
    type: FETCH_NOTES,
    payload: response.data,
  })
};
