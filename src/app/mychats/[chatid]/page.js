import ChatInput from "@/app/components/Chatinput";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import Image from 'next/image'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Messages from "@/app/components/messages";

async function getChatMessages(chatid) {
  
  try {
   
    const results = await db.zrange(`chat:${chatid}:messages`, 0, -1);
    
   
    //console.log(messages)

    return results
  } catch (error) {
    console.error("Error fetching chat messages:", error.message);
    return [];
  }
}


const page = async ({params}) => {
  const { chatid } = await params;
  const initialMessages=await getChatMessages(chatid)
  //console.log(initialMessages,"from main")

  const session = await getServerSession(authOptions)
  //if (!session) notFound()
  const [userId1, userId2] = chatid.split('--')
  const { user } = session

  const chatPartnerId = user.id === userId1 ? userId2 : userId1
  const chatPartner= await db.get(`user:${chatPartnerId}`)
  //console.log(chatPartner)
  return (
    <div className='bg-white  w-full flex-1 justify-between flex flex-col h-full'>
    <div className='flex sm:items-center pl-4 justify-between py-3 border-b border-gray-200'>
      <div className='relative flex items-center space-x-4'>
        <div className='relative'>
          <div className='relative w-6 sm:w-12 h-6 sm:h-12'>
            <img
             
              referrerPolicy='no-referrer'
              src={chatPartner?.image}
              alt={`${chatPartner?.name} profile picture`}
              className='rounded-full'
            />
          </div>
        </div>

        <div className='flex flex-col leading-tight'>
          <div className='text-lg flex items-center'>
            <span className='text-gray-700 mr-3 font-semibold'>
              {chatPartner.name}
            </span>
          </div>

          <span className='text-sm text-gray-600'>{chatPartner.email}</span>
        </div>
      </div>
    </div>
    <Messages
        chatId={chatid}
        chatPartner={chatPartner}
        sessionImg={session.user.image}
        sessionId={session.user.id}
        initialMessages={initialMessages}
      />

    
    <ChatInput chatid={chatid} chatPartner={chatPartner} />
  </div>
)
}
  


export default page
