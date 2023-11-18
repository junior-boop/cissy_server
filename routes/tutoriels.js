const bodyParser = require('body-parser');
const express = require('express');
const { tutorielDB } = require('../database/database')
const Tutoriel = require('../models/ressources');


const router = express.Router();

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


router.use(bodyParser.urlencoded({ extended : false}))
router.use(bodyParser.json())



router.get('/', async (req, res) => {
    const tb = []
    for await (const [key, value] of tutorielDB.iterator()){
        tb.push({key : key, value : value})
    }

    console.log('GET request /tutoriels')
    res.json(tb)
});

router.get('/:id', async (req, res) => {
    const { id } = req.params

    const tutoriels = new Tutoriel()

    tutoriels.init = boutique
    
    try{
        const result = await tutoriels.dataValue(id)
        res.json({key : id, value : result})
    } catch (reason){
        console.log(reason)
        res.status(500)
    }
});

router.put('/:id', async (req, res) => {

    const { id } = req.params
    const data = req.body

    const tutoriels = new Tutoriel()
    const value = {...data}

    try{
        const result = await tutoriels.modifieValue(id, value)
        res.json(result)
    } catch (reason){
        console.log(reason)
        res.status(500)
    } 
});

router.delete('/:id', async (req, res) => {

    const { id } = req.params

    const tutoriels = new Tutoriel()

    try{
        const teste = await tutoriels.deleteValue(id)
        res.json(teste)
    } catch (reason){
        console.log(reason)
        res.status(500)
    } 
});

router.post('/', async (req, res) => {
    const ressource = await req.body

    const tutoriels = new Tutoriel()

    const boutique = {
        ...ressource
    }

    
    try{
        tutoriels.init = boutique
        const data =  await tutoriels.sauvegarde()
        res.json(data)

    } catch (reason) {
        console.log(reason)
        res.status(500)
    }
});


module.exports = router