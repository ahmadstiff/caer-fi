import { BackgroundLines } from "@/components/ui/background-lines";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button } from "@/components/ui/button";

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
      text: "Espresso.",
      className: "text-[#B67237] ",
    },
  ];

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 max-h-screen overflow-hidden relative">
      <TypewriterEffectSmooth words={words} className="cursor-none absolute mx-auto text-center z-30" />

      <h2 className=" bg-clip-text text-center text-white bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-9xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        <TextHoverEffect text="CAER" /> <br />
      </h2>
      <div className="flex flex-row items-center gap-4 md:gap-6 mt-6 md:mt-10 text-center z-30">
        <Button
          variant="outline"
          size="lg"
          className="bg-gradient-to-r from-[#B67237]/10 to-[#B67237]/30 text-white hover:text-white hover:bg-[#B67237]/40 border-[#B67237]/30 hover:border-[#B67237]/80 transition-colors duration-300 font-medium px-6 py-3 rounded-xl relative"
          asChild
        >
          <a href="/lending">Start Lending</a>
          {/* <p>calculator</p> */}

        </Button>

        <Button
          variant="outline"
          size="lg"
          className="bg-gradient-to-r from-[#B67237]/10 to-[#B67237]/30 text-white hover:bg-[#B67237]/20 hover:text-white border-[#B67237]/30 hover:border-[#B67237]/80 transition-colors duration-300 font-medium px-6 py-3 rounded-xl relative"
          asChild
        >
          <a href="https://caer.gitbook.io/caer" target="_blank" rel="noopener noreferrer">View Docs</a>
        </Button>
      </div>
    </BackgroundLines>

  );
}
