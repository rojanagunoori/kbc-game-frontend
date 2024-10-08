import React from 'react'

const Result = ({score}) => {
  return (
    <div className='result'>
       <h2>Your Score: {score}</h2>
       <button onClick={()=>window.location.reload()}>Play Again</button>
    </div>
  )
}

export default Result