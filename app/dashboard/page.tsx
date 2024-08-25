import { currentUser } from '@/lib/current-user'
import Product from '@/models/product'
import React from 'react'
import ProductTable from './components/product-table'

const page = async () => {
  const user = await currentUser()
  console.log(user)
  const products = await Product.find()
  console.log(products)
  return (
    <div>
      <h2 className='pl-5 py-5 text-2xl'>Hello, <span className='font-semibold'>{user.name}</span></h2>
      <ProductTable products={products} />
    </div>
  )
}

export default page
