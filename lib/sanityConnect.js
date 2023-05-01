import { createClient } from "next-sanity";

const clientPreviousYear = createClient({
  projectId: "ltxionfe",
  dataset: "production",
  useCdn: false,
});
const clientBlog = createClient({
  projectId: "ltxionfe",
  dataset: "production",
  useCdn: false,
});

export { clientPreviousYear, clientBlog };
