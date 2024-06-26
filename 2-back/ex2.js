const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.currentId = 0;

        this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            this.currentId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Todos os campos são obrigatórios');
            return;
        }

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
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error('Não encontrado');
            return;
        }
        return product;
    }

    updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.error('Produto não encontrado');
            return;
        }

        const product = this.products[productIndex];

        this.products[productIndex] = {
            ...product,
            title: title || product.title,
            description: description || product.description,
            price: price || product.price,
            thumbnail: thumbnail || product.thumbnail,
            code: code || product.code,
            stock: stock || product.stock
        };

        this.saveProducts();
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.error('Produto não encontrado');
            return;
        }

        this.products.splice(productIndex, 1);
        this.saveProducts();
    }
}

const productManager = new ProductManager('products.json');

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

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
productManager.updateProduct(1, { price: 150 });
console.log(productManager.getProductById(1));
productManager.deleteProduct(2);
console.log(productManager.getProducts());

// :)