import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import slideImages from '../config/slideImages.json';

const ImageSlider = () => {
  return (
    <div className='image-slider-container'>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={10000}
        onClickItem={(index, item) => {
          window.open(
            item.props.children.props.src,
            '_blank',
            'noopener,noreferrer'
          );
        }}
      >
        {slideImages.map((slideImage, index) => (
          <div className='each-slide' key={index}>
            <img src={slideImage.url} alt='boss screenshot' />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
