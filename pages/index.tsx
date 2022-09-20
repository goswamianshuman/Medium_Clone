import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Content from "../components/Content";
import Header from "../components/Headers";
import Hero from "../components/Hero";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);

  return (
    <div>
      <Head>
        <title>Medium Remasterd</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/bg.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Combo&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Hero />
      {/* <Content /> */}

      {/* *********** */}

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6 overflow-hidden">
        {posts.map((post) => (
          <Link key={post._id} href={`/posts/${post.slug.current}`}>
            <div className="group cursor-pointer border rounded-lg overflow-hidden">
              <img
                className="h-[40vh] w-full object-cover group-hover:scale-[102%] transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between items-center p-5 bg-white">
                <div className="flex flex-col justify-center items-start">
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>

                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id, 
    title,
    author -> {
    name, 
    image
  }, 
    description, 
    mainImage, 
    slug
    }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};