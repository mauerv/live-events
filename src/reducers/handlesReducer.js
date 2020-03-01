import { SET_HANDLE } from "constants/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HANDLE:
      return applySetHandle(state, action);
    default:
      return state;
  }
};

export const applySetHandle = (state, action) => ({
  ...state,
  [action.payload.room]: action.payload.handle
});
