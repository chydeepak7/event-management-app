import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Events from '../components/Events'
import ImageUpload from '../components/ImageUpload'
function Homescreen() {
    
  return (
    <div>
        <Header />
        <Events />
        {/* <ImageUpload /> */}
    </div>
  )
}

export default Homescreen