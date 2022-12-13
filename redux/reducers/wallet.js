import { SUCCESS, EXPENSES, REMOVE, EDIT, EDITED } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  edit: false,
  editId: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCCESS:
    return {
      ...state,
      currencies: action.payload,
      loading: false,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT:
    return {
      ...state,
      edit: true,
      editId: action.id,
    };
  case EDITED:
    return {
      ...state,
      edit: false,
      expenses: state.expenses
        .map((expense) => {
          if (expense.id === state.editId) {
            return {
              id: expense.id,
              ...action.expenses,
              exchangeRates: expense.exchangeRates,
            };
          }
          return expense;
        }),
    };
  default:
    return state;
  }
};

export default wallet;
