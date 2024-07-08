// connect.js
import {MongoClient} from 'mongodb';

export class connect {
    static instance;
    user;
    port;
    cluster;
    #host;
    #pass
    #dbName
    constructor({host, user, pass, port,cluster, dbName}=
        {host: "mongodb://", 
            user: "mongo", 
            pass: "UlLQzNPpJfwVUcWiEqSpNSnlZqGBFctp", 
            port: 59404, 
            cluster: "monorail.proxy.rlwy.net", 
            dbName: "test"}
        ) {
            if (typeof connect.instance === 'object') {
                return connect.instance;
            }
            this.setHost = host;
            this.user = user;
            this.setPass = pass;
            this.port = port;
            this.cluster = cluster;
            this.setDbName = dbName;
            this.#open();
            connect.instance = this;
            return this;
        }
        set setHost(host) {
            this.#host = host;
        }
        set setPass(pass) {
            this.#pass = pass;
        }
        set setDbName(dbName) {
            this.#dbName = dbName;
        }
        get getDbName() {
            return this.#dbName;
        }
        async #open() {
            console.log("CONNECTION ATTEMPTING...");
        
            let url = `${this.#host}${this.user}:${this.#pass}@${this.cluster}:${this.port}`;
            this.conexion = new MongoClient(url);
        
            try {
                await this.conexion.connect();
            } finally {
                // console.clear();
                console.log("Connected successfully!");
            }
        }
        async getData(collectionName) {
            const db = this.conexion.db(this.#dbName);
            const collection = db.collection(collectionName);
            return await collection.find({}).toArray();
        }
    }
    
    export default connect;