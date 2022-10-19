//importo librerias a utilizar
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');

//Creo la Clase
class ProductosApi {
    constructor () {
        this.productos = [
            { id:uuidv4(), title: 'Mermelada de Ciruela', price: 580},
            { id:uuidv4(), title: 'Mermelada de Damasco', price: 700},
            { id:uuidv4(), title: 'Mermelada de Durazno', price: 630},
            { id:uuidv4(), title: 'Mermelada de Membrillo', price: 630}           
        ];
    }

    //Reviso que exista el ID
    existe(id) {
        const indice = this.productos.findIndex(aProduct => aProduct.id == id)
        
        return indice >= 0;
    }
 
    //Valido Datos ingresados
    validarBody(producto) {
        if(!producto.title || !producto.price || typeof producto.title !== 'string' || typeof producto.price !== 'number') throw createError(400,'Datos invalidos');
    }

    //Traigo todos los productos
    getAll() {
        return this.productos;
    }

    //Traigo un producto con un ID especifico
    getById(id) {
        const existe = this.existe(id);
        
        if (!existe) throw createError (404, 'El producto no existe');
        const indice = this.productos.findIndex(aProduct => aProduct.id == id)
        return this.productos[indice];
    }

    //Agrego un producto nuevo
    save(producto) {
        this.validarBody(producto);

        const nuevoProducto = {
            id: uuidv4(),
            title: producto.title,
            price: producto.price,
        }
    
        this.productos.push(nuevoProducto);
        return nuevoProducto;
    }

    //Modifico datos de un producto con un ID especifico
    updateById(id, datosnuevos) {
        const existe = this.existe(id);

        if(!existe) throw createError (404, "Producto no encontrado");

        this.validarBody(datosnuevos);

        const indice = this.productos.findIndex(aProduct => aProduct.id == id)
        const productoAnterior = this.productos[indice];
        const nuevoProducto = {
            id: productoAnterior.id,
            title: datosnuevos.title,
            price: datosnuevos.price,

        }
        this.productos.splice(indice,1,nuevoProducto);
        return nuevoProducto;
    }

    //Borro un producto con un ID especifico
    deleteById(id) {
        const existe = this.existe(id);

        if(!existe) return;

        const indice = this.productos.findIndex(aProduct => aProduct.id == id)

        this.productos.splice(indice,1);
    }
}

const instanciaProductosApi = new ProductosApi();

module.exports = {
    ProductosApiexp : instanciaProductosApi
}