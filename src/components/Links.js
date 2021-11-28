import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  FiInfo,
  FiTwitch,
  FiImage,
  FiEdit,
  FiHome,
  FiBarChart2,
} from 'react-icons/fi';

const Links = () => {
  return (
    <div className='navbar'>
      <ul>
        <li>
          <div id='link1' className='link-container'>
            <Link to='/'>
              <FiHome />
              <span>Home</span>
            </Link>
          </div>
        </li>
        <li>
          <div id='link2' className='link-container'>
            <Link to='/about'>
              <FiInfo />
              <span>About</span>
            </Link>
          </div>
        </li>
        <li>
          <div id='link3' className='link-container'>
            <Link to='/gallery'>
              <FiImage />
              <span>Gallery</span>
            </Link>
          </div>
        </li>
        <li>
          <div id='link4' className='link-container'>
            <Link to='/streams'>
              <FiTwitch />
              <span>Streams</span>
            </Link>
          </div>
        </li>
        <li>
          <div id='link5' className='link-container'>
            <a
              href='https://www.warcraftlogs.com/guild/id/367786'
              rel='noopener noreferrer'
              target='_blank'
            >
              <FiBarChart2 />
              <span>Logs</span>
            </a>
          </div>
        </li>
        <li>
          <div id='link6' className='link-container'>
            <Link to='/apply'>
              <FiEdit />
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
