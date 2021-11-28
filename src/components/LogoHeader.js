import { Link } from 'react-router-dom';

const LogoHeader = () => {
  return (
    <div className='header-container'>
      <Link to='/'>
        <img
          id='banner-img'
          src='https://i.imgur.com/V3512bg.png'
          alt='website banner'
        />
      </Link>
    </div>
  );
};

export default LogoHeader;
