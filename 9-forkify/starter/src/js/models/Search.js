import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor (query) {
        this.query = query;
    }

    async getResults () {
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
            
            if(!res.data.error){
                this.result = res.data.recipes;
                console.log(res)
            }
            alert(res.data.error)           

        } catch(e) {
            alert(e)
        }
    }
}