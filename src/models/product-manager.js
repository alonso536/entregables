import fs from "fs";
import Product from "./product.js";

import { dirname } from "../path.js";

class ProductManager {
    constructor() {
        this.products = [];
        this.path = `${dirname}/database/data.json`;

        if(fs.existsSync(this.path)) {
            let info = fs.readFileSync(this.path, { encoding: 'utf-8' });
            if(info) {
                this.products = JSON.parse(info);
                Product.increments = this.products.at(-1).id;
            }
        }
    }

    addProduct(product) {
        this.products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2, "\t"));
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let product = this.products.find(p => p.id === id);
        if(!product) {
            throw new Error(`No existe un producto con el id ${id}`);
        }
        return product;
    }
}

export default ProductManager;