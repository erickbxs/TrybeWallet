# Boas-vindas ao repositório do projeto Trybewallet!

Para realizar o projeto, atente-se a cada passo descrito a seguir, e se tiver qualquer dúvida, nos envie por _Slack_! #vqv 🚀

Aqui você vai encontrar os detalhes do projeto.



Neste projeto você vai encontrar uma carteira de controle de gastos com conversor de moedas, utilizando essa aplicação um usuário deverá ser capaz de:

  - Adicionar, remover e editar um gasto;
  - Visualizar uma tabelas com seus gastos;
  - Visualizar o total de gastos convertidos para uma moeda de escolha;
  


  
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

 
  <summary><strong>:memo: Habilidades</strong></summary><br />

Neste projeto, fui capaz de:

- Criar um _store_ Redux em aplicações React

- Criar _reducers_ no Redux em aplicações React

- Criar _actions_ no Redux em aplicações React

- Criar _dispatchers_ no Redux em aplicações React

- Conectar Redux aos componentes React

- Criar _actions_ assíncronas na sua aplicação React que faz uso de Redux.


  

  <summary><strong>🎛 Linter</strong></summary><br />

  Para garantir a qualidade do código, utilizei neste projeto o linter ESLint. Assim, o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível e de fácil manutenção! Para rodar o _linter_ localmente no projeto, execute o comando abaixo:

  `npm run lint`



<a name="testes"></a>


  <summary><strong>🛠 Testes</strong></summary><br />

* <summary><b> Execução de testes de requisito</b></summary>

  Os testes deste projeto foram feitos utilizando o [Cypress](https://www.cypress.io/how-it-works/). É utilizada nos testes a resolução `1366 x 768` (1366 pixels de largura por 768 pixels de altura) para testes de layout. Logo, recomenda-se desenvolver seu projeto usando a mesma resolução, via instalação [deste plugin](https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh?hl=en) do `Chrome` para facilitar a configuração dessa resolução, por exemplo.

  Para o projeto ser validado, todos os testes de comportamento devem passar. É possível testar isso local rodando `npm run cy`. Esse comando roda a suite de testes do Cypress que valida se o fluxo geral e os requisitos funcionais estão funcionando como deveriam. Você pode também executar o comando `npm run cy:open` para ter um resultado visual dos testes executados.

  Esses testes não consideram o layout de maneira geral, mas sim os atributos e informações corretas, então preste atenção nisso! Os testes te darão uma mensagem de erro caso não estejam passando (seja qual for o motivo). 😉

  **Atenção:** Sua aplicação deve estar rodando para o Cypress no terminal poder testar.
  

* <summary><b> Execução de um teste específico</b></summary>

  Para executar somente uma `spec` de testes, você pode ou rodar somente um arquivo de teste com o comando `npm run cy -- --spec cypress/integration/nomeDoArquivo_spec.js`, ou também pode selecionar qual delas você deseja após executar o comando `npm run cy:open`.

  

  Além disso ainda é possível rodar apenas um trecho de um `spec`, basta utilizar a função .only após o `describe`, `it` ou `test`. Com isso, será possível que apenas parte de um teste rode localmente e seja avaliado.

  

 

* <summary><b> Execução de teste de cobertura</b></summary>

  Alguns requisitos irão pedir para que você desenvolva testes para sua aplicação. Esses testes serão avaliados através da cobertura de testes.

  É possível verificar o percentual da cobertura de testes com o comando `npm run test-coverage`. 

  Você também pode executar `npm run test-coverage -- --collectCoverageFrom=caminho/da/Pagina` para verificar o percentual de cobertura de testes de cada 'Pagina'. Por exemplo, para verificar a cobertura de testes da página de `Login`, execute o comando `npm run test-coverage -- --collectCoverageFrom=src/pages/Login.js`.
  <br />



  <summary><strong id="como-desenvolver">:convenience_store: Desenvolvimento </strong></summary><br />

  Neste projeto foi desenvolvido uma carteira de controle de gastos com conversor de moedas, utilizando Redux React. Na implementação v **obrigatoriamente** utilizei o seguinte formato do estado global:

```
  {
    user: {
      email: '', // string que armazena o email da pessoa usuária
    },
    wallet: {
      currencies: [], // array de string
      expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
      editor: false, // valor booleano que indica de uma despesa está sendo editada
      idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    }
  }
```

  <br />
  <summary><b> :bulb: Configurando o Redux DevTools</b></summary>

  Para usarmos o Redux DevTools com o Redux-Thunk, vamos utilizar uma biblioteca chamada `redux-devtools-extension` que possui a função `composeWithDevTools`. Ela já está no package.json, a única coisa que você vai precisar fazer é configurar a sua store, por exemplo:

  ```javascript
  import { createStore, applyMiddleware } from 'redux';
  import { composeWithDevTools } from '@redux-devtools/extension';
  import thunk from 'redux-thunk';
  import reducer from '../reducers';

  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  );

  export default store;
  ```


  <summary><b> :bulb: Documentação da API de Cotações de Moedas</b></summary>

  Sua página _web_ irá consumir os dados da API do _awesomeapi API de Cotações_ para realizar a busca de câmbio de moedas. Para realizar essas buscas, vocês precisarão consultar o seguinte _endpoint_:

  - <https://economia.awesomeapi.com.br/json/all>

  O retorno desse endpoint será algo no formato:

  ```json
  {
    {
      "USD": {
        "code":"USD",
        "codein":"BRL",
        "name":"Dólar Americano/Real Brasileiro",
        "high":"5.6689",
        "low":"5.6071",
        "varBid":"-0.0166",
        "pctChange":"-0.29",
        "bid":"5.6173",
        "ask":"5.6183",
        "timestamp":"1601476370",
        "create_date":"2020-09-30 11:32:53"
        },
        ...
    }
  }
  ```

  Se você quiser aprender mais informações sobre a API, veja a [documentação](https://docs.awesomeapi.com.br/api-de-moedas).
<br />





