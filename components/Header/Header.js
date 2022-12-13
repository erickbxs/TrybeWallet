import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  handleTotal = () => {
    const { expenses } = this.props;
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      const converter = expense.exchangeRates[expense.currency].ask;
      totalExpenses += expense.value * converter;
    });
    return totalExpenses.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (

      <div>
        T...R...Y...B...E...W...A...L...L...E...T
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ this.handleTotal() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
