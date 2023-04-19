import { MongoClient } from "mongodb";

export async function mongoConnect() {
    try {
        const client = new MongoClient(process.env.DATABASE_URL);
      
        const dbName = "mcqera";
      
        await client.connect({ useUnifiedTopology: true, useNewUrlParser: true });
      
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
        return db;
        
    } catch (error) {
        
    }
}
