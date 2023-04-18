import React, { useState } from 'react'


  const ImageSlider = ({slider}=[])=>{
    const[currentIndex,setCurrentIndex]=useState(0);

    const slideStyles={
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundImage: `url(${slider[currentIndex].url})`,
        backgroundSize: 'cover'
      }

    const leftArrowStyles ={
        position: 'absolute',
        top: '25%',
        transform: 'translate(0,-50%)',
        left: '32px',
        fontSize: '45px',
        zindex: 1,
        color: 'black',
        cursor: 'pointer'
    }

    const rightArrowStyles ={
        position: 'absolute',
        top: '25%',
        transform: 'translate(0,-50%)',
        right: '32px',
        fontSize: '45px',
        zindex: 1,
        color: 'black',
        cursor: 'pointer'
    }

    const goToPrevious = () =>{
        const isFirstSlide = currentIndex == 0
        const newIndex = isFirstSlide ? slider.length-1 : currentIndex -1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () =>{
        const isLastSlide = currentIndex === slider.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex +1;
        setCurrentIndex(newIndex);
    }

    return (
    
    <div style={slideStyles}>
        <div style={leftArrowStyles} onClick={goToPrevious}>)</div>
        <img src={slider[currentIndex].url} alt={slider[currentIndex].title} style={{width: "100%", height: "100%"}} onClick={goToNext} />
        <div style={rightArrowStyles} onClick={goToNext}>(</div>
        <div>
            {slides.map()}
        </div>
    </div>
  )
}

export default ImageSlider