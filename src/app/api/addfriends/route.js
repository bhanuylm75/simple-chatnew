import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function  POST(request) {
 //const body=req.json();
 console.log(process.env.UPSTASH_REDIS_REST_URL)
 try{
  const response=await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:bhanuylm01@gmail.com`,
  {
    headers:{
    Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
  },
  cache:"no-store"
});
const data=await response.json();

const idtoadd=data.result

if (!idtoadd){
  return new NextResponse("User not found",{status:404})
}


await db.sadd(`user:${"loggedinuser"}:incoming-friend-request`,"pp")

return new NextResponse("Friend request sent successfully",{status:200})


 }
 catch(error){
  return new NextResponse(error)

 }
}
