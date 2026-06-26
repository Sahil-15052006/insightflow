"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/app/store/authStore"
import { useState } from "react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const signupUser = useAuthStore((state)=>state.signupUser)
  const [name,setName]=useState("")
  const [surname,setSurname]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")

  const submitButton = async()=>{
    await signupUser(name,surname, email,password,confirmPassword)
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>

        </div>
        <div className=" flex flex-row justify-center items-center gap-2">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              onChange={(event)=>setName(event.target.value)}
              id="name"
              type="text"
              placeholder="John"
              required
              className="bg-background"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="surname">Surname</FieldLabel>
            <Input
              onChange={(event)=>setSurname(event.target.value)}
              id="surname"
              type="text"
              placeholder="Doe"
              required
              className="bg-background"
            />
          </Field>

        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            onChange={(event)=>setEmail(event.target.value)}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />

        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            onChange={(event)=>setPassword(event.target.value)}
            id="password"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            onChange={(event)=>setConfirmPassword(event.target.value)}
            id="confirm-password"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <Button
            onClick={submitButton}
            type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
      </FieldGroup>
    </form>
  )
}
