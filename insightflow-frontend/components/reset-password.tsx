"use client"

import { useState } from "react"
import { RefreshCwIcon, XIcon } from "lucide-react"

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
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAuthStore } from "@/app/store/authStore"

export function ResetPasswordForm() {
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")

  const resendOTP = useAuthStore((s) => s.resendOTP)
  const email = useAuthStore((s) => s.email)
  const setEmail = useAuthStore((s) => s.setEmail)
  const resetPassword = useAuthStore((s) => s.resetPassword)
  const setResetPassOverlay = useAuthStore((s)=>s.setResetPassOverlay)

  const handleGetOTP = async () => {
    await resendOTP(email)
  }

  const handleResetPassword = async () => {
    await resetPassword(otp, password)
  }

  return (
    <Card className="mx-auto max-w-md">
      <div className="w-full h-fit flex justify-end items-end">
        <XIcon className="me-2" onClick={()=>setResetPassOverlay(false)}/>
      </div>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email to receive a verification code.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Email Field */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="button" onClick={handleGetOTP}>
              Get OTP
            </Button>
          </div>
        </Field>

        {/* OTP Field */}
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGetOTP}
            >
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Resend
            </Button>
          </div>

          <InputOTP
            maxLength={6}
            id="otp-verification"
            required
            value={otp}
            onChange={setOtp}
          >
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-12 sm:*:data-[slot=input-otp-slot]:w-16 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <FieldDescription>
            Enter the 6-digit code sent to your email.
          </FieldDescription>
        </Field>

        {/* New Password Field */}
        <Field>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          className="w-full"
          onClick={handleResetPassword}
        >
          Verify
        </Button>
      </CardFooter>
    </Card>
  )
}
