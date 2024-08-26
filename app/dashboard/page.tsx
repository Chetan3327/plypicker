import { currentUser } from '@/lib/current-user'
import Product from '@/models/product'
import React from 'react'
import ProductTable from './components/product-table'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import LogOut from '@/components/logout'
import { ModeToggle } from '@/components/mode-toggle'

const page = async () => {
  const user = await currentUser()
  const products = await Product.find()

  if(!user) return (<div>Loading...</div>)
  return (
    <div>
      <div className='flex justify-between items-center mx-5'>
        <h1 className="text-3xl md:text-4xl py-7">Hello, <span className='font-semibold'>{user.name}</span></h1>
        <div className='flex gap-5'>
          <ModeToggle />
          {user.role === 'team-member' && <Link href={'/profile/my-submissions'} className={buttonVariants()}>View Submissions</Link>}
          {user.role === 'admin' && <Link href={'/pending-requests'} className={buttonVariants()}>Pending Requests</Link>}
          <LogOut />
        </div>
      </div>
      <ProductTable products={products} />
    </div>
  )
}

export default page
