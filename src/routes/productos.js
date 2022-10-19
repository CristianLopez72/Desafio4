//importo librerias a utilizar
const { Router } = require ('express');
const { ProductosApiexp } = require('../api/productos');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: ProductosApiexp.getAll()
    })
})

router.get('/:id', (req, res) => {
    const id  = req.params.id;
    const producto = ProductosApiexp.getById(id)

    res.json({
        msg: producto
    })
})

router.post('/', (req, res) => {
    const { body } = req;
    const producto = ProductosApiexp.save(req.body);
    res.json({
        msg: producto
    })
})

router.put('/:id', (req, res) => {
    const id  = req.params.id;
    const { body } = req
    const producto = ProductosApiexp.updateById(id, body)
    res.json({
        msg: producto
    })
})

router.delete('/:id', (req, res) => {
    const id  = req.params.id;
    res.json({
        msg: ProductosApiexp.deleteById(id)
    })
})

module.exports = router;
