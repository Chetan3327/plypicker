import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type Product = {
  _id: string,
  productName: string,
  price: number,
  image: string,
  productDescription: string,
  department: string,
  id: string,
  createdAt: Date,
  updatedAt: Date
}

const date_format = "d MMM yyyy, HH:mm"
const ProductTable = ({products}: {products: Product[]}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead>IMAGE</TableHead>
          <TableHead>DESCRIPTION</TableHead>
          <TableHead>DEPARTMENT</TableHead>
          <TableHead>CREATED AT</TableHead>
          <TableHead>UPDATED AT</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow className='cursor-pointer' key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.productName}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell><Image src={product.image} width={100} height={100} alt={product.productName} /></TableCell>
            <TableCell>{product.productDescription}</TableCell>
            <TableCell>{product.department}</TableCell>
            <TableCell>{format(new Date(product.createdAt), date_format)}</TableCell>
            <TableCell>{format(new Date(product.updatedAt), date_format)}</TableCell>
            <TableCell><Link href={`/product/${product.id}`} className={buttonVariants({variant: 'outline'})}>visit</Link></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProductTable