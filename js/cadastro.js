if (!localStorage.getItem("unidadeSelecionada")) {
  window.location.href = "index.html";
}

const formCadastro = document.getElementById("form-cadastro");
const aceitePolitica = document.getElementById("aceite-politica");
const botaoCriar = document.getElementById("btn-criar");

aceitePolitica.addEventListener("change", function () {
  botaoCriar.disabled = !aceitePolitica.checked;
});

formCadastro.addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (!aceitePolitica.checked) return;

  const usuario = {
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    pontos: 120,
    consentimentoFidelidade: document.getElementById("aceite-fidelidade").checked
  };
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  window.location.href = "cardapio.html";
});