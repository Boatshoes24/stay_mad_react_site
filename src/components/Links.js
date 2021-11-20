import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  BsInfoSquare,
  BsTwitch,
  BsCardImage,
  BsPencilSquare,
} from 'react-icons/bs';
import { IoBarChartOutline } from 'react-icons/io5';
import '../css/links.css';

const Links = () => {
  return (
    <div className='navbar'>
      <ul>
        <li>
          <div className='link-container'>
            <Link to='/about'>
              <BsInfoSquare />
              <span>About</span>
            </Link>
          </div>
        </li>
        <li>
          <div className='link-container'>
            <Link to='/gallery'>
              <BsCardImage />
              <span>Gallery</span>
            </Link>
          </div>
        </li>
        <li>
          <div className='link-container'>
            <Link to='/streams'>
              <BsTwitch />
              <span>Streams</span>
            </Link>
          </div>
        </li>
        <li>
          <div className='link-container'>
            <a
              href='https://www.warcraftlogs.com/guild/id/367786'
              rel='noopener noreferrer'
              target='_blank'
            >
              <IoBarChartOutline />
              <span>Logs</span>
            </a>
          </div>
        </li>
        <li>
          <div className='link-container'>
            <Link to='/apply'>
              <BsPencilSquare />
              <span>Apply</span>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

Links.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.object,
};

export default Links;
