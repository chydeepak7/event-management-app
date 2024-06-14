import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Events from '../components/Events'
import ImageUpload from '../components/ImageUpload'
import SearchBox from "../components/SearchBox";
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