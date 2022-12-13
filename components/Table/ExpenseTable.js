import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeBtn, editExpense } from '../../redux/actions';

class ExpenseTable extends Component {
  render() {
    const { expenses, handleRemove, handleEdit } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de Pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const { id, value, description,
              currency, method, tag, exchangeRates } = expense;
            const exchangeQuote = Number(exchangeRates[currency].ask);
            const conversion = exchangeQuote * value;
            const currencyName = (exchangeRates[currency].name);
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ currencyName }</td>
                <td>{ exchangeQuote.toFixed(2) }</td>
                <td>{ conversion.toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <div className="btn-editar-excluir" role="group">
                    <button
                      type="button"
                      name="editar"
                      data-testid="edit-btn"
                      onClick={ () => handleEdit(id) }
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="excluir"
                      name="excluir"
                      data-testid="delete-btn"
                      onClick={ () => handleRemove(id) }
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleRemove: (id) => dispatch(removeBtn(id)),
  handleEdit: (id) => dispatch(editExpense(id)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
