import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-size-[7px_7px] p-5 ">
      <div className="flex flex-col gap-10 justify-center items-center rounded-b- min-h-screen outline-[#5D51D5] border-b-2 border-x-2 border-[#5D51D5]">
        <div className=" w-full flex flex-col gap-5 justify-center items-center pt-40">
          <h1 className=" text-center text-4xl sm:text-6xl font-medium tracking-tight text-balance px-5">
            The data intelligence layer for <span className="text-[#5D51D5]">automated </span>decisions
          </h1>
          <p className=" text-center sm:max-w-lg text-sm text-secondary/50 p-5">
            Connect once, and your data pipelines automatically clean, analyze, and transform raw information into real-time insights, dashboards, and actionable workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button className="px-10 py-7 border border-[#5D51D5] hover:border-[#5D51D5]/0 bg-[#5D51D5] hover:bg-[#5D51D5]/80">Try It</Button>
            <Button className="px-7  py-7 border border-[#5D51D5] hover:border-[#5D51D5]/40 hover:text-[#5D51D5]/40 text-[#5D51D5] bg-black">See More</Button>
          </div>
        </div>
        <div className="h-100 rounded-b-4xl w-full flex bg-[linear-gradient(to_top,rgba(144,70,200,1),transparent)]">

        </div>
      </div>
    </main>
  );
}
