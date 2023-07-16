import React from 'react'
import { clientIgnou } from '../lib/sanityConnect';

export default async function getIgnouData() {
    const dataUnorganised = await clientIgnou.fetch(
        `*[_type=="post"]{session,subjectName,slug}`
      );
      const sorted = dataUnorganised.sort(
        (a, b) => a.session.length - b.session.length
      );
    
      const gotArrayOfSession = sorted.map((i, index) => {
        return i.session;
      });
    
      const uniqueArrayOfSession = [...new Set(gotArrayOfSession)];
      var furnished = [];
    
      for (let i = 0; i < uniqueArrayOfSession.length; i++) {
        const session = uniqueArrayOfSession[i];
        const d = dataUnorganised.filter((i) => i.session === session);
        const sorted = d.sort(
          (a, b) => b.subjectName.length - a.subjectName.length
        );
        furnished.push(sorted);
      }
      return furnished;

}
