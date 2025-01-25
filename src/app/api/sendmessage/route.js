import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from 'next-auth'
import { nanoid } from 'nanoid'
import { pusherServer } from "@/app/lib/pusher";
import { toPusherKey } from "@/app/lib/utils";

export async function POST(req) {
  try {
    const { text, chatid } = await req.json();

    if (!text || !chatid) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const timestamp = Date.now();
    const messageData = {
      id: nanoid(),
      senderId: session.user.id,
      text,
      timestamp,
    };

    //console.log("Message data:", messageData);

    const channelName = toPusherKey(`chat:${chatid}`);
    console.log("Channel Name:", channelName);

    // Debug message size
    const messageSize = JSON.stringify(messageData).length;
    console.log("Message Size (bytes):", messageSize);

    if (messageSize > 10240) {
      return NextResponse.json({ error: "Message exceeds size limit." }, { status: 400 });
    }

    // Trigger Pusher event
    await pusherServer.trigger(toPusherKey(`chat:${chatid}`), 'incoming-message', messageData)



    // Save message to the database
    const res = await db.zadd(`chat:${chatid}:messages`, {
      score: timestamp,
      member: JSON.stringify(messageData),
    });

    return NextResponse.json({ success: true, });
  } catch (err) {
    console.error("Error sending message:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
