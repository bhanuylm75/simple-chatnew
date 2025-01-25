"use client";

import Image from 'next/image';

export default function ChatHeader({ chatPartner }) {
  return (
    <div className="flex items-center px-6 py-3 border-b bg-white">
      <div className="flex items-center space-x-4">
        {chatPartner.image ? (
          <Image
            src={chatPartner.image}
            alt={chatPartner.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {chatPartner.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h2 className="font-semibold">{chatPartner.name}</h2>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
      </div>
    </div>
  );
}