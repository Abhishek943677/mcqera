import { clientQuickLinks } from "../lib/sanityConnect";

export default async function getQuickLinkData() {

    const quicklinksUnorganised = await clientQuickLinks.fetch(`*[_type=="quicklinks"]{category,title,slug}`);
    const sorted = quicklinksUnorganised.sort((a, b) => a.category.length - b.category.length);

    const gotArrayOfCategory = sorted.map((i, index) => {
        return i.category;
    });

    const uniqueArrayOfCategory = [...new Set(gotArrayOfCategory)];

    var furnished = [];

    for (let i = 0; i < uniqueArrayOfCategory.length; i++) {
        const category = uniqueArrayOfCategory[i];
        const d = quicklinksUnorganised.filter((i) => i.category === category);
        const sorted = d.sort((a, b) => b.title.length - a.title.length);
        furnished.push(sorted);
    }

    return furnished;
}
