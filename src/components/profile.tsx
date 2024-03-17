'use client'

import { useSession } from "next-auth/react"

const Profile = () => {
  const session = useSession()
  
  if (session.data){
    return(
      <div>{JSON.stringify(session)}</div>
    )
  }

  return (
    <div>From Client: Not signed In</div>
  )
}

export default Profile