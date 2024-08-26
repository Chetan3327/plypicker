import { getServerSession } from "next-auth"
import React from "react"
import {authOptions} from '@/lib/authOptions'
import { redirect } from "next/navigation"
import logo from '@/public/plypickerlogo.png'
import Image from "next/image"
export default async function AuthLayout({children}: {children: React.ReactNode}){
    const session = await getServerSession(authOptions)
    if(session){
        redirect('/dashboard')
    }
    return (
        <div className="flex justify-center pt-[10rem]">
            <Image className="absolute top-20 left-32" src={logo} width={200} height={200} alt="logo" />
            {children}
        </div>
    )
}