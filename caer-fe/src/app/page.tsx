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
      className: "text-[#01ECBE]",
    },
  ];

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 max-h-screen overflow-hidden relative">
      <TypewriterEffectSmooth words={words} className="cursor-none absolute mx-auto text-center z-30" />

      <h2 className="bg-clip-text text-center text-[#07094d] bg-gradient-to-b from-[#07094d] to-[#141beb] dark:from-[#07094d] dark:to-[#141beb] text-2xl md:text-4xl lg:text-9xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        <TextHoverEffect text="CAER" /> <br />
      </h2>
      <div className="flex flex-row items-center gap-4 md:gap-6 mt-6 md:mt-10 text-center z-30">
        <Button
          variant="outline"
          size="lg"
          className="bg-gradient-to-r from-[#141beb]/10 to-[#141beb]/30 text-[#07094d] hover:text-white hover:bg-[#141beb]/40 border-[#141beb]/30 hover:border-[#141beb]/80 transition-colors duration-300 font-medium px-6 py-3 rounded-xl relative"
          asChild
        >
          <a href="/lending">Start Lending</a>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="bg-gradient-to-r from-[#141beb]/10 to-[#141beb]/30 text-[#07094d] hover:bg-[#141beb]/20 hover:text-white border-[#141beb]/30 hover:border-[#141beb]/80 transition-colors duration-300 font-medium px-6 py-3 rounded-xl relative"
          asChild
        >
          <a href="https://caer.gitbook.io/caer" target="_blank" rel="noopener noreferrer">View Docs</a>
        </Button>
      </div>
    </BackgroundLines>
  );
}
