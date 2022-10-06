const initialState = { likeCount: 0, hasLiked: false, hasDisliked: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "updateLikes":
      return {
        likeCount: action.payload.likeCount,
        hasLiked: action.payload.hasLiked,
        hasDisliked: action.payload.hasDisliked,
      };

    default:
      return state;
  }
};

const reviewLikes = { initialState, reducer };

export default reviewLikes;
