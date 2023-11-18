const bodyParser = require('body-parser');
const express = require('express');

const { productDB } = require('../database/database');
const Product = require('../models/product');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended : false}))
router.use(bodyParser.json())



router.get('/', async (req, res) => {
    const tb = []
    for await (const [key, value] of productDB.iterator()){
        tb.push({key : key, value : value})
    }

    console.log('GET request /products')
    res.json(tb)
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const product = new Product()
    
    const data = await product.dataValue(id)

    console.log('GET request /products/', id)
    res.json(data)
});

router.post('/', async (req, res) => {
    const data = await req.body
    const product = new Product()

    const inStock = data.quantite > 1 ? true : false
    const products = {
        ...data, 
        enStock : inStock
    }

    product.init = products
    
    try{
        const result = await product.sauvegarde()
        res.json(result)

    } catch (reason) {
        console.log(reason)
        res.status(500, 'il y a un probleme' + reason)
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const product = new Product()

    try {
        await product.deleteValue(id)
        res.json({code : 2, message : 'supprimer'})
    } catch (reason){
        console.log(reason)
        res.write("Il y a une erreur: " + reason)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const data = req.body
    const product = new Product()
    
    const inStock = data.quantite > 1 ? true : false
    const products = {
        ...data, 
        enStock : inStock
    }

    const results = await product.modifieValue(id, products)

    console.log('GET request /products/', id)
    res.json(results)
});

module.exports = router