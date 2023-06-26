function criarBotoes(num) {
  let botoesNumericos = [];
  for (let i = 9; i >= 0; i--) {
    let button = document.createElement("button");
    button.setAttribute("data-category", "number");
    button.setAttribute("data-number", i.toString());
    button.classList.add("botoes");
    button.textContent = i.toString();
    botoesNumericos.push(button);
  }
  return botoesNumericos;
}

function executarCalculo(valor1, valor2, operacao) {
  if (operacao === "+") {
    return valor1 + valor2;
  } else if (operacao === "-") {
    return valor1 - valor2;
  } else if (operacao === "*") {
    return valor1 * valor2;
  } else if (operacao === "/") {
    return valor1 / valor2;
  }
}

class Calculadora {
  constructor() {
    this.numero1 = "";
    this.numero2 = "";
    this.operador = "";
    this.displayCalc = "";
    this.botoesNumericos = [];
    this.botoesOperacoes = [];
  }

  criarElementoOperacao = (operacao) => {
    const btnOperacao = document.createElement("button");
    btnOperacao.setAttribute("data-category", "operation");
    btnOperacao.textContent = operacao;

    this.botoesOperacoes.push(btnOperacao);
    return btnOperacao;
  };

  renderizarElementos = () => {
    let resultados = document.getElementById("resultados"); // pega a linha criada no HTML e atribui a resultados
    let par = document.createElement("p"); // ali dentro cria um parágrafo chamado par
    resultados.appendChild(par);
    this.par = par;

    let div = document.createElement("div");
    div.classList.add("botoes");
    this.botoesNumericos = criarBotoes(10);
    this.botoesNumericos.forEach((botao) => div.appendChild(botao));

    let div2 = document.createElement("div");
    div2.classList.add("botoes-operacoes");

    let acdiv = document.createElement("div");
    acdiv.classList.add("ac");
    acdiv.appendChild(this.criarElementoOperacao("AC"));
    acdiv.appendChild(this.criarElementoOperacao("+/-"));
    acdiv.appendChild(this.criarElementoOperacao("%"));
    acdiv.appendChild(this.criarElementoOperacao("/"));

    div2.appendChild(this.criarElementoOperacao("*"));
    div2.appendChild(this.criarElementoOperacao("-"));
    div2.appendChild(this.criarElementoOperacao("+"));
    div2.appendChild(this.criarElementoOperacao("="));

    // document.body.appendChild(div);
    let areaButton = document.querySelector(".area-button");
    areaButton.appendChild(acdiv);
    areaButton.appendChild(div);
    areaButton.appendChild(div2);
  };

  aoClicarBotaoNumeric = (valor) => {
    this.displayCalc += valor;
    this.atualizarUI(this.displayCalc);
  };

  aoClicarBotaoOperacao = (operacao) => {
    if (operacao === "AC") {
      this.numero1 = "";
      this.numero2 = "";
      this.displayCalc = "0";
      this.operador = "";
      this.atualizarUI(this.displayCalc); // aqui só atualiza
      this.displayCalc = "";
      return;
    }

    if (this.numero1 === "" && this.operador === "") {
      this.numero1 = parseInt(this.displayCalc, 10);
      this.operador = operacao;
      this.atualizarUI(this.displayCalc); //aqui só atualiza
      this.displayCalc = "";
    } else if (
      this.numero1 !== "" &&
      this.operador === "" &&
      this.displayCalc !== ""
    ) {
      this.numero1 = parseInt(this.displayCalc, 10);
      this.operador = operacao;
      this.atualizarUI(this.displayCalc); // aqui só atualiza
      this.displayCalc = "";
    } else if (this.numero2 === "" && this.displayCalc !== "") {
      this.numero2 = parseInt(this.displayCalc, 10);
      if (operacao === "=" || operacao === "Enter") {
        if (
          this.numero1 !== "" &&
          this.numero2 !== "" &&
          this.operador !== ""
        ) {
          this.displayCalc = executarCalculo(
            this.numero1,
            this.numero2,
            this.operador
          );
          this.operador = "";
          this.atualizarUI(this.displayCalc);
          this.numero1 = this.displayCalc;
          this.displayCalc = "";
          this.numero2 = "";
        }
        operacao = "";
      } else {
        if (
          this.numero1 !== "" &&
          this.numero2 !== "" &&
          this.operador !== ""
        ) {
          this.displayCalc = executarCalculo(
            this.numero1,
            this.numero2,
            this.operador
          );
          this.operador = "";
          this.atualizarUI(this.displayCalc);
          this.numero1 = this.displayCalc;
          this.displayCalc = "";
          this.numero2 = "";
        }
        this.operador = operacao;
      }
    }
    this.operador = operacao;
  };

  incluirEventos = () => {
    // EVENTO: BOTOES DE NUEMRO
    this.botoesNumericos.forEach((button) =>
      button.addEventListener("click", (event) => {
        const buttonThatGotClicked = event.currentTarget;
        this.aoClicarBotaoNumeric(buttonThatGotClicked.textContent); // NOVO JEITO DO DECO
      })
    );
    // EVENTO BOTOES DE OPERACOES
    this.botoesOperacoes.forEach((button) =>
      button.addEventListener("click", (event) => {
        const buttonThatGotClicked = event.currentTarget;
        let temporaryVariable = buttonThatGotClicked.textContent;
        this.aoClicarBotaoOperacao(buttonThatGotClicked.textContent);
      })
    );

    // EVENTO: LER NUMEROS DO TECLADO
    document.addEventListener("keydown", (ev) => {
      let digitRegex = /^[0-9]$/;
      let operationRegex = /^[-+*/=]$/;
      console.log(ev.key);
      if (digitRegex.test(ev.key)) {
        this.aoClicarBotaoNumeric(ev.key); // NOVO JEITO DO DECO
      } else if (operationRegex.test(ev.key) || ev.key === "Enter") {
        this.aoClicarBotaoOperacao(ev.key);
      }
    });
  };

  atualizarUI = (displayCalc) => {
    this.par.textContent = displayCalc;
  };

  inicializar = () => {
    this.renderizarElementos();
    this.incluirEventos();
    this.atualizarUI(0);
  };
}

const calculadora1 = new Calculadora();
calculadora1.inicializar();
console.log(window.devicePixelRatio);
