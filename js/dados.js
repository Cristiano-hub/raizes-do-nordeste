const unidades = [
  { id: "recife-boa-vista", nome: "Recife - Boa Vista", cardapio: "Cardápio completo", detalhe: "Loja completa",
    produtos: ["tapioca", "cuscuz", "baiao", "carne-de-sol", "suco-caju"] },
  { id: "sao-paulo-pinheiros", nome: "São Paulo - Pinheiros", cardapio: "Cardápio parcial", detalhe: "Formato reduzido",
    produtos: ["tapioca", "cuscuz", "suco-caju"] },
  { id: "salvador-centro", nome: "Salvador - Centro", cardapio: "Receitas regionais", detalhe: "Loja completa",
    produtos: ["tapioca", "cuscuz", "baiao", "carne-de-sol", "suco-caju"] }
];

const produtos = [
  { id: "tapioca", nome: "Tapioca", preco: 12.90, categoria: "Salgados" },
  { id: "cuscuz", nome: "Cuscuz", preco: 16.90, categoria: "Salgados" },
  { id: "baiao", nome: "Baião de dois", preco: 24.90, categoria: "Salgados" },
  { id: "carne-de-sol", nome: "Carne de sol", preco: 32.90, categoria: "Salgados" },
  { id: "suco-caju", nome: "Suco de caju", preco: 8.90, categoria: "Bebidas" }
];

const clienteTeste = {
  nome: "Cliente Teste",
  email: "cliente@teste.com",
  senha: "123456",
  pontos: 120
};

const recompensas = [
  { id: "suco-gratis", nome: "Suco de caju grátis", pontos: 100 },
  { id: "tapioca-gratis", nome: "Tapioca grátis", pontos: 150 }
];