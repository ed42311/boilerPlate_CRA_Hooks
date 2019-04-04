function receivedDreams(payload) {
  return {
    type: "RECEIVED_DREAMS",
    payload
  }
}
function requestDreams() {
  return {
    type: "REQUEST_DREAMS",
  }
}
export function selectDream(payload) {
  return {
    type: "SELECT_DREAM",
    payload
  }
}
export function addNewOrUpdateDream(payload) {
  return {
    type: "ADD_NEW_OR_UPDATE_DREAM",
    payload
  }
}
export function deleteDream(id) {
  return {
    type: "DELETE_DREAM",
    payload: {id},
  }
}
const { REACT_APP_BACKEND_URL } = process.env;
export function fetchDreams(userID) {
  return function(dispatch, getState){
    dispatch(requestDreams());
    if(getState().dreams.length) return;
    return fetch(`${REACT_APP_BACKEND_URL}/dreams/?userId=${userID}`)
      .then(response => response.json())
      .then((dreams) => {
        dreams = dreams.reverse();
        dispatch(receivedDreams(dreams));
      })
  }
}
