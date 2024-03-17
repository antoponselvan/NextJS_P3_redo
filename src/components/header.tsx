import Link from 'next/link'
import { Suspense } from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem
} from '@nextui-org/react'
import HeaderAuth from "./header-auth";

const Header = () => {
  return(
    <Navbar>
      <NavbarBrand>
        <Link href="/" className='font-bold'>
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        search bar
      </NavbarContent>
      <NavbarContent justify='end'>
        <HeaderAuth/>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
