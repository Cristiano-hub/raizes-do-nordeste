const idUnidade = localStorage.getItem("unidadeSelecionada");
const unidade = unidades.find(u => u.id === idUnidade);
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
let recompensasPedido = JSON.parse(localStorage.getItem("recompensasPedido")) || [];
let processando = false;

function formatar(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcularTotal() {
  let total = 0;
  for (const id in carrinho) {
    const produto = produtos.find(p => p.id === id);
    total += produto.preco * carrinho[id];
  }
  return total;
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function salvarRecompensas() {
  localStorage.setItem("recompensasPedido", JSON.stringify(recompensasPedido));
}

function mostrarCarrinho() {
  const area = document.getElementById("itens-carrinho");
  area.innerHTML = "";
  const ids = Object.keys(carrinho);

  if (ids.length === 0 && recompensasPedido.length === 0) {
    area.innerHTML = '<p>Seu carrinho está vazio. <a href="cardapio.html">Ver cardápio</a></p>';
  }

  ids.forEach(id => {
    const produto = produtos.find(p => p.id === id);
    const linha = document.createElement("article");
    linha.className = "item-carrinho";
    linha.innerHTML = `
      <div>
        <h2>${produto.nome}</h2>
        <p>${formatar(produto.preco)} cada</p>
      </div>
      <div class="controles">
        <button type="button" class="botao botao-pequeno" data-acao="menos" data-id="${id}">−</button>
        <span>${carrinho[id]}</span>
        <button type="button" class="botao botao-pequeno" data-acao="mais" data-id="${id}">+</button>
        <button type="button" class="botao botao-pequeno" data-acao="remover" data-id="${id}">Remover</button>
      </div>
    `;
    area.appendChild(linha);
  });

  recompensasPedido.forEach(function (idRecompensa, indice) {
    const recompensa = recompensas.find(r => r.id === idRecompensa);
    const linha = document.createElement("article");
    linha.className = "item-carrinho";
    linha.innerHTML = `
      <div>
        <h2>${recompensa.nome}</h2>
        <p>Recompensa de fidelidade · ${recompensa.pontos} pts</p>
      </div>
      <div class="controles">
        <strong>Grátis</strong>
        <button type="button" class="botao botao-pequeno" data-acao="remover-recompensa" data-indice="${indice}">Remover</button>
      </div>
    `;
    area.appendChild(linha);
  });

  document.getElementById("total-pedido").textContent = formatar(calcularTotal());
  const vazio = ids.length === 0 && recompensasPedido.length === 0;
  document.getElementById("btn-finalizar").disabled = vazio || processando;
}

function esconderMensagens() {
  document.getElementById("msg-processando").hidden = true;
  document.getElementById("caixa-falha").hidden = true;
  document.getElementById("caixa-sucesso").hidden = true;
}

function salvarPedido(forma, status) {
  const pedido = {
    numero: 1023,
    unidade: unidade.nome,
    itens: Object.assign({}, carrinho),
    recompensas: recompensasPedido.slice(),
    total: calcularTotal(),
    forma: forma,
    status: status,
    etapa: 0
  };
  localStorage.setItem("pedido", JSON.stringify(pedido));
  return pedido;
}

function pagar() {
  if (processando) return;
  const forma = document.querySelector('input[name="forma"]:checked').value;

  processando = true;
  esconderMensagens();
  document.getElementById("msg-processando").hidden = false;
  mostrarCarrinho();

  setTimeout(function () {
    processando = false;
    document.getElementById("msg-processando").hidden = true;

    if (document.getElementById("simular-falha").checked) {
      pagamentoFalhou(forma);
    } else {
      pagamentoAprovado(forma);
    }
    mostrarCarrinho();
  }, 2000);
}

function pagamentoFalhou(forma) {
  salvarPedido(forma, "Pagamento pendente");
  document.getElementById("caixa-falha").hidden = false;
}

function pagamentoAprovado(forma) {
  const pedido = salvarPedido(forma, "Pagamento aprovado");
  let texto = "Pedido #" + pedido.numero + " (" + pedido.forma + ") no valor de " + formatar(pedido.total) + ".";

  // RN03: pontos só se o pagamento foi aprovado, o cliente está logado e participa da fidelidade
  const participa = usuario.consentimentoFidelidade !== false;
  if (participa) {
    const ganhos = Math.floor(pedido.total);
    usuario.pontos = usuario.pontos + ganhos;
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    texto += " Você ganhou " + ganhos + " pontos. Saldo: " + usuario.pontos + " pts.";
  }

  carrinho = {};
  salvarCarrinho();
  recompensasPedido = [];
  salvarRecompensas();
  document.getElementById("texto-sucesso").textContent = texto;
  document.getElementById("caixa-sucesso").hidden = false;

  setTimeout(function () {
    window.location.href = "acompanhamento.html";
  }, 2500);
}

function iniciar() {
  document.getElementById("unidade-pedido").textContent = "Unidade: " + unidade.nome;

  document.getElementById("itens-carrinho").addEventListener("click", function (evento) {
    if (processando) return;
    const acao = evento.target.dataset.acao;
    const id = evento.target.dataset.id;
    if (!acao) return;

    if (acao === "mais") {
      carrinho[id] = carrinho[id] + 1;
    } else if (acao === "menos") {
      carrinho[id] = carrinho[id] - 1;
      if (carrinho[id] <= 0) delete carrinho[id];
    } else if (acao === "remover") {
      delete carrinho[id];
    } else if (acao === "remover-recompensa") {
      const indice = Number(evento.target.dataset.indice);
      const recompensa = recompensas.find(r => r.id === recompensasPedido[indice]);
      usuario.pontos = usuario.pontos + recompensa.pontos;
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      recompensasPedido.splice(indice, 1);
      salvarRecompensas();
    }
    salvarCarrinho();
    mostrarCarrinho();
  });

  document.getElementById("btn-finalizar").addEventListener("click", pagar);
  document.getElementById("btn-tentar").addEventListener("click", pagar);
  document.getElementById("btn-outra-forma").addEventListener("click", function () {
    esconderMensagens();
    document.getElementById("area-pagamento").scrollIntoView();
  });

  mostrarCarrinho();
}

if (!unidade) {
  window.location.href = "index.html";
} else if (!usuario) {
  window.location.href = "login.html";
} else {
  iniciar();
}