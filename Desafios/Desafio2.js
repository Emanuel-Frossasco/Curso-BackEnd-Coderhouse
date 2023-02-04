const fs = require("fs");

class Product{
    constructor(id, title, description, price, thumbnail, code, stock){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
class ProductManager{
    constructor(path){
        this.path = path;
    }
    async getProducts() {
    if(fs.existsSync(this.path)){
        let data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }else{
        return [];
    }
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        let productExists = (this.products.findIndex(product => product.code === code) !== -1);
        let empty = !(title && description && price && thumbnail && code && stock);
        if(productExists || empty){
            console.log(`Product not added.\nErrors:\n${productExists ? 'Product already exists.\n' : ''} ${empty ? 'Must complete all fields.' : ''}`);
        }else{
            let id = this.products.length + 1;
            let newProduct = new Product (id, title, description, price, thumbnail, code, stock);
            this.products.push(newProduct);
            console.log(`Product ${title} added with ID ${id}`);
        }
    }
    async getProductById(id){
    let products = await this.getProducts();
    let productIndex = products.findIndex((product) => product.id === id);
    let productExists = productIndex !== -1;
    if (productExists) {
        return products[productIndex];
    }else{
        console.log("Product not found.");
        }
    }
    async updateProduct(id, title, description, price, thumbnail, code, stock) {
        let products = await this.getProducts();
        let productIndex = products.findIndex((product) => product.id === id);
        let productExists = productIndex !== -1;
        if (productExists){
            products[productIndex].title = title;
            products[productIndex].description = description;
            products[productIndex].price = price;
            products[productIndex].thumbnail = thumbnail;
            products[productIndex].code = code;
            products[productIndex].stock = stock;
            await fs.promises.writeFile(this.path, JSON.stringify(products,null,2));
            console.log(`Product ${title} with ID ${id} updated successfully`);
        }else{
        console.log("Product not found.");
        }
    }
    async deleteProduct(id) {
        let products = await this.getProducts();
        let productIndex = products.findIndex((product) => product.id === id);
        let productExists = productIndex !== -1;
        if (productExists) {
        products[productIndex] = {};
        await fs.promises.writeFile(this.path, JSON.stringify(products,null,2));
        console.log(`Product with ID ${id} deleted successfully`);
        }else{
        console.log("Product not found.");
        }
    }
}
//console.clear();
let pm = new ProductManager("./files/products.json");
pm.getProducts().then(products => console.log(products));
pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
pm.getProducts().then(products => console.log(products));
pm.getProductById(1).then(product => console.log(product));
pm.updateProduct(1, "producto prueba modificado", "Este es un producto prueba modificado", 300, "Sin imagen modificado", "abc123 modificado", 36);
pm.deleteProduct(1);
