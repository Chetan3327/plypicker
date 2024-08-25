import connect from "@/lib/connect"
import User from "@/models/user"
import { NextResponse } from "next/server"
import bcryptjs from "bcryptjs";

connect()
export async function POST(req: Request){
  try {
    const body = await req.json()
    const {name, email, password, role} = body
    
    const user = await User.findOne({email})
    if(user){
      return NextResponse.json({error: "User already exists"}, {status: 400})
    }

    const hashedPassword = await bcryptjs.hash(password, 10)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    })

    const savedUser = await newUser.save()
    return NextResponse.json(savedUser, {status: 201})
  } catch (error) {
    return NextResponse.json({message: 'Error creating user'}, {status: 500})
  }
}

export async function GET(req: Request){
  try {
    if(process.env.NODE_ENV === "production"){
      return NextResponse.json({'message': 'Restricted Access'})
    }
    const users = await User.find();
    return NextResponse.json(users, {status: 200})
  } catch (error) {
    return NextResponse.json({message: 'Error creating user'}, {status: 500})
  }
}