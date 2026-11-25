const unidadeTotem = unidades.find(u => u.id === UNIDADE_TOTEM);
let carrinho = lerCarrinhoTotem();
let processando = false;

function mostrarResumo() {
  const area = document.getElementById("itens-pedido");
  area.innerHTML = "";
  for (const id in carrinho) {
    const p = produtos.find(x => x.id === id);
    const linha = document.createElement("article");
    linha.className = "item-carrinho";
    linha.innerHTML = `
      <div><h2>${p.nome}</h2><p>${carrinho[id]} × ${formatar(p.preco)}</p></div>
      <strong>${formatar(p.preco * carrinho[id])}</strong>
    `;
    area.appendChild(linha);
  }
  document.getElementById("total-pedido").textContent = formatar(calcularTotalTotem(carrinho));
}

function esconderMensagens() {
  document.getElementById("msg-processando").hidden = true;
  document.getElementById("caixa-falha").hidden = true;
  document.getElementById("caixa-sucesso").hidden = true;
}

function pagar() {
  if (processando) return;
  const forma = document.querySelector('input[name="forma"]:checked').value;

  processando = true;
  esconderMensagens();
  document.getElementById("btn-finalizar").disabled = true;
  document.getElementById("msg-processando").hidden = false;

  setTimeout(function () {
    processando = false;
    document.getElementById("msg-processando").hidden = true;
    document.getElementById("btn-finalizar").disabled = false;

    if (document.getElementById("simular-falha").checked) {
      pagamentoFalhou();
    } else {
      pagamentoAprovado(forma);
    }
  }, 2000);
}

function pagamentoFalhou() {
  // RN04: o pedido não é cancelado, fica pendente até uma nova tentativa
  document.getElementById("caixa-falha").hidden = false;
}

function pagamentoAprovado(forma) {
  const total = calcularTotalTotem(carrinho);
  let numero = Number(localStorage.getItem("totemSenha")) || 41;
  numero = numero + 1;
  localStorage.setItem("totemSenha", numero);
  const senha = "A-" + String(numero).padStart(3, "0");

  let texto = "Pedido de " + formatar(total) + " pago com " + forma + ". Retire na loja quando a senha for chamada.";

  // RN03 e RN05: só acumula pontos quem está identificado e participa da fidelidade
  const usuario = lerUsuarioTotem();
  if (usuario && usuario.consentimentoFidelidade !== false) {
    const ganhos = Math.floor(total);
    usuario.pontos = usuario.pontos + ganhos;
    localStorage.setItem("totemUsuario", JSON.stringify(usuario));
    texto += " Você ganhou " + ganhos + " pontos. Saldo: " + usuario.pontos + " pts.";
  } else {
    texto += " Modo convidado: este pedido não acumulou pontos.";
  }

  carrinho = {};
  salvarCarrinhoTotem(carrinho);

  document.getElementById("area-pagamento").hidden = true;
  document.getElementById("senha-pedido").textContent = senha;
  document.getElementById("texto-sucesso").textContent = texto;
  document.getElementById("caixa-sucesso").hidden = false;
}

if (Object.keys(carrinho).length === 0) {
  window.location.href = "totem.html";
} else {
  document.getElementById("nome-unidade").textContent = unidadeTotem.nome;
  mostrarResumo();

  document.getElementById("btn-finalizar").addEventListener("click", pagar);
  document.getElementById("btn-tentar").addEventListener("click", pagar);
  document.getElementById("btn-outra-forma").addEventListener("click", function () {
    esconderMensagens();
    document.getElementById("area-pagamento").scrollIntoView();
  });

  iniciarInatividade();
}