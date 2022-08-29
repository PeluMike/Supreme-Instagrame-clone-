import React from 'react'

function Logospiner() {
  return (
    <div>
        <center className='App-logo'>
            <img src={process.env.PUBLIC_URL +'/weblogo.png '} alt="" width={'70px'}/>
        </center>
    </div>
  )
}

export default Logospiner