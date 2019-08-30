const note = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        id: action.id,
        title: action.title,
        content: action.content,
        completed: false,
      };
    case 'TOGGLE_NOTE':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

const notes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [
        ...state,
        note(undefined, action),
      ];
    case 'TOGGLE_NOTE':
      return state.map((n) => note(n, action));
    default:
      return state;
  }
};

export default notes;

export const getVisibleNotes = (state, filter) => {
  switch (filter) {
    case 'all':
      return state;
    case 'completed':
      return state.filter((n) => n.completed);
    case 'active':
      return state.filter((n) => !n.completed);
    default:
      throw new Error(`Unknow filter: ${filter}`);
  }
};
