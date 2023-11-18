const {storeDB} = require('../database/database')
const IdGenerator = require('../utils/id_generator')

/**
 * La Classe de L'objet Store pour les boutiques
 */

class Store {
    #information
    #storage
    constructor(){
        this.#storage = storeDB
    }
    /**
     * @param {{name : string, quartier : string, ville : string, rue : string, horaire : Object, images : Array<string>, geolocalisation : string, telephone : string }} param0
     */
    set init ({name, quartier, ville, rue, horaire, images, geolocalisation, telephone}) {
        this.#information = {
            name, quartier, ville, rue, horaire, images, geolocalisation, telephone
        }
    }

    get init(){
        return this.#information
    }

    async sauvegarde(){
        const id = IdGenerator(15, 5)
        await this.#storage.put(id, this.#information)
        return {key : id, value : this.#information}
    }

    /**
     * @param {string} id 
     * @returns
     */
    async dataValue(id) {
        return await this.#storage.get(id)
    }

    /**
     * @param {string} id 
     * @param {any} value 
     */
    modifieValue = async (id, value) => {
        await this.#storage.put(id, value)
        const data = await this.dataValue(id)
        return data
    }
    /**
     * @param {string} id 
     * @returns {void}
     */
    deleteValue = async(id) => {
        try{
            await this.#storage.del(id)
            return {code : 2, message : 'success'}
        } catch (reason) {
            console.log(reason)
        }
    }
}

module.exports = Store