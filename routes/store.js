const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer')
const path = require('path')
const { ressourcesElementDB, userDB, storeDB } = require('../database/database')
const generated_ID = require('./idgen');
const Store = require('../models/store');


const router = express.Router();


const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './images')
    },
    filename : (req, file, cb) => {
        cb(null, "image_" + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({ storage : storage})

router.use(bodyParser.urlencoded({ extended : false}))
router.use(bodyParser.json())



router.get('/', async (req, res) => {
    const tb = []
    for await (const [key, value] of storeDB.iterator()){
        tb.push({key : key, value : value})
    }

    console.log('GET request /store')
    res.json(tb)
});

router.get('/:id', async (req, res) => {
    const { id } = req.params

    const store = new Store()

    const boutique ={
        name : 'Cissys hair EligEssono',
        quartier : 'Elig-Essono',
        ville : "Yaounde",
        rue : 'rue Martin essomba Tabi',
        horaire : {
        lundi : "09:00 - 20:00",
        mardi : "09:00 - 20:00",
        mercredi : "09:00 - 20:00",
        jeudi : "09:00 - 20:00",
        vendredi : "09:00 - 20:00",
        samedi : "09:00 - 20:00",
        dimanche : "12:00 - 20:00",
        },
        images : [
        'images_1',
        'images_1',
        'images_1',
        'images_1',
        ],
        geolocalisation : 'lorem12;nckndkljnlkjnlje298cajernclsjinrliuensljnlijnljinkjnkln98jlnknkj',
        telephone :  '+237 655733765'
    }

    store.init = boutique
    
    try{
        const result = await store.dataValue(id)
        res.json({key : id, value : result})
    } catch (reason){
        console.log(reason)
        res.status(500)
    }
});

router.put('/:id', async (req, res) => {

    const { id } = req.params
    const data = req.body

    const store = new Store()
    const value = {...data}

    try{
        const teste = await store.modifieValue(id, value)
        res.json(teste)
    } catch (reason){
        console.log(reason)
        res.status(500)
    } 
});

router.delete('/:id', async (req, res) => {

    const { id } = req.params

    const store = new Store()
    const value = {...data}

    try{
        const teste = await store.deleteValue(id, value)
        res.json(teste)
    } catch (reason){
        console.log(reason)
        res.status(500)
    } 
});

router.post('/', async (req, res) => {
    const ressource = await req.body

    const store = new Store()

    const boutique ={
        ...ressource
    }

    
    try{
        store.init = boutique
        const data =  await store.sauvegarde()
        console.log(data)
        res.json(data)

    } catch (reason) {
        console.log(reason)
        res.status(500)
    }
});


module.exports = router