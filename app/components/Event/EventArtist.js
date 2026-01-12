import React from 'react'
import Image from 'next/image';

const EventArtist = () => {
  return (
    <section>
        <div>
            <h2 className="text-2xl font-semibold mt-6 mb-2">Artists</h2>
            <div>
                <Image src="/mohombi.jpeg" alt="Mohombi" width={150} height={150} className="rounded-lg mb-4"/>
                <p className="text-lg font-medium">Mohombi</p>
                <p className="text-xs font-extralight text-white/90">Musician, Singer, Composer and Dancer</p>
            </div>
        </div>
    </section>
  )
}

export default EventArtist