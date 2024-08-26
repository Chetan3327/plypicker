import LogOut from '@/components/logout';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { currentUser } from '@/lib/current-user'
import Link from 'next/link';
import React from 'react'
import axios from 'axios'

const page = async () => {
  const user = await currentUser();
  const {data} = await axios.get('/api/profile')
  const pending = data.pending;
  const approved = data.approved;
  const rejected = data.rejected;
  
  return (
    <div>
      <div className='flex justify-between items-center mx-8'>
        <h1 className="text-3xl md:text-4xl py-7">Hello, <span className='font-semibold'>{user.name}</span> <span className="text-muted-foreground text-xl">@{user.role}</span></h1>
        <div className='flex gap-5'>
          {user.role === 'temp-member' && <Link href={'/profile/my-submissions'} className={buttonVariants()}>View Submissions</Link>}
          {user.role === 'admin' && <Link href={'/pending-requests'} className={buttonVariants()}>Pending Requests</Link>}
          <LogOut />
        </div>
      </div>

      <div className='container grid grid-cols-1 md:grid-cols-3 gap-4 pt-[5rem]'>
        <Card className='pt-5'>
          <CardContent>Pending Submissions</CardContent>
          <CardFooter>{pending}</CardFooter>
        </Card>
        <Card className='pt-5'>
          <CardContent>Approved Submissions</CardContent>
          <CardFooter>{approved}</CardFooter>
        </Card>
        <Card className='pt-5'>
          <CardContent>Rejected Submissions</CardContent>
          <CardFooter>{rejected}</CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default page
