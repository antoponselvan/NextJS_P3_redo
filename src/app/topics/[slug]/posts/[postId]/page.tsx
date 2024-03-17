
interface PostShowPageProps {
  params: {
    postId: string
  }
}
const PostShowPage = async ({params}: PostShowPageProps) => {
  return (
    <p>{params.postId}</p>
  )
}

export default PostShowPage