import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import Header from "../../components/Headers";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface IformInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IformInput>();

  const onSubmit: SubmitHandler<IformInput> = async (data) => {
    // console.log(data);

    //post data to our api
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        // console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <main>
      <Header />
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-4xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-yellow-500 font-semibold">
              {post.author.name}
            </span>{" "}
            - published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => {
                <h1 className="text-2xl font-bold my-5" {...props} />;
              },
              h2: (props: any) => {
                <h2 className="text-xl font-bold my-5" {...props} />;
              },
              li: ({ children }: any) => {
                <li className="text-2xl font-bold my-5">{children}</li>;
              },
              link: ({ href, children }: any) => {
                <a href={href} className="text-green-500 hover:underline">
                  {children}
                </a>;
              },
            }}
          />
        </div>

        <hr className="max-w-xl my-5 mx-auto bg-yellow-400 border border-yellow-500" />

        {/*on submittion of form if there is no error this will occur  */}

        {submitted ? (
          <div className="flex flex-col py-10 my-10 bg-yellow-500 max-w-2xl mx-auto text-white border-black border-[0.5px] rounded-md">
            <h3 className="text-3xl font-bold mb-4 mx-auto">
              Thankyou for Submitting your comment!
            </h3>
            <p className="mx-auto">
              Once it has been approved, it will appear on below!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-5 my-10 max-w-2xl mx-auto mb-10"
          >
            <h3 className="text-sm text-yellow-500">
              Any special thoughts for this article ?
            </h3>
            <h4 className="text-3xl font-bold">Leave a comment below</h4>
            <hr className="py-3 mt-2" />

            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={post._id}
            />

            <label className="block mb-5">
              <span className="text-gray-600">Name</span>
              <input
                {...register("name", { required: true })}
                className="shadow border-[0.5px] rounded py2 px-3 form-input mt02 block w-full ring-yellow-500  outline-none focus:ring-[0.5px]"
                placeholder="Enter your Name"
                type="text"
              />
            </label>
            <label className="block mb-5">
              <span className="text-gray-600">Email</span>
              <input
                {...register("email", { required: true })}
                className="shadow border-[0.5px] rounded py2 px-3 form-input mt02 block w-full ring-yellow-500  outline-none focus:ring-[0.5px]"
                placeholder="Enter your Email"
                type="email"
              />
            </label>
            <label className="block mb-5">
              <span className="text-gray-600">Comment</span>
              <textarea
                {...register("comment", { required: true })}
                className="shadow h-[35vh] border-[0.5px] rounded py2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring-[0.5px]"
                placeholder="Comment.."
              />
            </label>

            {/* erros will return when fields validation fails */}
            <div className="flex flex-col p-5">
              {errors.name && (
                <span className="text-red-500">The Name field is required</span>
              )}
              {errors.email && (
                <span className="text-red-500">
                  The Email field is required
                </span>
              )}
              {errors.comment && (
                <span className="text-red-500">
                  The Comment field is required
                </span>
              )}
            </div>

            <input
              type="submit"
              className="shadow bg-yellow-500 hover:bg-yellow-400 transition-all delay-200 ease-out focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
              value="Submit"
            />
          </form>
        )}

        {/* comments */}
        <div className="flex flex-col p-10 mx-auto my-10 max-w-2xl shadow-md shadow-yellow-200">
          <h3 className="text-4xl">Comments</h3>
          <hr className="mt-10" />
          {post.comments.map((comment) => {
            console.log(comment);

            return (
              <div className="mt-3" key={comment._id}>
                <p>
                  <span className="text-yellow-500">{comment.name}:</span>
                  {"  "}
                  {comment.comment}
                </p>
              </div>
            );
          })}
        </div>
      </article>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id, 
    slug {
      current 
    }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id, 
    _createAt, 
    title, 
    author-> {
    name, 
    image
  },
  'comments': *[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true],
    description, 
    mainImage, 
    slug, 
    body
    
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 5, //after 5 seconds, it'll update the page.
  };
};
