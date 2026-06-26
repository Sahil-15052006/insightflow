"use client"
import {
  Field,
  FieldDescription,
} from "@/components/ui/field"
import logo_blue from "../../public/logo/logo_blue.png"

import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-[radial-gradient(circle,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-size-[7px_7px] bg-black dark text-white">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="" className="flex items-center gap-2 font-semibold">
            <div className="flex size-10 items-center justify-center rounded-md  text-primary-foreground">
              <Image src={logo_blue} alt="logo"  ></Image>
            </div>
            Insightflow
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
            <Field>
          <Button className="bg-white text-black mt-5">
            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.96 2.36 30.42 0 24 0 14.64 0 6.56 5.38 2.52 13.22l8.04 6.24C12.48 13.5 17.76 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.55c0-1.64-.14-3.22-.4-4.73H24v9.04h12.68c-.54 2.92-2.2 5.4-4.68 7.08l7.56 5.88C43.98 37.5 46.5 31.62 46.5 24.55z"/>
              <path fill="#FBBC05" d="M10.56 28.54c-.5-1.48-.78-3.06-.78-4.54s.28-3.06.78-4.54l-8.04-6.24A23.93 23.93 0 0 0 0 24c0 3.86.92 7.5 2.52 10.78l8.04-6.24z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.9-5.82l-7.56-5.88c-2.1 1.42-4.8 2.28-8.34 2.28-6.24 0-11.52-4-13.44-9.96l-8.04 6.24C6.56 42.62 14.64 48 24 48z"/>
          </svg>
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="10"
          height="10"
          className="absolute inset-0 h-full w-full object-cover bg-[linear-gradient(to_top,rgba(144,70,200,1),transparent)]"
        />
      </div>
    </div>
  )
}
