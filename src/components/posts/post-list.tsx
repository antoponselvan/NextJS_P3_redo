import type { PostWithData } from "@/db/queries/posts";
import Link from "next/link";
import paths from '@/paths'

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>
}

export default async function PostList({ fetchData}: PostListProps) {
  const posts = await fetchData()
  const renderedPosts = posts.map((post)=>{
    const topicSlug = post.topic.slug
    if (!topicSlug){
      throw new Error('Need slug to link')
    }
    return(
      <div key={post.id}>
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3>{post.title}</h3>
          <div>
            <p>{post.user.name}</p>
            <p>{post._count.comments}</p>
          </div>
        </Link>
      </div>
    )
  })
  return(
    <div className="space-y-2">{renderedPosts}</div>
  )
}