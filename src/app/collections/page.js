import Navbar from "@/components/Navbar";
import CollectionsGrid from "@/components/collections/CollectionsGrid";
import { connectToDatabase } from "@/lib/mongodb";
import { colors } from "@/lib/colors";

export default async function CollectionsPage() {
  const { db } = await connectToDatabase();

  const collections = await db.collection("collections").find({}).toArray();
  const subcollections = await db.collection("subcollections").find({}).toArray();
  const poems = await db.collection("poems").find({}).toArray();

  // Build maps
  const subMap = subcollections.reduce((acc, sub) => {
    const parent = sub.parentCollection?.toString();
    if (parent) {
      acc[parent] = acc[parent] || [];
      acc[parent].push(sub._id.toString());
    }
    return acc;
  }, {});

  const poemCountMap = poems.reduce((acc, poem) => {
    const parentSub = poem.parentSubcollection?.toString();
    if (parentSub) acc[parentSub] = (acc[parentSub] || 0) + 1;
    return acc;
  }, {});

  // Build final data
  const collectionsWithCount = collections.map((col) => {
    const subIds = subMap[col._id.toString()] || [];
    const count = subIds.reduce((sum, subId) => sum + (poemCountMap[subId] || 0), 0);
    return {
      _id: col._id.toString(),
      title: col.title,
      desc: col.desc,
      slug: col.slug,
      poemCount: count
    };
  });

  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 py-22 flex flex-col items-center scroll-smooth">
        <h2 className="text-3xl font-normal text-center mb-2" style={{ color: colors.darkMaroon }}>
          Poetry Collections
        </h2>
        <p className="text-base max-w-3xl text-center mb-6" style={{ color: colors.poetryBrown }}>
          Explore curated collections of verse, each telling its own story through carefully crafted words and imagery.
        </p>
        <div className="w-full max-w-4xl h-px mb-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        <CollectionsGrid collections={collectionsWithCount} />

        <div className="h-32" />
      </section>
    </>
  );
}
