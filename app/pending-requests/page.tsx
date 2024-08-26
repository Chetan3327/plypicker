import { currentUser } from '@/lib/current-user'
import { redirect } from 'next/navigation'
import React from 'react'
import ReviewModel from '@/models/review'
import { Review, User } from '@/types'
import RequestTable from '@/components/requestTable'

const page = async () => {
  const user: User = await currentUser()
  if(!user){
    return redirect('/login')
  }
  if(user.role !== 'admin'){
    return redirect('/dashboard')
  }

  const requests:Review[] = await ReviewModel.find().sort({createdAt: -1}).lean()
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold py-7 px-3 text-muted-foreground">Pending Requests</h1>
      <RequestTable requests={requests} />
    </div>
  )
}

export default page