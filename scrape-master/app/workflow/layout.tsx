import Logo from '@/components/Logo'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'

function layout({children}:{children: React.ReactNode}) {
  return (
    <div className='flex flex-col w-full h-screen'>{children}
    <Separator/>
    <footer className='flex item-center justify-between p-2'>
        <Logo iconSize={16} fontSize='text-xl'/>
        
    </footer>
    </div>
  )
}

export default layout