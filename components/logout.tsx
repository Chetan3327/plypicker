"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const LogOut = () => {
  return (
    <Button onClick={() => signOut()}>LogOut</Button>
  )
}

export default LogOut