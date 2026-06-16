"use client"
import { TestService } from "@/services/TestService";

export default function Home() {

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
