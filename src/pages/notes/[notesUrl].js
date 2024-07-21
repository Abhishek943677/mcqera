import React, { useEffect, useState } from "react";
import PortableText from "react-portable-text";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { Button, Divider, Paper } from "@mui/material";
import { clientNotes } from "../../../lib/sanityConnect";
import Link from "next/link";
import { NextSeo } from "next-seo";

export default function NotesPage({ data }) {
  if (!data) return null;

  // console.log(data);

  return (
    <main>
      {/* seo */}
      <NextSeo
        title={`${data.title} | Mcqera`}
        description={`Access comprehensive handwritten notes ${data.title} , providing detailed study materials and resources. Enhance your understanding of ${data.category} exam concepts with visually appealing and well-organized notes of ${data.title}.`}
        canonical={`https://mcqera.com/notes/${data.slug.current}`}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "Handwritten notes, study materials, notes for exams, exam preparation, subject-wise notes, comprehensive notes, visual notes, study resources, revision notes, hand-drawn diagrams, note-taking techniques, effective study notes, class notes, lecture notes, exam tips and tricks, topic-wise notes, high-quality notes, detailed explanations, visual aids, study guides",
          },
        ]}
      />
      {/*  seo*/}

      <h1 className="text-2xl text-center py-2">{data.title.toUpperCase()}</h1>

      <article className="blogpost">
        <PortableText content={data.body} />
      </article>
      
      <div className="flex justify-center my-3 rounded">
        <iframe
          width="640"
          height="480"
          src={data.url.replace("view?usp=drive_link", "preview")}
        ></iframe>
      </div>

      <div className="flex justify-center">
        <Button variant="contained">
          <Link href={data.url} target="_blank">
            download
          </Link>
        </Button>
      </div>
    </main>
  );
}

export async function getStaticProps(context) {
  const data = await clientNotes.fetch(
    `*[_type=="notes" && slug.current=="${context.params.notesUrl}"]`
  );
  // console.log(data);
  return {
    props: {
      data: data[0],
    },
    revalidate: 1200,
  };
}

export async function getStaticPaths() {
  const pathsdata = await clientNotes.fetch(`*[_type=="notes"]{slug}`);
  const path = pathsdata.map((item) => {
    return { params: { notesUrl: item.slug.current } };
  });

  // console.log(path)
  // [{ params: { notesUrl: 'bpsc' } },{ params: { notesUrl: 'bgdg-101' } }]

  return {
    paths: path,
    fallback: "blocking",
  };
}
