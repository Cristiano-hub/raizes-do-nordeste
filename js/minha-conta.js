const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
  window.location.href = "login.html";
} else {
  document.getElementById("conta-nome").textContent = usuario.nome;
  document.getElementById("conta-email").textContent = usuario.email;
  document.getElementById("conta-fidelidade").textContent =
    usuario.consentimentoFidelidade !== false ? "Participando (" + usuario.pontos + " pts)" : "Não participa";
}