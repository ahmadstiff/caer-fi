import { CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const FaucetsCardHeader = () => {
  return (
    <div>
      <CardHeader className="pb-2">
          <div className="flex items-center justify-center">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#141beb] to-[#01ECBE] bg-clip-text text-transparent">
                Faucets
              </CardTitle>
            </div>
          </div>
        </CardHeader>
    </div>
  )
}

export default FaucetsCardHeader
