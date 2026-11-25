const lista = document.getElementById("lista-unidades");
const busca = document.getElementById("busca");

function mostrarUnidades(filtro) {
  lista.innerHTML = "";
  const texto = filtro.toLowerCase();
  const encontradas = unidades.filter(u => u.nome.toLowerCase().includes(texto));

  encontradas.forEach(u => {
    const cartao = document.createElement("article");
    cartao.className = "cartao";
    cartao.innerHTML = `
      <h2>${u.nome}</h2>
      <p>${u.detalhe}</p>
      <span class="etiqueta">${u.cardapio}</span>
      <button class="botao botao-principal" data-id="${u.id}">Selecionar</button>
    `;
    lista.appendChild(cartao);
  });

  if (encontradas.length === 0) {
    lista.innerHTML = "<p>Nenhuma unidade encontrada.</p>";
  }
}

lista.addEventListener("click", function (evento) {
  const id = evento.target.dataset.id;
  if (!id) return;
  if (localStorage.getItem("unidadeSelecionada") !== id) {
    localStorage.removeItem("carrinho");
  }
  localStorage.setItem("unidadeSelecionada", id);

  if (localStorage.getItem("usuarioLogado")) {
    window.location.href = "cardapio.html";
  } else {
    window.location.href = "login.html";
  }
});

busca.addEventListener("input", () => mostrarUnidades(busca.value));

document.getElementById("btn-localizacao").addEventListener("click", () => {
  alert("Simulação: localização consentida. Unidade sugerida: Recife - Boa Vista");
});

mostrarUnidades("");