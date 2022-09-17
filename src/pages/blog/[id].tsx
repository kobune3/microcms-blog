import { client } from "libs/client";
import { Blog } from "types/blog";
import { GetStaticPaths } from "next";

type Props = {
  blog: Blog;
};

export default function BlogId({ blog }: Props) {
  console.log(blog);
  return (
    <div className="bg-gray-50">
      <div className="px-10 py-6 mx-auto">
        <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
          {/* <img
            className="object-cover w-full shadow-sm h-full"
            src={blog.image.url}
          /> */}
          <div className="mt-2">
            <div className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-blue-500">
              {blog.title}
            </div>
          </div>
          <div className="mt-2">
            {blog.tags.map(tag => (
              <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                key={tag.id}
              >
                #{tag.tag}
              </span>
            ))}
          </div>
          <div className="mt-2">
            <div className="text-2xl text-gray-700 mt-4 rounded ">
              <div
                dangerouslySetInnerHTML={{
                  __html: `${blog.body}`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data
    }
  };
};
