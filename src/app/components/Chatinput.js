"use client";
import axios from "axios"
import { useState } from "react";

const ChatInput = ({ chatid }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);

    try {
      const res=await axios.post("http://localhost:3000/api/sendmessage",{text:input,chatid})
      console.log(res)
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setIsLoading(false);
      setInput(""); 
    }
  };

  return (
    <div className="w-full flex items-center gap-3 p-4   bg-white">
      <textarea
        className="flex-grow w-full resize-none border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
      />
      <button
        onClick={handleSendMessage}
        disabled={isLoading}
        className={`px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md 
          hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition 
          ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
