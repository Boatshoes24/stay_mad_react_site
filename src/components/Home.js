import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/home.css';
import classes from '../config/recruitmentNeeds';
import raids from '../config/raids';

const raiderIOUrl =
  'https://raider.io/api/v1/guilds/profile?region=us&realm=area%2052&name=stay%20mad&fields=raid_progression%2Craid_rankings';

const Home = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const raidData = [];
    axios
      .get(raiderIOUrl)
      .then((res) => {
        for (const [key, value] of Object.entries(res.data.raid_progression)) {
          let raidRanks = {};
          if (res.data.raid_rankings[key]) {
            raidRanks = { ...raidRanks, ...res.data.raid_rankings[key] };
          }
          raidData.push({
            name: key,
            progress: value.summary,
            rankings: raidRanks,
          });
        }
        setUserData(raidData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const needSpec = [];
  classes.forEach((spec) => {
    if (spec.recruiting === true) {
      needSpec.push(spec);
    }
  });

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context('../images', false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div className='home-container'>
      <div className='progress-container'>
        <h1>Raid Progress</h1>
        {userData.map((raid, index) => (
          <div
            key={index}
            className='raid-card'
            style={{
              backgroundImage: `url(${raids[index].img})`,
              backgroundSize: 'cover',
            }}
          >
            <div className='raid-ranks'>
              <h2 className='raid-ranks-ranking'>
                Region:{' '}
                <span className='raid-ranks-value'>
                  {raid.rankings.mythic.region || '0'}
                </span>
              </h2>
              <h2 className='raid-ranks-ranking'>
                Realm:{' '}
                <span className='raid-ranks-value'>
                  {raid.rankings.mythic.realm || '0'}
                </span>
              </h2>
            </div>
            <div className='card-text'>
              <h3>{raids[index].display}</h3>
              <p>{raid.progress || '0'}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='recruiting-container'>
        <h1>Recruiting</h1>
        <div className='recruiting-icons'>
          {needSpec.map(({ name, recruitng, img }, index) => (
            <img key={index} src={images[img].default} alt='spec icon' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
