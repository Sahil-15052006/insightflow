import { FieldLabel } from "@/components/ui/field"
import { GeistMono } from "geist/font/mono";
export default function Problem(){

  const para1="Your data lives in different places. CSV files, databases, dashboards, and spreadsheets. None of them understand the relationships between each other. Your revenue drop isn’t just a number in a dashboard, missing values in a dataset, and changing user behavior."

  const para2="It’s one story. Until analytics tools see it that way, they’ll keep giving you shallow insights."

  return(
    <main id="problem" className="p-7 sm:px-15 sm:py-10 bg-transparent cursor-pointer min-h-screen">
      <FieldLabel className={`${GeistMono.className} h-fit w-fit border border-secondary rounded p-2 text-sm bg-black text-white/40`}>THE PROBLEM</FieldLabel>


      <p className="w-fit mt-10">
        {
          para1.split(" ").map((word,i)=>
            <span
            key={i}
            className="scroll-m-20 text-xl sm:text-2xl lg:text-5xl font-medium  text-balance text-left mt-5 hover:text-[#5D51D5] duration-300  transition-all"
            >
             {`${word} `}
            </span>
          )
        }
      </p>
      <p className="w-fit mt-10">
        {
          para2.split(" ").map((word,i)=>
            <span
            key={i}
            className="scroll-m-20 text-xl sm:text-2xl lg:text-5xl font-medium  text-balance text-left mt-5 hover:text-[#5D51D5] duration-300 ease-in-out transition-all"
            >
             {`${word} `}
            </span>
          )
        }
      </p>



    </main>
  )
}
