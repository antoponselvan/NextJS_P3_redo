'use client'

import Link from "next/link"
import {
  NavbarItem, Button, Avatar, Popover, PopoverTrigger, PopoverContent 
} from '@nextui-org/react'
import { useSession } from "next-auth/react"
import * as actions from '@/actions'

const HeaderAuth = () => {
  const session = useSession()

  let authContent: React.ReactNode
  if (session.status === 'loading'){
    authContent = null
  }else if (session.status === 'authenticated'){
    authContent = (
      <Popover>
        <PopoverTrigger>
          <Avatar src={(session.data?.user?.image) || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <form action={actions.signOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    )
  }else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit">Sign In</Button>
          </form>
        </NavbarItem>
      </>
    )
  }

  return authContent
}

export default HeaderAuth