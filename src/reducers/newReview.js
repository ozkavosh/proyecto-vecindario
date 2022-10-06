export const initialState = { rating: 1, tag: null, review: "" };

export const reducer = (state, action) => {
  switch (action.type) {
    case "setRating":
      return { ...state, rating: action.payload };
    case "setTag":
      return { ...state, tag: action.payload };
    case "setReview":
      return { ...state, review: action.payload };
    case "clear":
      return { review: "", tag: null, rating: 1 };
    default:
      return state;
  }
};

const newReview = { initialState, reducer };

export default newReview;
