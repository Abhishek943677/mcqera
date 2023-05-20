import { createClient } from "next-sanity";

const clientPreviousYear = createClient({
  projectId: "ltxionfe",
  dataset: "production",
  useCdn: false,
});
const clientTopics = createClient({
  projectId: "zk4om3a2",
  dataset: "production",
  useCdn: false,
});
const clientQuickLinks = createClient({
  projectId: "tudbzgpd",
  dataset: "production",
  useCdn: false,
});

export { clientPreviousYear, clientTopics,clientQuickLinks };
