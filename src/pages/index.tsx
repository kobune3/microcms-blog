import { client } from "libs/client"; // srcから見た絶対パスで指定
import { Blog } from "types/blog"; // srcから見た絶対パスで指定
import { useRouter } from "next/router";
import Image from "next/image";

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "blog" });
  const tag = await client.get({ endpoint: "tag" });

  return {
    props: {
      blogs: blog.contents,
      tags: tag.contents
    }
  };
};

type Props = {
  blogs: Blog[];
};

export default function Home({ blogs }: Props) {
  console.log(blogs);
  const router = useRouter();

  return (
    <>
      <h1 className="container mx-auto px-10 pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        記事一覧
      </h1>
      <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {blogs.map(blog => (
          <div
            className="rounded overflow-hidden shadow-lg"
            key={blog.id}
            onClick={() => router.push(`/blog/${blog.id}`)}
          >
            <img className="w-full" src={blog.image.url} alt="Next Image" />
            <div className="px-6 py-4">{blog.title}</div>
            <div className="px-6 pt-4 pb-2">
              {blog.tags.map(tag => (
                <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  key={tag.id}
                >
                  #{tag.tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
