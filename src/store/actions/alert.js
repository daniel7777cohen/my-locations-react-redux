import { SET_ALERT, REMOVE_ALERTS } from './constants';

export const setAlert = (msg, alertType) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
    },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERTS }), 3500);
};
