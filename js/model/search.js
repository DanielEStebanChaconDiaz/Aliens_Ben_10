// import { movis } from "./peliculas.js";

// export class search extends movis {
//     constructor() {
//       super();
//       if (typeof search.instance === 'object') {
//         return search.instance;
//       }
//       search.instance = this;
//       console.log('search instance created');
//     }
  
//     async buscarAliens(nombre) {
//       try {
//         console.log(`Searching for aliens with nombre: ${nombre}`);
        
//         if (!this.db) {
//           throw new Error('Database connection not established');
//         }
  
//         const collection = this.db.collection('aliens');
//         const query = { nombre: { $regex: nombre, $options: 'i' } };
//         console.log('Query:', query);
  
//         const result = await collection.find(query).toArray();
//         console.log(`Found ${result.length} results`);
  
//         return result;
//       } catch (error) {
//         console.error('Error in buscarAliens:', error);
//         throw error; 
//       }
//     }
//   }