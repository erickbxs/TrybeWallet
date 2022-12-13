import React from 'react';
import { fireEvent, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { estadoInicial, estadoInicialSemExpenses } from './helpers/estadoInicial';
import Wallet from '../pages/Wallet/Wallet';
import mockData from './helpers/mockData';

afterEach(() => jest.clearAllMocks());

describe('Testes relacionados a pagina do Wallet', () => {
  it('0 - Testando a rota', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />);
    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');
  });

  it('1 - Renderização do Componente Header', () => {
    // Renderizando :
    const { store } = renderWithRouterAndRedux(<Wallet />, { estadoInicialSemExpenses }, ['/carteira']);
    const emailField = screen.getByTestId(/email-field/i);
    const totalField = screen.getByTestId(/total-field/i);
    const currencyField = screen.getByTestId(/header-currency-field/i);

    // Executanto o teste :
    expect(emailField).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
    expect(currencyField).toBeInTheDocument();
    expect(emailField).toContainHTML(store.getState().user.email);
    expect(totalField.innerHTML).toEqual('0.00');
    expect(currencyField.innerHTML).toEqual('BRL');
  });

  it('2 - Verifica a renderização de Formulario ', () => {
    // Renderizando :

    renderWithRouterAndRedux(<Wallet />, { estadoInicial }, ['/carteira']);
    const addBtn = screen.getByTestId(/add-expense/i);
    const valueInput = screen.getByTestId(/value-input/i);
    const descriptionInput = screen.getByTestId(/description-input/i);
    const currencyInput = screen.getByTestId(/currency-input/i);
    const methodInput = screen.getByTestId(/method-input/i);
    const tagInput = screen.getByTestId(/tag-input/i);
    // Executanto o teste:

    expect(addBtn).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  it('3 - Ação sobre o formulario ', async () => {
    // Renderizando :
    renderWithRouterAndRedux(<Wallet />);
    const addBtn = await screen.findByTestId(/add-expense/i);
    const valueInput = screen.getByTestId(/value-input/i);
    const descriptionInput = screen.getByTestId(/description-input/i);
    const methodInput = screen.getByTestId(/method-input/i);
    const tagInput = screen.getByTestId(/tag-input/i);

    const currency = await screen.findByTestId('currency-input');
    await within(currency).findAllByRole('option');
    // Executando eventos:

    userEvent.type(valueInput, '25');
    userEvent.type(descriptionInput, 'Covid');
    userEvent.selectOptions(currency, 'USD');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Saúde');
    userEvent.click(addBtn);

    const btnDelete = await screen.findByRole('button', { name: /excluir/i });
    const description = await screen.findByRole('cell', { name: /covid/i });
    const btnEdit = await screen.findByRole('button', { name: /editar/i });

    // Executanto o teste:

    expect(btnDelete).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(btnEdit).toBeInTheDocument();

    // Executando novos eventos:
    userEvent.click(btnEdit);

    const btnEditExpense = await screen.findByRole('button', { name: /editar despesa/i });

    // teste sobre o evento novo :

    expect(btnEditExpense).toBeInTheDocument();

    // Executando novos eventos:

    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, 'Arroz');
    userEvent.selectOptions(currency, 'USD');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Alimentação');

    userEvent.click(btnEditExpense);

    // teste desse evento:

    expect(await screen.findByRole('cell', { name: /arroz/i })).toBeInTheDocument();
  });

  it('4 - Teste da Api', async () => {
    // Renderizando :
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<Wallet />);

    const apiResult = await screen.findByText(/EUR/i);
    within(apiResult).findByRole('combobox');

    // Executanto o teste:
    expect(apiResult).toBeInTheDocument();
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  it('6 -Api com erro ', async () => {
    // Renderizando :
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(null),
    }));

    renderWithRouterAndRedux(<Wallet />);
    // Executanto o teste:
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(() => { (global.fetch).toThrow('error'); });
  });

  it('7 - testa se salva 2 itens ', async () => {
    // Renderizando :
    renderWithRouterAndRedux(<Wallet />);
    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    const inputDescription = screen.getByRole('textbox', {
      name: /descrição:/i,
    });

    userEvent.type(inputDescription, 'Item 1');
    userEvent.click(addButton);

    userEvent.type(inputDescription, 'Item 2');
    userEvent.click(addButton);

    const firstItem = await screen.findByText(/item 1/i);
    const secondItem = await screen.findByText(/item 2/i);
    // Executanto o teste:
    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
  });

  it('8 - Edição dos itens ', async () => {
    // Renderizando :

    const addButton = screen.getAllByRole('button', {
      name: /adicionar despesa/i,
    });

    const inputDescription = screen.getByText(/descrição:/i);

    userEvent.type(inputDescription, 'Item 1');
    fireEvent.click(addButton);

    const editButton = await screen.findByText(/editar/i);

    fireEvent.click(editButton);

    const submitEditButton = screen.getByRole('button', {
      name: /editar despesa/i,
    });

    userEvent.type(inputDescription, 'Item 1 editado');
    fireEvent.click(submitEditButton);

    const editItem = await screen.findByText(/item 1 editado/i);
    // Executanto o teste:
    expect(editItem).toBeInTheDocument();
  });

  it('9 - Excluir item ', async () => {
    // Renderizando :
    renderWithRouterAndRedux(<Wallet />);

    submitEditButton = screen.getByRole('button', { name: /editar despesa/i });

    userEvent.type(inputDescription, 'Item 1 editado');
    userEvent.click(submitEditButton);

    const editItem = await screen.findByText(/item 1 editado/i);
    // Executanto o teste:

    expect(editItem).toBeInTheDocument();
  });
  it('10 - Testa se existe um botão na página com o nome "Adicionar despesa"', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />);
    act(() => { history.push('/carteira'); });
    const buttonSign = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(buttonSign).toBeInTheDocument();
  });
});
