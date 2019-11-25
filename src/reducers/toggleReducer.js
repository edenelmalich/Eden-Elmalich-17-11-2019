import { SET_TOGGLE } from '../actions/typesActions';

const initialState = {
  toggleCheck: false
};

const toggleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TOGGLE:
      return { ...state, toggleCheck: !payload };

    default:
      return state;
  }
};
export default toggleReducer;
