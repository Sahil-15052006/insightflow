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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const signupUser = useAuthStore((state) => state.signupUser);
  const setEmail  = useAuthStore((state)=>state.setEmail)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await signupUser({
      name: data.name as string,
      surname: data.surname as string,
      email: data.email as string,
      password: data.password as string,
      confirmPassword: data.confirmPassword as string,
    });

    setEmail(data.email as string)
    
  };


  return (
    <form
    onSubmit={handleSubmit}
    className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>

        </div>
        <div className=" flex flex-row justify-center items-center gap-2">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John"
              required
              className="bg-background"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="surname">Surname</FieldLabel>
            <Input
              id="surname"
              name="surname"
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
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />

        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <Button
            type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
      </FieldGroup>
    </form>
  )
}
