import Minibar from "@/app/components/Minibar";
import Sidebar from "@/app/components/Sidebar";
import Chat from "@/app/components/Chat";

export default function AddfriendsLayout({ children }) {
  return (
    <div className=" bg-gray-100 pt-5 pb-2 h-screen flex flex-row w-[100%]">
      <div className="w-[5%]">
      <Minibar/>
      </div>
        <div className="w-[25%] ">
        {children}
        </div>
      
        
     
      </div>
  );
}
