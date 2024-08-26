import UpdateProductForm from '@/components/update-product-form';
import { currentUser } from '@/lib/current-user';
import ProductModel from '@/models/product';
import { Product, User } from '@/types';
import { redirect } from 'next/navigation';

const page = async ({ params }: { params: { productId: string } }) => {
  const product: Product | null = await ProductModel.findOne({ id: params.productId });
  if (!product) {
    return redirect('/dashboard');
  }
  const user:User = await currentUser();

  return (
    <div>
      <UpdateProductForm product={product} user={user} />
    </div>
  );
}

export default page;
