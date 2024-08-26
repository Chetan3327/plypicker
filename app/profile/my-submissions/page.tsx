import { currentUser } from '@/lib/current-user'
import { redirect } from 'next/navigation'
import React from 'react'
import ReviewModel from '@/models/review'
import { Review, User } from '@/types'
import SubmissionTable from '@/components/user-submission-table'

const page = async () => {
  const user: User = await currentUser()
  if(!user){
    return redirect('/login')
  }

  const submissions:Review[] = await ReviewModel.find({authorId: user._id}).sort({createdAt: -1}).lean()
  return (
    <div>
      <h3>MY SUBMISSIONS</h3>
      <SubmissionTable submissions={submissions} />
    </div>
  )
}

export default page