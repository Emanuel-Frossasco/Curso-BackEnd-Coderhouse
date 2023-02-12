class Product {
    constructor(id, title, description, price, thumbnail, code, stock) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
class ProductManager {
    constructor() {
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        let productExists = (this.products.findIndex(product => product.code === code) !== -1);
        let empty = !(title && description && price && thumbnail && code && stock);
        if (productExists || empty){
            console.log(`Product not added.\nErrors:\n${productExists ? 'Product already exists.\n' : ''} ${empty ? 'Must complete all fields.' : ''}`);
        }else{
            let id = this.products.length + 1;
            let newProduct = new Product (id, title, description, price, thumbnail, code, stock);
            this.products.push(newProduct);
            console.log(`Product ${title} added with ID ${id}`);
        }
    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        let productIndex = this.products.findIndex(product => product.id === id);
        if(productIndex === -1){
            console.log('Not found.');
        }else{
            return this.products[productIndex]
        }
    }
}
console.clear();
let pm = new ProductManager;
console.log(pm.getProducts());
pm.addProduct('Producto prueba', 'Este es un producto prueba', 550, 'Sin imagen', '121212', 12);
console.log(pm.getProducts());
pm.addProduct('Producto prueba', 'Este es un producto prueba', 550, 'Sin imagen', '121212', 12);
pm.getProductById(2);
console.log(pm.getProductById(1));