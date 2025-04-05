import { CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const FaucetsCardHeader = () => {
  return (
    <div>
      <CardHeader className="pb-2">
          <div className="flex items-center justify-center">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Faucets
              </CardTitle>
            </div>
          </div>
        </CardHeader>
    </div>
  )
}

export default FaucetsCardHeader
