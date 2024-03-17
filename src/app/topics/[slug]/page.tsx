
interface TopicShowPageProps {
  params: {
    slug: string
  }
}

const TopicShowPage = ({params}: TopicShowPageProps) => {
  return (
    <div>
      <p>Topic show Page</p>
      <p>{params.slug}</p>
    </div>
  )
}

export default TopicShowPage