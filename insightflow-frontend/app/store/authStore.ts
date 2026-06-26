import { create } from "zustand";
import {toast} from "sonner"
import { useRouter } from "next/navigation";


interface AuthStoreType {
  loading: boolean;
  setLoading: (value: boolean) => void;

  otpOverlayState:boolean;
  setOtpOverlayState:(value:boolean)=>void

  verificationId: string | null;
  setVerificationId: (id: string | null) => void;

  loginUser: (email: string, password: string) => Promise<void>;

  signupUser: (
    name: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}

const api = process.env.NEXT_PUBLIC_API

export const useAuthStore = create<AuthStoreType>((set) => ({
  // loading state
  loading: false,

  setLoading: (value) => {
    set({ loading: value });
  },

  // otp Overlay
  otpOverlayState : false,

  setOtpOverlayState:(value)=>{
    set({otpOverlayState:value});
  },

  // verificationId
  verificationId: null,
  setVerificationId: (id) => set({ verificationId: id }),

  // loginUser
  loginUser: async (email, password) => {
    try {
      set({ loading: true });

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  // signupUser
  signupUser: async (name, surname, email, password, confirmPassword) => {
    try {
      set({ loading: true });

      const res = await fetch(`${api}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();
      const Id=data.verificationId
      set({
        verificationId:Id,
        otpOverlayState:true,
      })

      toast.success(data.message1)
      toast.message(data.message2)
      console.log(data);
    } catch (error:unknown) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {

      set({ loading: false });
    }
  },


}));
