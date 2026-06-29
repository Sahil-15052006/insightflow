"use client"
import { InputOTPForm } from "./otp-form"
import { useAuthStore } from "@/app/store/authStore"
import { ResetPasswordForm } from "./reset-password"
export default function OtpOverlay(){
  const otpOverlayState = useAuthStore((state)=>state.otpOverlayState)
  const resetPassOverlayState = useAuthStore((s=>s.resetPassOverlay))
  return(
    <>
      <div className={`${otpOverlayState ?'absolute':`hidden`} inset-0 z-50 bg-transparent backdrop-blur-sm justify-center items-center flex p-2`}>
        <InputOTPForm/>
      </div>
      <div className={`${resetPassOverlayState ?'absolute':`hidden`} inset-0 z-50 bg-transparent backdrop-blur-sm justify-center items-center flex p-2`}>
        <ResetPasswordForm/>
      </div>
    </>
  )
}
