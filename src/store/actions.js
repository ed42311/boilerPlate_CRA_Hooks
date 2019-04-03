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
