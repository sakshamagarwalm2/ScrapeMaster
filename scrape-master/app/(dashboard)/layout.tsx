import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex h-screen'>
        <div className="flex flec-col flex-1 min-h-screen">
            <header className=""></header>
        </div>
    </div>
  )
}

export default layout