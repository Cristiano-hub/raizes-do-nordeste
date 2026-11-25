const unidadeTotem = unidades.find(u => u.id === UNIDADE_TOTEM);
let carrinho = lerCarrinhoTotem();

function mostrarModo() {
  const usuario = lerUsuarioTotem();
  const texto = document.getElementById("texto-modo");
  const botao = document.getElementById("btn-entrar");

  if (usuario) {
    texto.textContent = "Olá, " + usuario.nome + "! Você acumula pontos neste pedido.";
    botao.hidden = true;
    document.getElementById("painel-entrar").hidden = true;
  } else {
    texto.textContent = "Modo convidado: não pedimos nenhum dado pessoal. Convidados não acumulam pontos.";
    botao.hidden = false;
  }
}

function mostrarProdutos() {
  const grade = document.getElementById("grade-produtos");
  grade.innerHTML = "";
  unidadeTotem.produtos.forEach(function (idProduto) {
    const p = produtos.find(x => x.id === idProduto);
    const cartao = document.createElement("article");
    cartao.className = "produto-totem";
    cartao.innerHTML = `
      <h2>${p.nome}</h2>
      <p>${formatar(p.preco)}</p>
      <button type="button" class="botao botao-totem" data-id="${p.id}">Adicionar</button>
    `;
    grade.appendChild(cartao);
  });
}

function mostrarResumo() {
  const area = document.getElementById("itens-pedido");
  area.innerHTML = "";
  const ids = Object.keys(carrinho);

  if (ids.length === 0) {
    area.innerHTML = '<p class="aviso">Nenhum item ainda. Toque em "Adicionar".</p>';
  }

  ids.forEach(function (id) {
    const p = produtos.find(x => x.id === id);
    const linha = document.createElement("article");
    linha.className = "item-carrinho";
    linha.innerHTML = `
      <div><h2>${p.nome}</h2></div>
      <div class="controles">
        <button type="button" class="botao botao-totem" data-acao="menos" data-id="${id}">−</button>
        <span>${carrinho[id]}</span>
        <button type="button" class="botao botao-totem" data-acao="mais" data-id="${id}">+</button>
      </div>
    `;
    area.appendChild(linha);
  });

  document.getElementById("total-pedido").textContent = formatar(calcularTotalTotem(carrinho));
  document.getElementById("btn-pagar").disabled = ids.length === 0;
}

document.getElementById("nome-unidade").textContent = unidadeTotem.nome;

document.getElementById("grade-produtos").addEventListener("click", function (evento) {
  const id = evento.target.dataset.id;
  if (!id) return;
  carrinho[id] = (carrinho[id] || 0) + 1;
  salvarCarrinhoTotem(carrinho);
  mostrarResumo();
});

document.getElementById("itens-pedido").addEventListener("click", function (evento) {
  const acao = evento.target.dataset.acao;
  const id = evento.target.dataset.id;
  if (!acao) return;
  if (acao === "mais") {
    carrinho[id] = carrinho[id] + 1;
  } else {
    carrinho[id] = carrinho[id] - 1;
    if (carrinho[id] <= 0) delete carrinho[id];
  }
  salvarCarrinhoTotem(carrinho);
  mostrarResumo();
});

document.getElementById("btn-entrar").addEventListener("click", function () {
  document.getElementById("painel-entrar").hidden = false;
});

document.getElementById("btn-entrar-teste").addEventListener("click", function () {
  const usuario = {
    nome: clienteTeste.nome,
    email: clienteTeste.email,
    pontos: clienteTeste.pontos,
    consentimentoFidelidade: true
  };
  localStorage.setItem("totemUsuario", JSON.stringify(usuario));
  mostrarModo();
});

// Cancelar descarta o pedido em montagem e volta ao início
document.getElementById("btn-cancelar").addEventListener("click", reiniciarTotem);

document.getElementById("btn-pagar").addEventListener("click", function () {
  window.location.href = "totem-pagamento.html";
});

mostrarModo();
mostrarProdutos();
mostrarResumo();
iniciarInatividade();