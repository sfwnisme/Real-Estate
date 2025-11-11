import React from "react";

export default function LoadingPage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-3xl z-50 h-screen w-full">
      <span className="inline-block size-8 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
    </div>
  );
}
