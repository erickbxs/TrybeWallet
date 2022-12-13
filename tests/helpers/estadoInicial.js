import mockData from './mockData';

export const estadoInicial = {
  user: {
    email: 'erick@eumesmo.com',
    password: 1234556,
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ],
    expenses: [
      {
        id: 0,
        value: '25',
        currency: 'USD',
        method: 'Cartão de Crédito',
        tag: 'Saúde',
        description: 'Covid',
        exchangeRates: mockData,
      },
    ],
  },
};

export const estadoInicialSemExpenses = {
  user: {
    email: 'erick@eumesmo.com',
    password: 123456,
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ],
    expenses: [],
  },
};
