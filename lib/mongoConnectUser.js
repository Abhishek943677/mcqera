import { MongoClient } from "mongodb";

export async function mongoConnectUser() {
    try {
        const client = new MongoClient(process.env.DATABASE_URL_USER);
      
        const dbName = "mcqera-user";
      
        await client.connect({ useUnifiedTopology: true, useNewUrlParser: true });
      
        console.log("Connected successfully to server of mcqera-user");
      
        const db = client.db(dbName);
        return db;
        
    } catch (error) {
        
    }
}
