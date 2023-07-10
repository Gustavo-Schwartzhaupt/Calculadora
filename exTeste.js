function criarBotoesNumericos() {
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
    this.botoesEspeciais = [];
  }
  criarElementoEspecial = (action) => {
    const btnEspecial = document.createElement("button");
    btnEspecial.setAttribute("data-category", "operation");
    btnEspecial.textContent = action;

    this.botoesEspeciais.push(btnEspecial);
    return btnEspecial;
  };

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
    this.botoesNumericos = criarBotoesNumericos(10);
    this.botoesNumericos.forEach((botao) => div.appendChild(botao));

    let div2 = document.createElement("div");
    div2.classList.add("botoes-operacoes");

    let acdiv = document.createElement("div");
    acdiv.classList.add("ac");
    acdiv.appendChild(this.criarElementoEspecial("AC"));
    acdiv.appendChild(this.criarElementoEspecial("+/-"));
    acdiv.appendChild(this.criarElementoEspecial("%"));
    acdiv.appendChild(this.criarElementoEspecial("/"));

    div2.appendChild(this.criarElementoOperacao("*"));
    div2.appendChild(this.criarElementoOperacao("-"));
    div2.appendChild(this.criarElementoOperacao("+"));
    div2.appendChild(this.criarElementoOperacao("="));

    let areaButton = document.querySelector(".area-button");
    areaButton.appendChild(acdiv);
    areaButton.appendChild(div);
    areaButton.appendChild(div2);
  };

  aoClicarBotaoNumeric = (valor) => {
    this.displayCalc += valor;
    this.atualizarUI(this.displayCalc);
  };

  aoClicarBotaoEspecial = (valor) => {
    if (valor === "AC") {
      this.atualizarUI("0"); // aqui só atualiza
      this.numero1 = "";
      this.zerarGlobais();
      console.log("testando dentro do AC");
      return;
    } else if (valor === "=" || valor === "Enter") {
      if (this.numero1 !== "" && this.numero2 !== "" && this.operador !== "") {
        this.displayCalc = executarCalculo(
          this.numero1,
          this.numero2,
          this.operador
        );
        this.numero1 = this.displayCalc;
        this.zerarGlobais();
      }
      valor = "";
      return;
    }
  };

  aoClicarBotaoOperacao = (operacao) => {
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
      if (this.numero1 !== "" && this.numero2 !== "" && this.operador !== "") {
        this.displayCalc = executarCalculo(
          this.numero1,
          this.numero2,
          this.operador
        );

        this.atualizarUI(this.displayCalc);
        this.numero1 = this.displayCalc;
        this.zerarGlobais();
      }
      this.operador = operacao;
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
        this.aoClicarBotaoOperacao(buttonThatGotClicked.textContent);
      })
    );

    this.botoesEspeciais.forEach((button) =>
      button.addEventListener("click", (event) => {
        const buttonThatGotClicked = event.currentTarget;
        this.aoClicarBotaoEspecial(buttonThatGotClicked.textContent);
      })
    );

    // EVENTO: LER NUMEROS DO TECLADO
    document.addEventListener("keydown", (ev) => {
      let digitRegex = /^[0-9]$/;
      let operationRegex = /^[-+*]$/;
      let especialRegex = /[/=]/;
      console.log(ev.key);
      if (digitRegex.test(ev.key)) {
        this.aoClicarBotaoNumeric(ev.key); // NOVO JEITO DO DECO
      } else if (operationRegex.test(ev.key)) {
        this.aoClicarBotaoOperacao(ev.key);
      } else if (especialRegex.test(ev.key) || ev.key === "Enter") {
        this.aoClicarBotaoEspecial(ev.key);
      }
    });
  };
  zerarGlobais = () => {
    this.operador = "";
    this.displayCalc = "";
    this.numero2 = "";
  };

  atualizarUI = (valor) => {
    this.par.textContent = valor;
  };

  inicializar = () => {
    this.renderizarElementos();
    this.incluirEventos();
    this.atualizarUI(0);
  };
}

const calculadora1 = new Calculadora();
calculadora1.inicializar();
