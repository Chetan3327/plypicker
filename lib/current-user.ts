import {authOptions} from '@/lib/authOptions'
import { getServerSession } from "next-auth"
import User from '@/models/user'
import connect from "@/lib/connect"

connect()
export const currentUser = async () => {
  const session = await getServerSession(authOptions)
  if(!session){
    return null
  }
  const user = await User.findOne({ _id: session.user?._id}).select("-password");
  if(!user){
    return null
  }
  return user
}