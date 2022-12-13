import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Expenses from '../../components/Expenses/Expenses';
import ExpenseTable from '../../components/Table/ExpenseTable';

class Wallet extends Component {
  render() {
    return (

      <div>

        <Header />

        <Expenses />

        <ExpenseTable />

      </div>

    );
  }
}

export default Wallet;
