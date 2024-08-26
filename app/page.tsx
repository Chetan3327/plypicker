import LogOut from '@/components/logout'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Link href={'/login'} className={buttonVariants()}>Login</Link>
      <Link href={'/register'} className={buttonVariants()}>Register</Link>
      <Link href={'/dashboard'} className={buttonVariants()}>dashboard</Link>
      <LogOut />
    </div>
  )
}

export default page