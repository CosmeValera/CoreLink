import React from 'react'

export default function ErrorPageBadSatellite(props: {text: string}) {
  return (
    <div className='bg-gray-800 text-white min-h-full p-6'>
        <h2>{props.text}</h2>
        <p>Select a valid submarine and try again!</p>
        <img className='w-4' src={require('../img/submarine.svg')} alt="Submarine" />
    </div>
  )
}