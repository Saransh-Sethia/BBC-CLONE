import React from 'react'

const Cards = ({info,id}) => {
  return (
<div key={id} className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src={info.urlToImage} alt="Sunset in the mountains" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{info.title}</div>
    <p className="text-gray-700 text-base">
      {info.description}
    </p>
  </div>

</div>
  )
}

export default Cards
