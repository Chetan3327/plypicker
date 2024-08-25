import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      login
      register
      <Link href={'/dashboard'} className={buttonVariants()}>dashboard</Link>
    </div>
  )
}

export default page
