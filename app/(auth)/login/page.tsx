"use client"
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z.object({
  email: z.string().min(1, "Email is required!").email("Invalid email!"),
  password: z
    .string()
    .min(1, "Password is required!")
    .min(8, "Password must have than 8 characters!"),
});

const page = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })
      if(response?.error){
        toast({
          title: "Error",
          description: "Oops! Something went wrong!",
        });
        return;
      }
      if(response?.ok){
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
      });
    }
  };

  return (
    <div className='space-y-4 md:w-[40%]'>
      <h3 className='font-bold text-3xl text-center'>Welcome Back</h3>
      <Form {...form}>
        <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField 
            control={form.control}
            name='email'
            render={(({field}) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isLoading} className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-orange-400' placeholder='Email Address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <FormField 
            control={form.control}
            name='password'
            render={(({field}) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isLoading} className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-orange-400' placeholder='Enter Password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <Button type='submit' disabled={isLoading} className='w-full'>Sign In</Button>
        </form>
      </Form>
      <div className='text-center'>
        Don't have an account? <Link href='/register' className={buttonVariants({variant: 'link'})}>Register</Link>
      </div>
    </div>
  )
}

export default page