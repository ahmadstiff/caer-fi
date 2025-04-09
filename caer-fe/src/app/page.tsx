import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button } from "@/components/ui/button";
import SplashCursor from '@/components/ui/SplashCursor'



export default function Home() {
  const words = [
    {
      text: "Crosschain",
    },
    {
      text: "Lending",
    },
    {
      text: "And",
    },
    {
      text: "Borrowing",
    },
    {
      text: "by",
    },
    {
      text: "EDUCHAIN.",
      className: "text-[#131BEB]",
    },
  ];

  return (
    <div className="">
      <SplashCursor/>

      <div className=" flex items-center justify-center w-full flex-col px-4 min-h-screen overflow-hidden relative z-10">
        <h2 className="bg-clip-text text-center text-[#07094d] bg-gradient-to-b from-[#07094d] to-[#141beb] dark:from-[#07094d] dark:to-[#141beb] text-2xl md:text-4xl  font-sans relative z-20 font-bold tracking-tight">
        <TextHoverEffect text="CAER FINANCE"/> 
        </h2>

        <TypewriterEffectSmooth words={words} className=" mx-auto text-center " />

        <div className="flex flex-row items-center gap-4 md:gap-6 mt-6 md:mt-10 text-center z-30">
          <Button
            variant="outline"
            size="lg"
            className="bg-[#141beb] hover:bg-[#07F2BE] text-white px-8 py-6 text-md rounded-md"
            asChild
          >
            <a href="/lending">Start Lending</a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-[#01ECBE] bg-[#ffffff2e] text-[#07094d] hover:bg-[#01ECBE]/10 px-8 py-6 text-lg rounded-md"
            asChild
          >
            <a href="https://caer.gitbook.io/caer" target="_blank" rel="noopener noreferrer">View Docs</a>
          </Button>
        </div>
      </div>
    </div>
  );

}
