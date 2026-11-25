const TEMPO_INATIVIDADE = 60000; // RNF09: 60 segundos
const UNIDADE_TOTEM = "recife-boa-vista";

function formatar(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function lerCarrinhoTotem() {
  return JSON.parse(localStorage.getItem("carrinhoTotem")) || {};
}

function salvarCarrinhoTotem(carrinho) {
  localStorage.setItem("carrinhoTotem", JSON.stringify(carrinho));
}

function lerUsuarioTotem() {
  return JSON.parse(localStorage.getItem("totemUsuario"));
}

function calcularTotalTotem(carrinho) {
  let total = 0;
  for (const id in carrinho) {
    const produto = produtos.find(p => p.id === id);
    total += produto.preco * carrinho[id];
  }
  return total;
}

// Volta à tela inicial e encerra a sessão do Totem (pedido em montagem e login)
function reiniciarTotem() {
  localStorage.removeItem("carrinhoTotem");
  localStorage.removeItem("totemUsuario");
  window.location.href = "totem.html";
}

let temporizadorInatividade = null;

function zerarInatividade() {
  clearTimeout(temporizadorInatividade);
  temporizadorInatividade = setTimeout(reiniciarTotem, TEMPO_INATIVIDADE);
}

function iniciarInatividade() {
  ["click", "touchstart", "keydown"].forEach(function (tipo) {
    document.addEventListener(tipo, zerarInatividade);
  });
  zerarInatividade();
}