const { Level } = require('level')
const db = new Level('./database')
const storeDB = db.sublevel('stores', { valueEncoding :'json' })
const imagesDB = db.sublevel('images', { valueEncoding : 'json'})
const productDB = db.sublevel('ressources', { valueEncoding : 'json'})
const tutorielDB = db.sublevel('tutoriels', { valueEncoding : 'json'})
const coiffeusesDB = db.sublevel('profs', { valueEncoding : 'json'})

module.exports = {
    db, 
    storeDB, 
    imagesDB,
    productDB,
    tutorielDB,
    coiffeusesDB
}