"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Product, User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from './ui/textarea';
import Image from 'next/image';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "@/config/firebase";
import { redirect, useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';

const ProductSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  image: z.string().url('Invalid image URL'),
  productDescription: z.string().min(1, 'Description is required'),
  department: z.string().min(1, 'Department is required'),
});

type ProductFormValues = z.infer<typeof ProductSchema>;

interface UpdateProductFormProps {
  user: User
  product: Product
}

const UpdateProductForm = ({product, user}: UpdateProductFormProps) => {
  const router = useRouter()
  const [productImage, setProductImage] = useState(product.image)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: product.productName,
      price: product.price,
      image: product.image,
      productDescription: product.productDescription,
      department: product.department,
    },
  });
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: ProductFormValues) => {
    const data = {
      productName: values.productName,
      productDescription: values.productDescription,
      price: values.price,
      image: productImage
    }
    console.log(data)

    if(user.role === 'admin'){
      const response = await fetch("/api/product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        return redirect('/dashboard')
      } else {
        toast({
          title: "Error",
          description: "Oops! Something went wrong!",
        });
      }
    }

    if(user.role === 'team-member'){
      const data = {
        productId: product.id,
        changes: {
          productName: values.productName,
          productDescription: values.productDescription,
          price: values.price,
          image: productImage
        },
        authorId: user._id,
        status: 'pending'
      };
      console.log(data)
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      console.log('kjdfhkjasdfjlsdjfkljdlsf')
      console.log(response)
      if (response.ok) {
        router.push('/profile/my-submissions');
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: "Oops! Something went wrong!",
        });
      }

    }
    
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.error("Upload failed", error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(url)
        setProductImage(url);
      }
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <Form {...form}>
        <form className="grid grid-cols-1 gap-6 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <Image src={productImage} height={500} width={500} alt={product.productName} />
          <Input type='file' onChange={(e) => handleImageUpload(e)} />

          <FormField
            control={form.control}
            name='productName'
            render={(({field}) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isLoading} className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-400' placeholder='product name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />

          <FormField
            control={form.control}
            name='productDescription'
            render={(({field}) => (
              <FormItem>
                <FormControl>
                  <Textarea disabled={isLoading} className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-400' placeholder='productDescription' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />

          <FormField
            control={form.control}
            name='price'
            render={(({field}) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isLoading} className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-emerald-400' placeholder='product price' type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />

          <Button type="submit" className="mt-6">{user.role === 'admin' ? "update product as admin" : "submit changes for approval"}</Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateProductForm;
