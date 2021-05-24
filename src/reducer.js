export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket.reduce((amt, product) => amt + product.price, 0);

const reducer = (state, action) => {
  //   console.log(action);
  //   console.log(state);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      let basket = [...state.basket];
      let removeIndex = basket.map((item) => item.id).indexOf(action.item.id);
      ~removeIndex && basket.splice(removeIndex, 1);
      return {
        ...state,
        basket: [...basket],
      };
    case "SET_USER":
      // console.log("Set User : ", action.user);
      return {
        ...state,
        user: action.user,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    default:
      break;
  }
};

export default reducer;
