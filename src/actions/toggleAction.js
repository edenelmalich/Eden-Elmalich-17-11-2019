import { SET_TOGGLE } from './typesActions';
export const CheckToggle = toggle => dispatch => {
  dispatch({
    type: SET_TOGGLE,
    payload: toggle
  });
};
