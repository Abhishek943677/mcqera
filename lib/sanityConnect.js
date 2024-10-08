import { createClient } from "next-sanity";

const clientPreviousYear = createClient({
  projectId: "ltxionfe",
  dataset: "production",
  // apiVersion: '2021-08-31', // use a UTC date string
  useCdn: true,
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
const clientIgnou = createClient({
  projectId: "7vb1291b",
  dataset: "production",
  apiVersion: '2021-10-21', // use a UTC date string
  useCdn: false,
});
const clientNotes = createClient({
  projectId: "a4x8qzz0",
  dataset: "production",
  apiVersion: '2021-10-21', // use a UTC date string
  useCdn: false,
});
const clientMenu = createClient({
  projectId: "kyg93shv",
  dataset: "production",
  apiVersion: '2022-03-07', // use a UTC date string
  useCdn: true,
});

export { clientPreviousYear, clientTopics,clientQuickLinks,clientIgnou ,clientNotes , clientMenu};
