// movis.js

import { ObjectId } from "mongodb";
import { connect } from "../../helpers/db/connect.js"


export class movis extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof movis.instance === 'object') {
            return movis.instance;
        }
        movis.instance = this;
        return this;
    }
    async getAlienAll(){
        const collection = this.db.collection('aliens');
        const data = await collection.find(
        ).toArray();
        // await this.conexion.close();
        return data;
    }

    async buscarAliens(nombre) {
        try {
          console.log(`Searching for aliens with nombre: ${nombre}`);
          
          if (!this.db) {
            throw new Error('Database connection not established');
          }
    
          const collection = this.db.collection('aliens');
          const query = { nombre: { $regex: nombre, $options: 'i' } };
          console.log('Query:', query);
    
          const result = await collection.find(query).toArray();
          console.log(`Found ${result.length} results`);
    
          return result;
        } catch (error) {
          console.error('Error in buscarAliens:', error);
          throw error; 
        }
      }
}