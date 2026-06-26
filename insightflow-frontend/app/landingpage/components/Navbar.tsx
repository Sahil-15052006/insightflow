import { Button } from "@/components/ui/button"
import logo_white from "../../../public/logo/logo_white.png"
import Image from "next/image"
import Link from "next/link"
import { GeistMono } from "geist/font/mono"

export default function Navbar(){
  return(
      <nav className={` bg-black border-2 border-gray rounded-xl h-fit p-3`}>
          <div className="flex flex-row justify-between items-center h-fit ">
            <div className="flex flex-row justify-center items-center gap-5">
              <Image src={logo_white} height={30} alt="logo"/>
              <div className="text-center text-lg sm:text-xl font-medium tracking-tight text-balance">Insightflow</div>
            </div>
            <div className={` ${GeistMono.className} flex flex-row justify-center items-center gap-5 `}>
              <Link href="/login">
                <Button className="hidden sm:block h-fit px-5  py-2 border border-[#5D51D5] hover:border-white text-[#5D51D5] hover:text-[#ffffff] bg-[#000000] hover:bg-black transition-all duration-300">SIGN IN</Button>
              </Link>
              <Link href="/signup">
                <Button className="hidden sm:block h-fit px-7 py-2 border rounded-md border-[#5D51D5]    hover:border-[#5D51D5]/0 bg-[#5D51D5] transition-all duration-300">SIGN UP</Button>
              </Link>
            </div>
          </div>
      </nav>
  )
}
