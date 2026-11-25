const idUnidade = localStorage.getItem("unidadeSelecionada");
const unidade = unidades.find(u => u.id === idUnidade);
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

const pontosMaximo = Math.max(...recompensas.map(r => r.pontos));

function participa() {
  return usuario.consentimentoFidelidade !== false;
}

function salvarUsuario() {
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

function mostrarTela() {
  const dentro = participa();
  document.getElementById("area-participando").hidden = !dentro;
  document.getElementById("area-fora").hidden = dentro;
  if (!dentro) return;

  document.getElementById("saldo").textContent = usuario.pontos;
  const barra = document.getElementById("barra");
  barra.max = pontosMaximo;
  barra.value = Math.min(usuario.pontos, pontosMaximo);

  const proxima = recompensas
    .filter(r => r.pontos > usuario.pontos)
    .sort((a, b) => a.pontos - b.pontos)[0];
  document.getElementById("texto-progresso").textContent = proxima
    ? "Faltam " + (proxima.pontos - usuario.pontos) + " pontos para " + proxima.nome + "."
    : "Você já pode trocar qualquer recompensa.";

  const lista = document.getElementById("lista-recompensas");
  lista.innerHTML = "";
  recompensas.forEach(function (r) {
    const faltam = r.pontos - usuario.pontos;
    const item = document.createElement("article");
    item.className = "item-carrinho";
    item.innerHTML = `
      <div>
        <h2>${r.nome}</h2>
        <p>${r.pontos} pts</p>
      </div>
      <div>
        <button type="button" class="botao" data-id="${r.id}" ${faltam > 0 ? "disabled" : ""}>Trocar</button>
        ${faltam > 0 ? '<p class="aviso">Faltam ' + faltam + " pontos.</p>" : ""}
      </div>
    `;
    lista.appendChild(item);
  });
}

function mostrarMensagemConsentimento(texto) {
  const caixa = document.getElementById("msg-consentimento");
  caixa.textContent = texto;
  caixa.hidden = false;
}

function iniciar() {
  document.getElementById("lista-recompensas").addEventListener("click", function (evento) {
    const id = evento.target.dataset.id;
    if (!id) return;
    const recompensa = recompensas.find(r => r.id === id);
    if (usuario.pontos < recompensa.pontos) return;

    usuario.pontos = usuario.pontos - recompensa.pontos;
    salvarUsuario();

    const pedidoRecompensas = JSON.parse(localStorage.getItem("recompensasPedido")) || [];
    pedidoRecompensas.push(recompensa.id);
    localStorage.setItem("recompensasPedido", JSON.stringify(pedidoRecompensas));

    const caixa = document.getElementById("msg-resgate");
    caixa.innerHTML = "Recompensa adicionada ao seu pedido: <strong>" + recompensa.nome +
      "</strong>. Saldo: " + usuario.pontos + " pts. <a href=\"carrinho.html\">Ver pedido</a>";
    caixa.hidden = false;
    mostrarTela();
  });

  document.getElementById("link-gerenciar").addEventListener("click", function (evento) {
    evento.preventDefault();
    document.getElementById("consentimento").hidden = false;
  });

  document.getElementById("btn-cancelar-consentimento").addEventListener("click", function () {
    document.getElementById("consentimento").hidden = true;
  });

  document.getElementById("btn-sair-fidelidade").addEventListener("click", function () {
    usuario.consentimentoFidelidade = false;
    salvarUsuario();
    document.getElementById("consentimento").hidden = true;
    mostrarTela();
    mostrarMensagemConsentimento("Você saiu da fidelidade. Novos pedidos não acumulam pontos. Você pode voltar quando quiser.");
  });

  document.getElementById("btn-participar").addEventListener("click", function () {
    usuario.consentimentoFidelidade = true;
    salvarUsuario();
    mostrarTela();
    mostrarMensagemConsentimento("Você voltou a participar da fidelidade.");
  });

  mostrarTela();
  if (window.location.hash === "#consentimento" && participa()) {
    document.getElementById("consentimento").hidden = false;
  }
}

if (!unidade) {
  window.location.href = "index.html";
} else if (!usuario) {
  window.location.href = "login.html";
} else {
  iniciar();
}