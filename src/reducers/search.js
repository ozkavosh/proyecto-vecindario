const initialState = { filter: null, orderBy: null, input: "" };

const reducer = (state, action) => {
  switch (action.type) {
    case "setFilter":
      return { ...state, filter: action.payload };
    case "setOrder":
      return { ...state, orderBy: action.payload };
    case "setInput":
      return { ...state, input: action.payload };
    default:
      return state;
  }
};

const search = { initialState, reducer };

export default search;
