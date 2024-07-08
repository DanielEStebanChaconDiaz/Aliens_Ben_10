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
}