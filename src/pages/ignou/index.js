import React, { useEffect } from 'react'
import { clientIgnou } from '../../../lib/sanityConnect';
import { Paper } from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';

const Index = ({ data }) => {
console.log(data);
  return (
    <main>
      {data.map((element, i) => {
        return (
          <Paper className='make-com-dark p-3 my-2' key={i}>
            <h1 className='text-2xl text-center'>{element[0].session}</h1>
            {element.map((item, index) => {
              return (
                <div key={index} className='p-1 my-1 hover:opacity-50 w-fit'>
                  <Link href={`/ignou/assignment/${item.slug.current}`}><h1>{item.subjectName}</h1></Link>
                </div>
              )
            })}
          </Paper>
        )
      })}
    </main>
  )
}

export async function getStaticProps() {

  const dataUnorganised = await clientIgnou.fetch(`*[_type=="post"]{session,subjectName,slug}`);
  const sorted = dataUnorganised.sort((a, b) => a.session.length - b.session.length);

  const gotArrayOfSession = sorted.map((i, index) => {
    return i.session;
  });

  const uniqueArrayOfSession = [...new Set(gotArrayOfSession)];
  var furnished = [];

  for (let i = 0; i < uniqueArrayOfSession.length; i++) {
    const session = uniqueArrayOfSession[i];
    const d = dataUnorganised.filter((i) => i.session === session);
    const sorted = d.sort((a, b) => b.subjectName.length - a.subjectName.length);
    furnished.push(sorted);
  }

  return {
    props: { data: furnished },
    revalidate: 60,
  };
}

export default Index