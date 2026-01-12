import React from 'react'
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='bg-background px-6 w-full flex justify-between items-center h-16  border-b fixed top-0 left-0 right-0 z-10'>
        <Image src="https://concerts.onlybees.in/_next/static/media/OnlyBees_light.3cfb6be4.svg" width={150} height={150} alt="OnlyBees Logo" />
    </div>
  )
}

export default Navbar