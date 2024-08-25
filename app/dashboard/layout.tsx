import { currentUser } from "@/lib/current-user";
import { User } from "@/types";
import { redirect } from "next/navigation";

export default async function ChatLayout({children}: {children: React.ReactNode}){
  const user: User = await currentUser()
  if(!user){
    return redirect('/login')
  }
  return (
    <div>
      {children}
    </div>
  )
}