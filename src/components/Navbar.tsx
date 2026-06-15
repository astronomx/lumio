import Image from "next/image";
import Link from 'next/link';

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

export default function Navbar() {
    return (
        <header className="flex justify-between items-center py-1 px-3 gap-4 drop-shadow-2xl bg-surface">
          <div>
            <Link href={"/"} className="flex flex-row gap-3 items-center">
              <Image src={"/images/lumio/lumio-64x64.png"} height={48} width={48} alt='Lumio character' />
              <p className="text-3xl text-primary">Lumio</p>
            </Link>
          </div>

          <div>
            <Show when="signed-out">
              <SignInButton>
                <button className="rounded-full font-medium text-sm sm:text-base py-1 px-6 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="bg-brand text-white rounded-full font-medium text-sm sm:text-base py-1 px-6 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </header>
    )
}