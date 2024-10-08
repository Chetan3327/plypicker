import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Review } from '@/types';
import { format } from 'date-fns';

const date_format = "d MMM yyyy, HH:mm"
const SubmissionTable = ({submissions}: {submissions: Review[]}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>PRODUCT ID</TableHead>
          <TableHead>PRODUCT NAME</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>SUBMITTED ON</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow className='cursor-pointer' key={submission._id}>
            <TableCell>{submission.productId}</TableCell>
            <TableCell>{submission.changes.productName}</TableCell>
            <TableCell>{submission.status.toUpperCase()}</TableCell>
            <TableCell>{format(new Date(submission.createdAt), date_format)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SubmissionTable