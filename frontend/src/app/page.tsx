"use client"
import { TestService } from "@/services/TestService";
import { useEffect } from "react";
export default function Home() {

  useEffect(() => {
    console.log(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/extract-file`)
  })

  async function fetchTestHelloWorld() {
    const test = await TestService.fetchHelloWorld();
    console.log("Backend response:", test);
  }

  return (
    <div className="flex flex-col flex-1 w-full min-h-screen font-sans">
      <button onClick={fetchTestHelloWorld}
        className="cursor-pointer">Click me!</button>
    </div>
  );
}
