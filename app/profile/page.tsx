import LogOut from '@/components/logout';
import ProfileStats from '@/components/profile-stats';
import { buttonVariants } from '@/components/ui/button';
import { currentUser } from '@/lib/current-user';
import Link from 'next/link';

const page = async () => {
  const user = await currentUser();
  if(!user) return (<div>Loading...</div>)
  return (
    <div>
      <div className='flex justify-between items-center mx-8'>
        <h1 className="text-3xl md:text-4xl py-7">Hello, <span className='font-semibold'>{user?.name || "User"}</span> <span className="text-muted-foreground text-xl">@{user?.role || "Role"}</span></h1>
        <div className='flex gap-5'>
          {user?.role === 'temp-member' && <Link href={'/profile/my-submissions'} className={buttonVariants()}>View Submissions</Link>}
          {user?.role === 'admin' && <Link href={'/pending-requests'} className={buttonVariants()}>Pending Requests</Link>}
          <LogOut />
        </div>
      </div>

      <ProfileStats />      
    </div>
  )
}

export default page;
