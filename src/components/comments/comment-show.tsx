import type { CommentWithAuthor } from "@/db/queries/comments";
import CommentCreateForm from "./comment-create-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentShowProps {
  commentId: string,
  postId: string
}

export default async function CommentShow({
  commentId,
  postId,
}: CommentShowProps){
  const comments = await fetchCommentsByPostId(postId)
  const comment = comments.find((c) => (c.id === commentId))
  if (!comment){
    return null
  }
  const children = comments.filter((c)=>(c.parentId === commentId))
  const renderedChildren = children.map((child)=>{
    return <CommentShow key={child.id} commentId={child.id} postId={postId}/>
  })
  return (
    <div className="p-4 mt-2">
      <div className="flex gap-3">
        <div className="flex-1">
          <p>{comment.user.name}</p>
          <p>{comment.content}</p>
          <CommentCreateForm postId={comment.postId} parentId={comment.id}/>
        </div>
      </div>
    </div>
  )
}