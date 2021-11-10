import {
  ADD_TO_CART,
  TAKE_AWAY_FROM_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from '../constants';

const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.length > 0) {
        const { payload } = action;
        const item = state.find(
          x => x.product.route.params.item.title === payload.product.route.params.item.title,
        );
        if(item){
          item.quantity += 1
          return [...state]
        }
        return [...state, action.payload]
      }

      return [...state, action.payload]
    case TAKE_AWAY_FROM_CART:
      if (state.length > 0) {
        const { payload } = action;
        const item = state.find(
          x => x.product.route.params.item.title === payload.product.route.params.item.title,
        );
        if(item){
          if(item.quantity === 1) {
            return state.filter(cartItem => cartItem !== action.payload)
          } else {
            item.quantity -= 1
            return [...state]
          }
        }
        return [...state, action.payload]
      }

      return [...state, action.payload]
    case REMOVE_FROM_CART:
      return state.filter(cartItem => cartItem !== action.payload)
    case CLEAR_CART:
      return state = []
  }
  return state;
}

export default cartItems;