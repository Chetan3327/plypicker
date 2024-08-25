import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

export default async function ChatLayout({children}: {children: React.ReactNode}){
  const user = await currentUser()
  if(!user){
    return redirect('/login')
  }
  return (
    <div>
      {children}
    </div>
  )
}