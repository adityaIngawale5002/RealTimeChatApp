import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({title="Aditya",description="This is an chat app"}) => {


  return (
    <>
   <Helmet>
    
        <title>{title}</title>
        <meta name='description'  content={description}/>
       
   </Helmet>
   </>
  )
}

export default Title