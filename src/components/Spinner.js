import React from 'react'
import loading from '../media/loading.gif'
const Spinner = () =>  {
 
    return (
      <div className='d-flex justify-content-center '>
        <img className="my-3" src={loading} alt="loading" />
      </div>
    )
  
}

export default Spinner;