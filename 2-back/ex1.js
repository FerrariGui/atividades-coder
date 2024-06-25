class ProductManager {
    constructor() {
      this.products = [];
      this.currentId = 0;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Todos os campos são obrigatórios');
        return;
      }
  
      // Verificar se o código já existe
      if (this.products.some(product => product.code === code)) {
        console.error(`O produto com o código ${code} já existe`);
        return;
      }
  
      const newProduct = {
        id: ++this.currentId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(newProduct);
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        console.error('Não encontrado');
        return;
      }
      return product;
    }
  }
  
  const productManager = new ProductManager();
  
  productManager.addProduct({
    title: 'Produto 1',
    description: 'Descrição do Produto 1',
    price: 100,
    thumbnail: '/caminho/imagem1.jpg',
    code: 'P001',
    stock: 10
  });
  
  productManager.addProduct({
    title: 'Produto 2',
    description: 'Descrição do Produto 2',
    price: 200,
    thumbnail: '/caminho/imagem2.jpg',
    code: 'P002',
    stock: 20
  });
  
  console.log(productManager.getProductById(1)); 
  console.log(productManager.getProductById(3)); 