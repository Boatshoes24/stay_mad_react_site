import '../css/streams.css';
import tankIcon from '../images/philmod-tank.png';
import healerIcon from '../images/philmod-healer.png';
import dpsIcon from '../images/philmod-dps.png';
import dkIcon from '../images/class-dk.png';
import dhIcon from '../images/class-dh.png';
import druidIcon from '../images/class-druid.png';
import hunterIcon from '../images/class-hunter.png';
import mageIcon from '../images/class-mage.png';
import monkIcon from '../images/class-monk.png';
import paladinIcon from '../images/class-paladin.png';
import priestIcon from '../images/class-priest.png';
import rogueIcon from '../images/class-rogue.png';
import shamanIcon from '../images/class-shaman.png';
import warlockIcon from '../images/class-warlock.png';
import warriorIcon from '../images/class-warrior.png';
import questionIcon from '../images/class-unknown.png';
const streamsJSON = require('../config/streams.json');

const Streams = () => {
  return (
    <div className='stream-container'>
      <ul>
        {streamsJSON.map(
          ({ twitchName, displayName, role, charClass }, index) => (
            <li key={index}>
              <div className='stream-window'>
                <iframe
                  title={twitchName}
                  parent='localhost'
                  className='stream-player'
                  src={`https://player.twitch.tv/?channel=${twitchName}&parent=localhost&parent=staymad.netlify.app&muted=true&autoplay=false`}
                  allowFullScreen={true}
                ></iframe>
                <div className='stream-names'>
                  <img
                    className='role-icons'
                    src={
                      role === 'tank'
                        ? tankIcon
                        : role === 'dps'
                        ? dpsIcon
                        : healerIcon
                    }
                    alt='tank role icon'
                  />
                  <span className='emphasized-item'>{displayName}</span>
                  <img
                    className='class-icons'
                    src={
                      charClass === 'dh'
                        ? dhIcon
                        : charClass === 'dk'
                        ? dkIcon
                        : charClass === 'druid'
                        ? druidIcon
                        : charClass === 'hunter'
                        ? hunterIcon
                        : charClass === 'mage'
                        ? mageIcon
                        : charClass === 'monk'
                        ? monkIcon
                        : charClass === 'paladin'
                        ? paladinIcon
                        : charClass === 'priest'
                        ? priestIcon
                        : charClass === 'rogue'
                        ? rogueIcon
                        : charClass === 'shaman'
                        ? shamanIcon
                        : charClass === 'warlock'
                        ? warlockIcon
                        : charClass === 'warrior'
                        ? warriorIcon
                        : questionIcon
                    }
                    alt='class icon'
                  />
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export default Streams;
