import React, { useState } from 'react'
//import QRCode from 'qrcode.react';
import { QRCodeSVG } from 'qrcode.react'; 

const NameEntry = ({onSubmitAnswer,url}) => {
    const [name,setName]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()
        onSubmitAnswer(name)
    }
  return (
    <div className='display-name'>
      <h1>KBC Quiz Game</h1>
        <h2>Enter Your Name</h2>
        <form onSubmit={handleSubmit}>
        <QRCodeSVG value={url}//"http://192.168.43.107:3001/join"
         />
        <br/>
        <p>Scan the QR code above to join the game. Enter your name below to start!</p>
               
      {/*  <QRCode value="http://localhost:3000" />*/}
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Your Name' required/>
            <br/><button type='submit'>Start Game</button>
        </form>
        
        
    </div>
  )
}

export default NameEntry