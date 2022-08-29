import React from 'react'
import '../stylings/Slider.css'


function ImageSlider({Image}) {
    return ( 
        <div>
            <div className={'container-slider'}>
                <div  className='post_image'>
                    <img src={Image} alt="" width={'100%'}/>
                </div>
           
            </div>
        </div>
    )
}

export default ImageSlider 
