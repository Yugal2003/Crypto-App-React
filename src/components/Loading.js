import React from 'react'
import {RotatingLines} from 'react-loader-spinner'

const Loading = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",height:"100vh",alignItems:"center"}}>
        (<RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""/>)
    </div>
  )
}

export default Loading