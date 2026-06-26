import { Button } from "@/components/ui/button"
import { GeistMono } from "geist/font/mono"
import Link from "next/link"
export default function Hero(){
  return(
    <main className="min-h-screen  w-full bg-transparent p-5 ">
      <div className="flex flex-col gap-10 justify-center items-center rounded-b-4xl min-h-screen outline-[#5D51D5] border-b-2 border-x-2 border-[#5D51D5]">
        <div className=" w-full flex flex-col gap-5 justify-center items-center pt-40">
          <h1 className=" text-center text-4xl sm:text-6xl font-medium tracking-tight text-balance px-5">
            The data intelligence layer for <span className="text-[#5D51D5]">automated </span>decisions
          </h1>
          <p className=" text-center sm:max-w-lg text-sm text-white/50 p-5">
            Connect once, and your data pipelines automatically clean, analyze, and transform raw information into real-time insights, dashboards, and actionable workflows.
          </p>
          <div className={`${GeistMono.className} flex flex-col sm:flex-row gap-5 justify-center items-center`}>
            <Button className="px-10 py-7 border border-[#5D51D5] hover:border-[#5D51D5]/0 bg-[#5D51D5] transition-all duration-300">Try It</Button>

            <Link href="#problem" className="scroll-smooth duration-300">
                <Button className="px-5  py-7 border border-[#5D51D5] hover:border-white hover:text-white text-[#5D51D5] hover:bg-black  bg-[#000000] transition-all duration-300">Know More</Button>
            </Link>
          </div>
        </div>
        <div className="h-100 rounded-b-3xl w-full flex bg-[linear-gradient(to_top,rgba(144,70,200,1),transparent)]">

        </div>
      </div>
    </main>
  )
}
