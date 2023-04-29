import { createClient } from "next-sanity";

const  client =createClient({
    projectId: "ltxionfe",
    dataset: "production",
    useCdn: false
  });

  export default client;