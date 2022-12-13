export const LOGIN = 'LOGIN';
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const EXPENSES = 'EXPENSES';
export const REMOVE = 'REMOVE';
export const EDIT = 'EDIT';
export const EDITED = 'EDITED';
export const GET_ID = 'GET_ID';

export const loginAction = (loginForm) => ({
  type: LOGIN,
  payload: loginForm,
});

export const request = () => ({
  type: REQUEST,
});

export const success = (payload) => ({
  type: SUCCESS,
  payload,
});

export const actionError = (payload) => ({
  type: ERROR,
  payload,
});

export const actionExpenses = (expenses) => ({
  type: EXPENSES,
  payload: expenses,
});

export const removeBtn = (payload) => ({
  type: REMOVE,
  id: payload,
});

export const editExpense = (id) => ({
  type: EDIT,
  id,
});

export const editedExpense = (expenses) => ({
  type: EDITED,
  expenses,
});

export const currenciesThunk = () => async (dispatch) => {
  dispatch(request);
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const dataResult = Object.keys(data).filter((curr) => curr !== 'USDT');
    dispatch(success(dataResult));
  } catch (error) {
    dispatch(actionError(error));
    return error;
  }
};

export default { loginAction };
