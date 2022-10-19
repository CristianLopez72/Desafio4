//Importo Librerias a utilizar
const { Router } = require ('express');
const ProductosRouter = require ('./productos');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'El router funciona ok'
    })
})

router.use('/productos', ProductosRouter);

module.exports = router;
