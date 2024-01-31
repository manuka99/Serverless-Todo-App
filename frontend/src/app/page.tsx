"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Todo from "./components/Todo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { data: session } = useSession();

  const email: string = session?.user?.email || "";
  const username: string = email?.split?.("@")?.[0] || "user";

  if (session) {
    return (
      <div className="w-full h-screen flex items-start justify-center">
        <div className="flex max-w-[700px] w-[100%] max-h-[100%] flex flex-col justify-center items-center gap-4">
          <div className="flex justify-between items-center w-full mt-6 flex-wrap p-2">
            <div className="flex gap-2 mb-4">
              <Image
                src={"/images/user-icon.png"}
                width={45}
                height={45}
                alt="user-icon"
                className="object-cover rounded-full hidden sm:block"
              />
              <div className="flex flex-col gap-1 text-sm">
                <p>Welcome {username}!</p>
                <div className="flex gap-1">
                  <p>Signed In As</p>
                  <p className="font-bold">{email}</p>
                </div>
              </div>
            </div>
            <div>
              <button
                className="bg-red-600 text-sm font-bold py-2 px-4 rounded-md"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          </div>
          <div className="flex w-full h-full flex flex-col items-center">
            <p className="text-2xl md:text-4xl font-bold my-6">My Todos</p>
            <Todo />
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-2xl mb-2">Welcome User.</p>
      <p className="text-2xl mb-2">You must sign in to manage your Todos.</p>
      <button
        className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2 bg-gray-200 text-black"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </div>
  );
}
