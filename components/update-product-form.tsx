"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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
      price: Number(product.price),
      image: product.image,
      productDescription: product.productDescription,
      department: product.department,
    },
  });
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: ProductFormValues) => {
    
    if(user.role === 'admin'){
      const data = {
        id: product.id,
        productName: values.productName,
        productDescription: values.productDescription,
        price: Number(values.price),
        image: productImage
      }
      const response = await fetch("/api/product/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        router.push('/dashboard');
        router.refresh()
        // return redirect('/dashboard')
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
          price: Number(values.price),
          image: productImage
        },
        authorId: user._id,
        status: 'pending'
      };
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

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
        setProductImage(url);
      }
    );
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold py-7 px-3">Update Product</h1>
      <Form {...form}>
        <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-12 px-7" onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex justify-center items-center flex-col gap-5 w-[60%] pl-10'>
            <Image src={productImage} height={400} width={400} alt={product.productName} />
            <Input type='file' onChange={(e) => handleImageUpload(e)} />
          </div>

          <div className='space-y-5'>
            <FormField
              control={form.control}
              name='productName'
              render={(({field}) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-orange-400' placeholder='product name' {...field} />
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
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={isLoading} className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-orange-400' placeholder='productDescription' {...field} />
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
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-orange-400' placeholder='product price' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ))}
            />

            <Button type="submit" className="mt-6 w-full">{user.role === 'admin' ? "update product as admin" : "submit changes for approval"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default UpdateProductForm;
