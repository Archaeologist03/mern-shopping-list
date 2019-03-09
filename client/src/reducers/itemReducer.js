import uuid from 'uuid';

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initalState = {
  items: [
    { id: uuid(), name: 'Eggs' },
    { id: uuid(), name: 'Milk' },
    { id: uuid(), name: 'Steak' },
    { id: uuid(), name: 'Water' },
  ],
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
      };
    case ADD_ITEM:
      const newItem = { id: uuid(), name: action.itemName };
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_ITEM:
      const newList = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newList,
      };
    default:
      return state;
  }
}
