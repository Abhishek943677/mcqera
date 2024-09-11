import { MongoClient } from "mongodb";

export async function mongoConnectExam() {
    try {
        const client = new MongoClient(process.env.DATABASE_URL_EXAM);
      
        const dbName = "mcqera-exam";
      
        await client.connect({ useUnifiedTopology: true, useNewUrlParser: true });
      
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
        return db;
        
    } catch (error) {
        
    }
}
