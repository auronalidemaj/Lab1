import React from 'react'
import ImageSlider from './ImageSlider'

function Slider() {
  const containerStyles = {
    width:'500px',
    height: '280px',
    margin: '0px auto'
  }
  const slides = [
    {url:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', title: 'foto1'},
    {url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq87WieyFJ93-wR-FrTk0JG8kWz2sT8HtuGN7PkEQ3mxCEsFQmFoKOXZVP1__Yl3L-G08&usqp=CAU', title: 'foto2'},
    {url:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', title: 'foto3'},
    {url:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', title: 'foto4'},
    {url:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg', title: 'foto5'},
  ]
  return (
    <div style={containerStyles}>
      <ImageSlider slider={slides}/>
    </div>
  )
}

export default Slider