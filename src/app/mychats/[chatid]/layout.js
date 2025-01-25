import Minibar from "@/app/components/Minibar";
import Sidebar from "@/app/components/Sidebar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  return (
   <div className="h-full flex flex-row">
    <div className="w-[32%] hidden lg:flex">
        <Sidebar session={session?.user.id}/>
        </div>
    <div className="w-full  lg:w-[95%] lg:ml-2 lg:mr-5">
    {children}
    </div>
   </div>
  );
}
