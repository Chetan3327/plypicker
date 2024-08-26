"use client"
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z
  .object({
    name: z.string().min(1, "Name is required!"),
    email: z.string().min(1, "Email is required!").email("Invalid email!"),
    password: z
      .string()
      .min(1, "Password is required!")
      .min(8, "Password must have than 8 characters!"),
    confirmPassword: z.string().min(1, "Password confirmation is required!"),
    role: z.enum(["team-member", "admin"], {
      required_error: "You need to select a role.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match!",
});


const page = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "team-member", 
    },
  });
  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.name,
        role: values.role
      }),
    });

    if (response.ok) {
      router.push("/login");
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
      });
    }
  };

  return (
    <div className='space-y-4 md:w-[40%]'>
      <h3 className='font-bold text-3xl text-center'>Create An Account</h3>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField 
            control={form.control}
            name='name'
            render={(({field}) => (
              <FormItem>
                <FormControl>
                  <Input className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-orange-400' placeholder='Your Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <FormField 
            control={form.control}
            name='email'
            render={(({field}) => (
              <FormItem>
                <FormControl>
                  <Input className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-orange-400' placeholder='Email Address' {...field} />
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
          <FormField 
            control={form.control}
            name='confirmPassword'
            render={(({field}) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isLoading} className='focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-orange-400' placeholder='Re-enter Password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <FormField 
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="team-member" />
                      </FormControl>
                      <FormLabel className="font-normal">Team Member</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="admin" />
                      </FormControl>
                      <FormLabel className="font-normal">Admin</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isLoading} className='w-full'>Sign Up</Button>
        </form>
      </Form>
      <div className='text-center'>
        Already have an account? <Link href='/login' className={buttonVariants({variant: 'link'})} >Login</Link>
      </div>
    </div>
  )
}

export default page