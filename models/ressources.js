const {tutorielDB} = require('../database/database')
const IdGenerator = require('../utils/id_generator')

/**
 * La Classe de L'objet Store pour les boutiques
 */

class Tutoriel {
    #information
    #storage
    constructor(){
        this.#storage = tutorielDB
    }
    /**
     * @param {{titre : string, lien : string, dateDePublication : number, auteur : string, duree : boolean, images : Array<string>}} param0
     */
    set init ({titre, lien, dateDePublication, auteur, images, duree}) {
        this.#information = {
            titre, lien, dateDePublication, auteur, images, duree
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

module.exports = Tutoriel