import { currentUser } from '@/lib/current-user'
import Product from '@/models/product'
import React from 'react'

const page = async ({ params }: { params: { productId: string } }) => {
  const user = currentUser()
  const product = await Product.find()
  return (
    <div>
      
    </div>
  )
}

export default page
