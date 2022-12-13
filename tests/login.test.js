import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('1- Testa a pagina de login: ', () => {
  it('1 - A rota é a correta?', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('2 - Possiu o texto Email? ', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByText(/email/i);
    expect(email).toBeInTheDocument();
  });

  it('3 - Possui os "data-testid" corretos? ', () => {
    renderWithRouterAndRedux(<App />);
    const emailTestId = screen.getByTestId(/email-input/i);
    const passwordTestId = screen.getByTestId(/password-input/i);
    expect(emailTestId).toBeInTheDocument();
    expect(passwordTestId).toBeInTheDocument();
  });

  it('4 - Verifica se o botão está ativo ', () => {
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(btnEntrar).toBeInTheDocument();
    expect(btnEntrar).toBeDisabled();
  });

  it('5 - Verifica se o botão está inativo ', () => {
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByTestId(/email-input/i);
    userEvent.type(inputEmail, 'erickkkk');
    expect(btnEntrar).toBeDisabled();
  });

  it('6 - Verifica se foi feito o login com sucesso ', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'erick@gmail.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(btnEntrar);

    expect(store.getState().user.email).toBe('erick@gmail.com');
  });

  it('7 - Verifica se esxiste um titulo com uma tag p na pagina ', () => {
    renderWithRouterAndRedux(<App />);
    const text = screen.getByText(/TRYBEWALLET/i);
    expect(text).toBeInTheDocument();
  });
});
