
import { NextResponse } from "next/server";

interface User {
  name: string;
  email: string;
}

const users: User[] = [];
export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  let isExist: boolean = false;
  for (let i = 0; i < users.length; i++) {
    if (body.email == users[0].email) {
      isExist = true;
    }
  }
  if (!isExist) {
    users.push(body);
    return NextResponse.json({
      message: "success",
      data: users,
    },{
        status:201
    });
  }
  else{
    return NextResponse.json({
        message:"user already exist"
    },{

        status:400
    })
  }
}
