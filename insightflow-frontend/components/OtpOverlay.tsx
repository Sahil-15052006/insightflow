"use client"
import { InputOTPForm } from "./otp-form"
import { useAuthStore } from "@/app/store/authStore"
export default function OtpOverlay(){
  const otpOverlayState = useAuthStore((state)=>state.otpOverlayState)
  return(
    <div className={`${otpOverlayState ?'absolute':`hidden`} inset-0 z-50 bg-transparent backdrop-blur-sm justify-center items-center flex`}>
      <InputOTPForm/>
    </div>
  )
}
