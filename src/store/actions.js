export function receivedDreams(payload) {
  return {
    type: "RECEIVED_DREAMS",
    payload
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
