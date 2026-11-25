const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
const pedido = JSON.parse(localStorage.getItem("pedido"));

const etapas = ["Recebido", "Em preparo", "Pronto para retirada", "Entregue"];
let temporizador = null;

function mostrarPrevisao() {
  const texto = document.getElementById("previsao");
  if (pedido.etapa < 2) {
    texto.textContent = "Previsão de retirada: 15 minutos.";
  } else if (pedido.etapa === 2) {
    texto.textContent = "Seu pedido está pronto! Retire na loja.";
  } else {
    texto.textContent = "Pedido entregue. Bom apetite!";
  }
}

function mostrarLinhaDoTempo() {
  const lista = document.getElementById("linha-tempo");
  lista.innerHTML = "";

  etapas.forEach(function (nome, indice) {
    const item = document.createElement("li");
    item.textContent = nome;
    if (indice < pedido.etapa) {
      item.className = "concluida";
    } else if (indice === pedido.etapa) {
      item.className = "atual";
      item.textContent = nome + " · etapa atual";
    }
    lista.appendChild(item);
  });
  mostrarPrevisao();
}

function avancar() {
  if (pedido.etapa < etapas.length - 1) {
    pedido.etapa = pedido.etapa + 1;
    localStorage.setItem("pedido", JSON.stringify(pedido));
    mostrarLinhaDoTempo();
  }
  if (pedido.etapa >= etapas.length - 1) {
    clearInterval(temporizador);
  }
}

function iniciar() {
  if (pedido.etapa === undefined) {
    pedido.etapa = 0;
    localStorage.setItem("pedido", JSON.stringify(pedido));
  }
  document.getElementById("numero-pedido").textContent = pedido.numero;
  document.getElementById("unidade-pedido").textContent = "Unidade: " + pedido.unidade;
  mostrarLinhaDoTempo();

  if (pedido.etapa < etapas.length - 1) {
    temporizador = setInterval(avancar, 4000);
  }
}

if (!usuario) {
  window.location.href = "login.html";
} else if (!pedido || pedido.status !== "Pagamento aprovado") {
  window.location.href = "cardapio.html";
} else {
  iniciar();
}