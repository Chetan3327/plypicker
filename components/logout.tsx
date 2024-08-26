"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const LogOut = () => {
  return (
    <Button variant={'outline'} onClick={() => signOut()}>Logout</Button>
  )
}

export default LogOut