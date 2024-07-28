import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Comments from './Comments';

const NewsDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log('location',location)
  return (
    <div className='grid grid-cols-2 m-10'>
        <div className='mr-10'>
<h1 className='font-extrabold text-2xl pb-10'>{location.state.info.title}</h1>
<h4 className='pb-10'>{location.state.info.description}</h4>
<img src={location.state.info.urlToImage} alt="image"/>
<button onClick={()=>navigate("/")} class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-14 w-60 mt-14">
  Go Back
</button> 
        </div>
        <div>
<Comments url={location.state.info.url} />
        </div>
      
    </div>
  )
}

export default NewsDetails
