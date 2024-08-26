"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Product, Review } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'

interface RequestFormProps {
  old: Product,
  updated: Review
}
const RequestForm = ({ old, updated }: RequestFormProps) => {
  const router = useRouter()
  const rejectChanges = async () => {
    const response = await fetch("/api/requests", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: updated._id
      }),
    });

    if (response.ok) {
      router.push("/dashboard");
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
      });
    }
  }
  const approveChanges = async () => {
    const response = await fetch("/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: updated._id
      }),
    });

    if (response.ok) {
      router.push("/dashboard");
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
      });
    }
  }
  return (
    <div>
      <div className='container grid grid-cols-1 md:grid-cols-2 gap-5 pt-[8rem] md:px-32'>
        <Card>
          <CardHeader>
            <Image src={old.image} width={400} height={400} alt={old.productName} />
          </CardHeader>
          <CardContent>
            <span className="font-bold">Product Name:</span> {old.productName}
          </CardContent>
          <CardDescription className='px-5'>
            <span className="font-bold">Product Description:</span> {old.productDescription}
          </CardDescription>
          <CardFooter className='pt-3'>
            <span className="font-bold">Product Price: </span> {" "}${old.price}
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            {updated.changes.image && (<Image src={updated.changes.image} width={400} height={400} alt={old.productName} />)}
          </CardHeader>
          <CardContent>
            <span className="font-bold">Product Name:</span> {updated.changes.productName}
          </CardContent>
          <CardDescription className='px-5'>
            <span className="font-bold">Product Description:</span> {updated.changes.productDescription}
          </CardDescription>
          <CardFooter className='pt-3'>
            <span className="font-bold">Product Price: </span> {" "}${updated.changes.price}
          </CardFooter>
        </Card>
      </div>

      <div className='flex justify-center gap-5 py-5'>
        <Button onClick={() => approveChanges()}>Accept Changes</Button>
        <Button onClick={() => rejectChanges()} variant={'destructive'}>Reject Changes</Button>
      </div>
    </div>
  )
}

export default RequestForm