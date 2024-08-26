import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Review } from '@/types';
import { format } from 'date-fns';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

const date_format = "d MMM yyyy, HH:mm"
const RequestTable = ({requests}: {requests: Review[]}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>PRODUCT ID</TableHead>
          <TableHead>PRODUCT NAME</TableHead>
          <TableHead>SUBMITTED ON</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((submission) => (
          <TableRow className='cursor-pointer' key={submission._id}>
            <TableCell>{submission.productId}</TableCell>
            <TableCell>{submission.changes.productName}</TableCell>
            <TableCell>{format(new Date(submission.createdAt), date_format)}</TableCell>
            <TableCell><Link href={`pending-requests/${submission.productId}`} className={buttonVariants({variant: 'outline'})}>update</Link></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default RequestTable