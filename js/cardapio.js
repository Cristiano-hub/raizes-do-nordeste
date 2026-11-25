const idUnidade = localStorage.getItem("unidadeSelecionada");
const unidade = unidades.find(u => u.id === idUnidade);
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
let categoriaAtual = "Todos";

function formatar(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarProdutos() {
  const lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  const doCardapio = produtos.filter(p =>
    unidade.produtos.includes(p.id) &&
    (categoriaAtual === "Todos" || p.categoria === categoriaAtual)
  );

  doCardapio.forEach(p => {
    const item = document.createElement("article");
    item.className = "produto";
    item.innerHTML = `
      <div>
        <h2>${p.nome}</h2>
        <p>${formatar(p.preco)}</p>
      </div>
      <button type="button" class="botao" data-id="${p.id}">Adicionar</button>
    `;
    lista.appendChild(item);
  });
}

function atualizarCarrinho() {
  let quantidade = 0;
  let total = 0;
  for (const id in carrinho) {
    const produto = produtos.find(p => p.id === id);
    quantidade += carrinho[id];
    total += produto.preco * carrinho[id];
  }
  document.getElementById("btn-carrinho-topo").textContent = "Carrinho (" + quantidade + ")";
  document.getElementById("texto-carrinho").textContent = "Ver carrinho (" + quantidade + ")";
  document.getElementById("total-carrinho").textContent = formatar(total);
}

function irParaCarrinho() {
  window.location.href = "carrinho.html";
}

function iniciar() {
  document.getElementById("nome-unidade").textContent = unidade.nome;

  const participa = usuario.consentimentoFidelidade !== false;
  document.getElementById("link-fidelidade").textContent =
    participa ? "Fidelidade · " + usuario.pontos + " pts" : "Fidelidade";

  document.getElementById("abas").addEventListener("click", function (evento) {
    const categoria = evento.target.dataset.categoria;
    if (!categoria) return;
    categoriaAtual = categoria;
    document.querySelectorAll(".aba").forEach(a => a.classList.remove("ativa"));
    evento.target.classList.add("ativa");
    mostrarProdutos();
  });

  document.getElementById("lista-produtos").addEventListener("click", function (evento) {
    const id = evento.target.dataset.id;
    if (!id) return;
    carrinho[id] = (carrinho[id] || 0) + 1;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
  });

  document.getElementById("btn-ver-carrinho").addEventListener("click", irParaCarrinho);
  document.getElementById("btn-carrinho-topo").addEventListener("click", irParaCarrinho);

  document.getElementById("link-sair").addEventListener("click", function (evento) {
    evento.preventDefault();
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
  });

  mostrarProdutos();
  atualizarCarrinho();
}

if (!unidade) {
  window.location.href = "index.html";
} else if (!usuario) {
  window.location.href = "login.html";
} else {
  iniciar();
}