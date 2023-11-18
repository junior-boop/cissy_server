const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer')
const path = require('path')
const { coiffeusesDB } = require('../database/database')
const generated_ID = require('./idgen');
const Professionnel = require('../models/professionnel');


const router = express.Router();


router.use(bodyParser.urlencoded({ extended : false}))
router.use(bodyParser.json())



router.get('/', async (req, res) => {
    const tb = []
    for await (const [key, value] of coiffeusesDB.iterator()){
        tb.push({key : key, value : value})
    }

    console.log('GET request /coiffeuses')
    res.json(tb)
});

router.get('/:id', async (req, res) => {
    const { id } = req.params

    const professionnel = new Professionnel()

    professionnel.init = boutique
    
    try{
        const result = await professionnel.dataValue(id)
        res.json({key : id, value : result})
    } catch (reason){
        console.log(reason)
        res.status(500)
    }
});

router.put('/:id', async (req, res) => {

    const { id } = req.params
    const data = req.body

    const professionnel = new Professionnel()
    const value = {...data}

    try{
        const teste = await professionnel.modifieValue(id, value)
        res.json(teste)
    } catch (reason){
        console.log(reason)
        res.status(500)
    } 
});

router.delete('/:id', async (req, res) => {

    const { id } = req.params

    const professionnel = new Professionnel()

    try{
        const teste = await professionnel.deleteValue(id)
        res.json(teste)
    } catch (reason){
        console.log(reason)
        res.status(500)
    } 
});

router.post('/', async (req, res) => {
    const ressource = await req.body

    const professionnel = new Professionnel()

    const boutique ={
        ...ressource
    }

    
    try{
        professionnel.init = boutique
        const data =  await professionnel.sauvegarde()
        res.json(data)

    } catch (reason) {
        console.log(reason)
        res.status(500)
    }
});


module.exports = router