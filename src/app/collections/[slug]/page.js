import { connectToDatabase } from "@/lib/mongodb";
import PoemsGrid from "@/components/collections/PoemGrid";
import { colors } from "@/lib/colors";
import Navbar from "@/components/Navbar"; // ✅ Import your Navbar component

export default async function CollectionPoemsPage({ params }) {
  // ✅ Await params to avoid the "sync dynamic APIs" warning
  const { slug } = await params;

  const { db } = await connectToDatabase();

  const collection = await db.collection("collections").findOne({ slug });
  if (!collection) {
    return <div className="p-8">Collection not found.</div>;
  }

  const subcollections = (await db
    .collection("subcollections")
    .find({ parentCollection: String(collection._id) })
    .toArray())
    .map((sub) => ({
      _id: sub._id.toString(),
      title: sub.title,
    }));

  const subIds = subcollections.map((sub) => sub._id);

  const poems = (await db
    .collection("poems")
    .find({ parentSubcollection: { $in: subIds } })
    .toArray())
    .map((poem) => ({
      _id: poem._id.toString(),
      title: poem.title,
      poem: poem.poem,
      parentSubcollection: poem.parentSubcollection?.toString() || null,
      type: poem.type,
    }));

  return (
    <>
      <Navbar /> {/* ✅ Navbar at the top */}

      <section className="max-w-6xl mx-auto px-6 py-22 flex flex-col items-center">
        <h2
          className="text-3xl font-normal text-center mb-2"
          style={{ color: colors.darkMaroon }}
        >
          {collection.title}
        </h2>
        <p
          className="text-base max-w-3xl text-center mb-6"
          style={{ color: colors.poetryBrown }}
        >
          {collection.desc}
        </p>
        <div className="w-full max-w-4xl h-px mb-12 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Poems grid (client) */}
        <PoemsGrid poems={poems} subcollections={subcollections} />

        <div className="h-32" />
      </section>
    </>
  );
}
