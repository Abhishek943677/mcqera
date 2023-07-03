import React, { useEffect, useState } from 'react'
import { clientIgnou } from '../../../../lib/sanityConnect';
import PortableText from 'react-portable-text';
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image';
import { Divider, Paper } from '@mui/material';

export default function Subject({ data }) {
  const [fillImage, setFillImage] = useState(true)


  // image blur effect with next js
  const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

  const toBase64 = str =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str)



  // sanity image url builder
  const builder = imageUrlBuilder(clientIgnou);
  function urlFor(source) {
    return builder.image(source)
  };

  if (!data) return null

  return (
    <main>
      
      <section className="blogpost">
        <h1 className='text-2xl text-center py-2'>{data.subjectName.toUpperCase()}</h1>
        <h1 className='text-2xl text-center py-2'>Session : {data.session}</h1>
        <h1 className='text-lg'>Question Paper :</h1>

        {data.assignmentIimage && data.assignmentIimage.map((image, i) => {
          return <div key={i}
            onClick={(e) => {
              setFillImage(prev => !prev);
              fillImage ? e.target.classList.add('fill-image') : e.target.classList.remove('fill-image')
            }}>

            <Image
              className={`blogpost-main-image`}
              src={urlFor(image).url()}

              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}

              quality={80}
              height={500}
              width={500}
              priority={true}
              alt="Picture of assignment question"
            />
          </div>
        })}

        <article>
          {data.question_answers && data.question_answers.map((item, index) => {
            return (
              <Paper className="flex flex-col my-3 p-2 make-com-dark" key={index}>
                <h1><span>Question {index + 1}. &nbsp;</span>{item.question}</h1>
                <Divider />
                <div className='blogpost'>
                  <span>Answer.</span>
                  <PortableText content={item.answer} />
                </div>
              </Paper>
            )
          })}
        </article>
      </section>
    </main>
  )
}


export async function getStaticProps(context) {

  const data = await clientIgnou.fetch(`*[_type=="post" && slug.current=="${context.params.subject}"]`);

  return {
    props: {
      data: data[0]
    },
    revalidate: 60,
  };
}


export async function getStaticPaths() {

  const pathsdata = await clientIgnou.fetch(`*[_type=="post"]{slug}`)
  const path = pathsdata.map((item) => {
    return { params: { subject: item.slug.current } }
  })

  // console.log(path)
  // [{ params: { subject: 'bpsc' } },{ params: { subject: 'bgdg-101' } }]

  return {
    paths: path,
    fallback: false,
  }
}
