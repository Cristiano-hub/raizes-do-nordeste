if (!localStorage.getItem("unidadeSelecionada")) {
    window.location.href = "index.html";
  }
  
  const formLogin = document.getElementById("form-login");
  const erroLogin = document.getElementById("erro-login");
  
  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
  
    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;
  
    if (email === clienteTeste.email && senha === clienteTeste.senha) {
      const usuario = { nome: clienteTeste.nome, email: clienteTeste.email, pontos: clienteTeste.pontos };
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      window.location.href = "cardapio.html";
    } else {
      erroLogin.textContent = "E-mail ou senha incorretos. Tente novamente.";
      document.getElementById("senha").value = "";
    }
  });