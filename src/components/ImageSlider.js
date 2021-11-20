import { Slide } from 'react-slideshow-image';
import '../css/imageslider.css';
import '../../node_modules/react-slideshow-image/dist/styles.css';
const slideImages = require('../config/slideImages.json');

const properties = {
  duration: 10000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: (
    <div
      className='arrow-slider'
      style={{ width: '30px', marginRight: '-30px' }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='#fff'>
        <path d='M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z' />
      </svg>
    </div>
  ),
  nextArrow: (
    <div
      className='arrow-slider'
      style={{ width: '30px', marginLeft: '-30px' }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='#fff'>
        <path d='M512 256L270 42.6v138.2H0v150.6h270v138z' />
      </svg>
    </div>
  ),
};

const ImageSlider = () => {
  return (
    <div className='image-slider'>
      <Slide {...properties}>
        {slideImages.map((slideImage, index) => (
          <div className='each-slide' key={index}>
            <div style={{ backgroundImage: `url(${slideImage.url})` }}></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;
