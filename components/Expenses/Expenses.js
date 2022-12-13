import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionExpenses, currenciesThunk, editedExpense } from '../../redux/actions';
import fetchApi from '../../services/api';

const PAYMENT_METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAG_INPUT = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
class Expenses extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(currenciesThunk());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch, expenses } = this.props;
    const exchangeRates = await fetchApi();
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      value,
      currency,
      method,
      tag,
      description,
      id: expenses.length,
      exchangeRates,
    };
    await dispatch(actionExpenses(expense));
    this.setState({ value: '', description: '' });
  };

  handleEdit = async () => {
    const { dispatch } = this.props;
    const exchangeRates = await fetchApi();
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    await dispatch(editedExpense(expense));
    this.setState({ value: '', description: '' });
  };

  render() {
    const { wallet, currencies } = this.props;
    const { edit } = wallet;
    const {
      value,
      description,
      currency,
      tag,
      method,
    } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <div className="currencyLabel">
            Moeda:
            <select
              name="currency"
              type="text"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              { currencies.map((curr, index) => (
                <option key={ index } value={ curr }>{curr}</option>)) }
            </select>
          </div>

          <label htmlFor="payment">
            Método de Pagamento:
            <select
              value={ method }
              name="method"
              type="text"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              {PAYMENT_METHOD.map((pay, index) => (
                <option key={ index }>{pay}</option>))}
            </select>
          </label>

          <label htmlFor="tag">
            Categoria:
            <select
              value={ tag }
              type="text"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              {TAG_INPUT.map((tagType, index) => (
                <option key={ index }>{tagType}</option>))}
            </select>
          </label>
          <div className="btn-editar-adicionar" role="group">
            { edit && (
              <button
                type="button"
                name="editar despesa"
                data-testid="add-expense"
                onClick={ this.handleEdit }
              >
                Editar despesa

              </button>
            ) }
            { !edit && (
              <button
                type="button"
                name="adicionar despesa"
                data-testid="add-expense"
                onClick={ this.handleClick }
              >
                Adicionar despesa

              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

Expenses.propTypes = {
  currencies: PropTypes.array,
  fetchApi: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expense: state.wallet.expense,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Expenses);
