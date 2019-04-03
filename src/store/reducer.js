const initialState = {
  dreams: [],
  currentDream: {},
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVED_DREAMS":
      return {
        ...state,
        dreams: action.payload
      };
    case "SELECT_DREAM":
      return {
        ...state,
        currentDream: action.payload,
      }
    default: return state;
  }
}
