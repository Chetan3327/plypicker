"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from './ui/use-toast';

const ProfileStats = () => {
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPending(data.pending || 0);
          setApproved(data.approved || 0);
          setRejected(data.rejected || 0);
        } else {
          toast({
            title: 'Error',
            description: 'Failed to fetch submission data.',
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'An error occurred while fetching data.',
        });
      }
    };

    fetchData();
  }, []); 

  return (
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
  )
}

export default ProfileStats
