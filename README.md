# Raízes do Nordeste

Protótipo front-end de um sistema de pedidos para a rede fictícia **Raízes do Nordeste**, com três canais: **Web, Aplicativo (mobile) e Totem de autoatendimento**. Projeto da disciplina de Desenvolvimento Front-end (Uninter), do curso de Análise e Desenvolvimento de Sistemas.

**Site publicado:** https://cristiano-hub.github.io/raizes-do-nordeste/

## Tecnologias
HTML, CSS e JavaScript puros, sem frameworks e sem servidor. Os dados (unidades, cardápio, pedidos e fidelidade) são **fictícios (mockados)** em arquivos JavaScript, e o carrinho, a unidade escolhida e o login ficam no localStorage do navegador.

## Como usar
1. Abra o link do site. A tela inicial pede para escolher a unidade (por exemplo, Recife - Boa Vista).
2. Para entrar, use o **cliente de teste**: e-mail `cliente@teste.com` e senha `123456` (120 pontos de fidelidade).
3. Monte o pedido no cardápio, vá ao carrinho e finalize com Pix ou cartão (pagamento **simulado**).
4. Para testar o **Totem**, abra `totem.html` (modo convidado, sem coleta de dados pessoais).

## Páginas
`index.html` (unidade), `login.html`, `cadastro.html`, `cardapio.html`, `carrinho.html`, `acompanhamento.html`, `fidelidade.html`, `minha-conta.html`, `ajuda.html`, `politica.html`, `totem.html` e `totem-pagamento.html`.

## Limitações do protótipo
- O cadastro é simulado e **não é gravado**; o login só aceita o cliente de teste.
- O pagamento é simulado, sem integração com operadora e sem dados de cartão.
- O número do pedido é fixo (mock) e a localização é apenas ilustrativa.

## LGPD
A interface aplica princípios da LGPD: consentimento ativo e separado para fidelidade e promoções, revogação em Minha conta, e links de **Ajuda** e **Política de privacidade** em todas as telas.

## Autor
Cristiano Cunha Andrade, RU 1855110. Orientação: Prof. Esp. Giuliano Lanes de Almeida.
