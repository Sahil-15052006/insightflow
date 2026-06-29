import { create } from "zustand";
import { toast } from "sonner";

interface SignupData {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthStoreType {
  loading: boolean;
  otpOverlayState: boolean;
  verificationId: string | null;
  email:string ;
  resetPassOverlay : boolean;

  setLoading: (value: boolean) => void;
  setOtpOverlayState: (value: boolean) => void;
  setVerificationId: (id: string | null) => void;
  setEmail:(email:string | "")=>void;
  setResetPassOverlay:(value:boolean) => void

  loginUser: (email: string, password: string) => Promise<boolean>;
  signupUser: (data: SignupData) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>
  resendOTP: (email: string) => Promise<void>
  resetPassword: (otp: string, newPassword: string) => Promise<void>
}

const api = process.env.NEXT_PUBLIC_API;

export const useAuthStore = create<AuthStoreType>((set) => ({
  loading: false,
  otpOverlayState: false,
  verificationId: null,
  email:"",
  resetPassOverlay:false,

  setLoading: (value) => set({ loading: value }),
  setOtpOverlayState: (value) => set({ otpOverlayState: value }),
  setVerificationId: (id) => set({ verificationId: id }),
  setEmail: (email) => set({email:email}),
  setResetPassOverlay:(value)=>set({resetPassOverlay:value}),

  loginUser: async (email, password) => {
    try {
      set({ loading: true });

      const res = await fetch(`${api}/auth/loginUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);

      return data.success; // or whatever backend sends
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signupUser: async (signupData) => {
    try {
      set({ loading: true });

      const res = await fetch(`${api}/auth/registerUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      set({
        verificationId: data.verificationId,
        otpOverlayState: true,
      });

      toast.success(data.message1);
      toast.message(data.message2);
    } catch (error: unknown) {
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

  verifyOTP: async (otp) => {
    try {
      set({ loading: true });

      const verificationId = useAuthStore.getState().verificationId;

      const res = await fetch(`${api}/auth/verifyUserOTP`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({
          verificationId,
          otp,
        }),
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "OTP verification failed");
      }

      toast.success(response.message);
      console.log(response);
      set({
        email:"",
        otpOverlayState:false,
      })

    } catch (error: unknown) {
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

  resendOTP: async (email) => {
  try {
    set({ loading: true });

    const res = await fetch(`${api}/auth/sendUserOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    set({
      verificationId:data.verificationId
    })

    if (!res.ok) {
      throw new Error(data.message || "Failed to resend OTP");
    }

    toast.success(data.message);
  } catch (error: unknown) {
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

  resetPassword: async (otp, newPassword) => {
  try {
    set({ loading: true });

    const verificationId = useAuthStore.getState().verificationId;

    if (!verificationId) {
      throw new Error("Verification ID missing");
    }

    const res = await fetch(`${api}/auth/resetPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify({
        otp,
        verificationId,
        newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message)
      throw new Error(data.message || "Password reset failed");
    }

    toast.success(data.message);

    set({
      verificationId: null,
      resetPassOverlay: false,
    });
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    set({ loading: false });
  }
  }

}));
