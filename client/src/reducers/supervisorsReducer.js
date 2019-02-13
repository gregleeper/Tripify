export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_SUPERVISORS":
      return action.payload;
    default:
      return state;
  }
};
