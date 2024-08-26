"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import plypickerlogo from '@/public/plypickerlogo.png'

const Logo = ({size = 50}: {size?: number}) => {
  const router = useRouter()
  return (
    <Image src={plypickerlogo} onClick={() => router.push('/')} className='cursor-pointer inline mr-2' width={size} height={size} alt='logo' />
  )
}

export default Logo