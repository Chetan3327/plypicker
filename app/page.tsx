import Logo from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/current-user'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const page = async () => {
  const user = await currentUser()
  if(user){
    return redirect('/dashboard')
  }
  return (
    <div>
      <div className="flex justify-between space-x-2 pt-10 px-5 md:px-36">
        <div className='sm:flex items-center hidden'>
          <Logo size={200} />
        </div>

        <div className='flex space-x-3 items-center'>
          <ModeToggle />
          <Link href={'/login'}><Button className='ml-auto' variant={'ghost'}>Log in</Button></Link>
          <Link href={'/register'}><Button>Get Started <ArrowRight className='w-4 h-4 ml-2' /></Button></Link>
        </div>
      </div>

      <div className='container text-center justify-center py-20 md:py-32'>
        <h2 className="text-3xl md:text-6xl font-bold">
          <span className="bg-gradient-to-b from-blue-300/60 to-blue-300 text-transparent bg-clip-text">
            Streamline Product Updates{" "}
          </span>
        </h2>
        <h2 className="text-3xl md:text-6xl font-bold">
          with Efficient Review Management
        </h2>
        <h2 className="text-xl md:text-3xl my-5 text-muted-foreground md:mx-32">
          Team members can propose changes, and admins can review, approve, or reject updates with ease.
        </h2>
        <Link href={'/register'}><Button>Get Started <ArrowRight className='w-4 h-4 ml-2' /></Button></Link>
      </div>


      <div className='z-[50] container grid place-content-center'>
        {/* <Image src={demo} height={1000} width={1000} className='p-5 rounded-lg bg-gray-800' alt='demo' /> */}
      </div>
    </div>
  )
}

export default page