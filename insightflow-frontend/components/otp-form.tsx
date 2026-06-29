"use client"

import { XIcon, RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { useAuthStore } from "@/app/store/authStore"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function InputOTPForm() {

  const verifyOTP = useAuthStore((s)=>s.verifyOTP)
  const email = useAuthStore((s)=>s.email)
  const [otp,setOTP] = useState("")
  const resendOTP = useAuthStore((s) => s.resendOTP);
  const setOtpOverlay = useAuthStore((s)=>s.setOtpOverlayState)

  const router=useRouter()

  const handleOTP = async () => {
    await verifyOTP(otp);
    router.replace('/login')
  };

  return (
    <Card className="mx-auto max-w-md">
      <div className="w-full h-fit flex justify-end items-end">
        <XIcon className="me-2" onClick={()=>setOtpOverlay(false)}/>
      </div>
      <CardHeader>
        <CardTitle>Verify your Email</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">{email}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <Button
              onClick={()=>resendOTP(email)}
              variant="outline" size="xs">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
          <InputOTP
            onChange={setOTP}
            maxLength={6} id="otp-verification" required>
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button
            onClick={handleOTP}
            type="submit"
            className="w-full">
            Verify
          </Button>
          <div className="text-sm text-muted-foreground">
            Having trouble signing in?{" "}
            <a
              href="#"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Contact support
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card>
  )
}
