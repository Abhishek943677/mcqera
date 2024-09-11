import { clientQuickLinks } from "../lib/sanityConnect";

export default async function getQuickLinkData() {

    const quicklinksUnorganised = await clientQuickLinks.fetch(`*[_type=="quicklinks"]{branch,title,slug}`);

    // Step 1: Flatten the branch array into individual entries
    const flattened = quicklinksUnorganised.flatMap(item =>
        item.branch.map(branch => ({
            branch:branch,
            title: item.title,
            slug: item.slug
        }))
    );

    const sorted = flattened.sort((a, b) => a.branch.length - b.branch.length);

    const gotArrayOfCategory = sorted.map((i, index) => {
        return i.branch;
    });

    const uniqueArrayOfCategory = [...new Set(gotArrayOfCategory)];

    var furnished = [];

    for (let i = 0; i < uniqueArrayOfCategory.length; i++) {
        const branch = uniqueArrayOfCategory[i];
        const d = flattened.filter((i) => i.branch === branch);
        const sorted = d.sort((a, b) => b.title.length - a.title.length);
        furnished.push(sorted);
    }

    return furnished;
}
