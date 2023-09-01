import React from 'react'

const LandingCard = ({image, title, desc}) => {
  return (
    <div className={`transition-all rounded-xl bg-blue-400 bg-opacity-20 backdrop-blur-md hover:scale-105 hover:shadow-lg hover:shadow-blue-300`}>
      <div>
        <img className='rounded-xl' width={350} src={image} alt="image" />
      </div>
      <div>
        <h3 className='text-3xl font-bold text-center'>{title}</h3>
        <p className='p-2'>{desc}</p>
      </div>
    </div>
  )
}

export default LandingCard
