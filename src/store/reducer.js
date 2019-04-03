const initialState = {
  dreams: [],
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVED_DREAMS":
      return {
        ...state,
        dreams: action.payload
      }
    default: return state;
  }
}
