import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/actions';
import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disableBtn: true,
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.handleDisableBtn());
  };

  handleDisableBtn = () => { // Lógica vista na mentoria de Summer com a Hellen e a Dani
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const passLength = 5;
    const verifyEmail = email && regex.test(email);
    const verifyPassword = password.length > passLength;
    this.setState({ disableBtn: !(verifyEmail && verifyPassword) });
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    const action = { type: LOGIN, payload: email };
    dispatch(action);
    history.push('/carteira');
  };

  render() {
    const { disableBtn } = this.state;
    return (
      <main className="login-main">
        <h1 className="login-title">
          TRYBEWALLET
        </h1>
        <form
          className="login-form"
          onSubmit={ (e) => {
            e.preventDefault();
          } }
        >
          <div className="login-input">

            <div htmlFor="title">
              <p className="login-input-title">CADASTRE-SE AQUI:</p>
            </div>
            <br />
            <label htmlFor="email-input">
              EMAIL:
              <input
                className="login-email"
                name="email"
                data-testid="email-input"
                type="email"
                placeholder="Digite seu email"
                onChange={ this.handleInputChange }
                required
              />
            </label>
            <br />
            <label htmlFor="password-input">
              SENHA:
              <input
                className="login-password"
                name="password"
                data-testid="password-input"
                label="password"
                type="password"
                placeholder="Digite sua Senha"
                onChange={ this.handleInputChange }
                required
              />
            </label>
            <br />

            <button
              type="submit"
              variant="contained"
              className="login-button"
              disabled={ disableBtn }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </div>
        </form>
      </main>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
