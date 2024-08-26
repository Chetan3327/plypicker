import RequestForm from "@/components/request-form"
import { currentUser } from "@/lib/current-user"
import ProductModel from '@/models/product'
import ReviewModel from '@/models/review'
import { Product, Review } from '@/types'
import { redirect } from 'next/navigation'

const page = async ({ params }: { params: { requestId: string } }) => {
  const user = currentUser()
  const old:Product|null = await ProductModel.findOne({id: params.requestId})
  if(!old){
    return redirect('/dashboard')
  }
  
  const updated:Review|null = await ReviewModel.findOne({productId: params.requestId})
  if(!updated){
    return redirect('/dashboard')
  }
  
  return (
    <div>
      <RequestForm old={old} updated={updated} />
    </div>
  )
}

export default page
