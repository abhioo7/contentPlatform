"use client";

import { useEffect, useRef } from "react";

interface StoryAlertProps {
  logoUrl: string;
  companyName: string;
}

export default function StoryAlert({ logoUrl, companyName }: StoryAlertProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      dialogRef.current?.showModal();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg shadow-xl p-6 max-w-md mx-4 backdrop:bg-black/50"
      style={{ margin: "auto" }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 mb-4 flex items-center justify-center">
          <img
            src={logoUrl}
            alt={`${companyName} logo`}
            className="w-full h-full object-contain p-2"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome!</h2>
        <p className="text-gray-600 mb-4">Welcome to the story!</p>
        <button
          onClick={() => dialogRef.current?.close()}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Close
        </button>
      </div>
    </dialog>
  );
}
