import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CircleDollarSign,
  Wallet,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LendingHeader() {
  return (
    <div className="mt-15 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Value Locked */}
          <Card className="bg-white/90 border border-[#9EC6F3] shadow-sm backdrop-blur-sm overflow-hidden group h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-[#1016BC] text-lg font-medium">
                  Total Value Locked
                </CardTitle>
                <div className="bg-white border border-[#9EC6F3] p-2 rounded-lg text-[#1016BC]">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>
              <CardDescription className="text-gray-600">
                Total assets locked in the protocol
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-[calc(100%-88px)]">
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-gray-800">$247.92M</div>
                <div className="flex items-center text-[#00EDBE] text-sm font-medium">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+5.2% (24h)</span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-[#F0F2FF] mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#1016BC] to-[#1192FC] w-[65%] group-hover:w-[67%] transition-all duration-500"></div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Total Supplied */}
          <Card className="bg-white/90 border border-[#9EC6F3] shadow-sm backdrop-blur-sm overflow-hidden group h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-[#1016BC] text-lg font-medium">
                  Total Supplied
                </CardTitle>
                <div className="bg-white border border-[#9EC6F3] p-2 rounded-lg text-[#00EDBE]">
                  <CircleDollarSign className="h-5 w-5" />
                </div>
              </div>
              <CardDescription className="text-gray-600">
                Liquidity that user can use to borrow
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-[calc(100%-88px)]">
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-gray-800">$189.45M</div>
                <div className="flex items-center text-[#00EDBE] text-sm font-medium">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+3.7% (24h)</span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-[#F0F2FF] mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00EDBE] to-[#00EDBE]/70 w-[50%] group-hover:w-[52%] transition-all duration-500"></div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Total Borrowed */}
          <Card className="bg-white/90 border border-[#9EC6F3] shadow-sm backdrop-blur-sm overflow-hidden group h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-[#1016BC] text-lg font-medium">
                  Total Borrowed
                </CardTitle>
                <div className="bg-white border border-[#9EC6F3] p-2 rounded-lg text-[#1192FC]">
                  <Wallet className="h-5 w-5" />
                </div>
              </div>
              <CardDescription className="text-gray-600">
                Total assets borrowed from the protocol
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-[calc(100%-88px)]">
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-gray-800">$58.47M</div>
                <div className="flex items-center text-[#FF5757] text-sm font-medium">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span>-1.2% (24h)</span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-[#F0F2FF] mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF5757] to-[#FF5757]/70 w-[30%] group-hover:w-[28%] transition-all duration-500"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
