import connect from "@/lib/connect"
import User from "@/models/user"
import { NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

connect()
export async function POST(req: Request){
  try {
    const body = await req.json()
    const {email, password} = body
    
    const user = await User.findOne({email})
    if(!user){
      return NextResponse.json({error: "User does not exist"}, {status: 400})
    }

    const validPassword = await bcryptjs.compare(password, user.password)
    if(!validPassword){
      return NextResponse.json({error: "Invalid password"}, {status: 400})
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    })

    response.cookies.set("token", token, {
      httpOnly: true,
    })
    return response;
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: 'Error login user'}, {status: 500})
  }
}
