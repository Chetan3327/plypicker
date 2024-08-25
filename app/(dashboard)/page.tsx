import { currentUser } from '@/lib/current-user'
import React from 'react'

const page = async () => {
  const user = await currentUser()
  return (
    <div>
      dashboard
    </div>
  )
}

export default page
