import { MongoClient } from "mongodb";

export async function mongoConnectLearn() {
    try {
        const client = new MongoClient(process.env.DATABASE_URL_LEARN);
      
        const dbName = "mcqera-learn";
      
        await client.connect({ useUnifiedTopology: true, useNewUrlParser: true });
      
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
        return db;
        
    } catch (error) {
        
    }
}
