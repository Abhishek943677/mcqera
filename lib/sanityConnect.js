import { createClient } from "next-sanity";

const  client =createClient({
    projectId: "ltxionfe",
    dataset: "production",
    useCdn: true
  });

  export default client;