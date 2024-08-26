import { currentUser } from '@/lib/current-user'
import Product from '@/models/product'
import React from 'react'
import ProductTable from './components/product-table'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const page = async () => {
  const user = await currentUser()
  const products = await Product.find()
  return (
    <div>
      <div className='flex justify-between items-center mx-5'>
        <h1 className="text-3xl md:text-4xl py-7">Hello, <span className='font-semibold'>{user.name}</span></h1>
        <Link href={'/profile/my-submissions'} className={buttonVariants()}>View Submissions</Link>
      </div>
      <ProductTable products={products} />
    </div>
  )
}

export default page
