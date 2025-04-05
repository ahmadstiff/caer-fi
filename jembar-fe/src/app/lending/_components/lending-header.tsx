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
          <Card className="bg-slate-900/60 border border-slate-800 backdrop-blur-sm hover:bg-slate-900/80 transition-all duration-200 overflow-hidden group">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-200 text-lg font-medium">
                  Total Value Locked
                </CardTitle>
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>
              <CardDescription className="text-slate-400">
                Total assets locked in the protocol
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-white">$247.92M</div>
                <div className="flex items-center text-emerald-400 text-sm font-medium">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+5.2% (24h)</span>
                </div>
              </div>
              <div className="h-1 w-full bg-slate-800 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 w-[65%] group-hover:w-[67%] transition-all duration-500"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border border-slate-800 backdrop-blur-sm hover:bg-slate-900/80 transition-all duration-200 overflow-hidden group">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-200 text-lg font-medium">
                  Total Supplied
                </CardTitle>
                <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                  <CircleDollarSign className="h-5 w-5" />
                </div>
              </div>
              <CardDescription className="text-slate-400">
                Liquidity that user can use to borrow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-white">$189.45M</div>
                <div className="flex items-center text-emerald-400 text-sm font-medium">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+3.7% (24h)</span>
                </div>
              </div>
              <div className="h-1 w-full bg-slate-800 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-green-600 w-[50%] group-hover:w-[52%] transition-all duration-500"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border border-slate-800 backdrop-blur-sm hover:bg-slate-900/80 transition-all duration-200 overflow-hidden group">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-200 text-lg font-medium">
                  Total Borrowed
                </CardTitle>
                <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                  <Wallet className="h-5 w-5" />
                </div>
              </div>
              <CardDescription className="text-slate-400">
                Total assets borrowed from the protocol
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-white">$58.47M</div>
                <div className="flex items-center text-red-400 text-sm font-medium">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span>-1.2% (24h)</span>
                </div>
              </div>
              <div className="h-1 w-full bg-slate-800 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 w-[30%] group-hover:w-[28%] transition-all duration-500"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
