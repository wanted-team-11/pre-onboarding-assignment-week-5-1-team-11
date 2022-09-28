const CHANGEFIELD = "search/CHANGEFIELD";

export const handleChange = (input: string) => ({ type: CHANGEFIELD, input });

const initialState = {
  value: null,
};

interface ActionTypes {
  type: string;
  input: string;
}

const search = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case CHANGEFIELD:
      return {
        ...state,
        value: action.input,
      };
    default:
      return state;
  }
};

export default search;
