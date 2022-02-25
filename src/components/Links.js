import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  FiInfo,
  FiTwitch,
  FiImage,
  FiEdit,
  FiHome,
  FiBarChart2,
} from 'react-icons/fi';

const Links = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');

  return (
    <div className='navbar'>
      <ul>
        <li>
          <div
            id='link1'
            className={`${
              splitLocation[1] === '' ? 'active-link1' : ''
            } link-container`}
          >
            <Link to='/'>
              <FiHome />
              <span>Home</span>
            </Link>
          </div>
        </li>
        <li>
          <div
            id='link2'
            className={`${
              splitLocation[1] === 'about' ? 'active-link2' : ''
            } link-container`}
          >
            <Link to='/about'>
              <FiInfo />
              <span>About</span>
            </Link>
          </div>
        </li>
        <li>
          <div
            id='link3'
            className={`${
              splitLocation[1] === 'gallery' ? 'active-link3' : ''
            } link-container`}
          >
            <Link to='/gallery'>
              <FiImage />
              <span>Gallery</span>
            </Link>
          </div>
        </li>
        <li>
          <div
            id='link4'
            className={`${
              splitLocation[1] === 'streams' ? 'active-link4' : ''
            } link-container`}
          >
            <Link to='/streams'>
              <FiTwitch />
              <span>Streams</span>
            </Link>
          </div>
        </li>
        <li>
          <div
            id='link5'
            className={`${
              splitLocation[1] === 'logs' ? 'active-link5' : ''
            } link-container`}
          >
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
          <div
            id='link6'
            className={`${
              splitLocation[1] === 'apply' ? 'active-link6' : ''
            } link-container`}
          >
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
