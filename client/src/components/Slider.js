import { useState, useEffect } from 'react';

const slideshow = {
  border: 'none',
  width: '100%',
  height: '500px',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

const prevButton = {
  position: 'absolute',
  height: '500px',
  top: '50%',
  border: 'none',
  backgroundColor: 'transparent',
  left: '0',
  color: 'black',
  cursor: 'pointer',
  transform: 'translate(0%, -50%)',
  zIndex: 1,
};

const nextButton = {
  position: 'absolute',
  height: '400px',
  backgroundColor: 'transparent',
  border: 'none',
  top: '50%',
  color: 'black',
  right: '0',
  transform: 'translate(0%, -50%)',
  zIndex: 1,
};

const dotsContainerSlide = {
  dispay : 'flex',
  justifyContent: 'center'
}

const dotStyle ={
  margin: '0 3px',
  cursor: 'pointer',
  fontSize: '20px'
}

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgArray, setImgArray] = useState([
    'https://www.roadaffair.com/wp-content/uploads/2020/11/el-pendulo-bookstore-mexico-city-flickr.jpg',
    'https://secretsanfrancisco.com/wp-content/uploads/2021/10/black-bird-books.jpg',
    'https://www.scatteredbooks.com/wp-content/uploads/2019/02/home-slider-content-background-img_panorama.jpg',
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % imgArray.length);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentIndex, imgArray]);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + imgArray.length) % imgArray.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % imgArray.length);
  };

  // const goToSlide = (slideIndex) => {
  //   setCurrentIndex(slideIndex);
  // }

  const slideStyle = {
    ...slideshow,
    backgroundImage: `url(${imgArray[currentIndex]})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <>
    <div style={slideStyle}>
      <button onClick={handlePrevClick} style={{ ...prevButton}}>
      <b></b>
      </button>
      <button onClick={handleNextClick} style={{ ...nextButton}}>
        <b></b>
      </button>
    </div>
  </>
  );
};

export default Slider;
