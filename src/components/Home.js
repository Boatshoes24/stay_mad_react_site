import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from '../config/recruitmentNeeds';
import raids from '../config/raids';
import classLabels from '../config/classLabels.json';
import previousRaids from '../config/previousRaids.json';
import raidRoster from '../config/raidRoster.json';

const raiderIOUrl =
  'https://raider.io/api/v1/guilds/profile?region=us&realm=area%2052&name=stay%20mad&fields=raid_progression%2Craid_rankings';

const charDataUrl = `https://raider.io/api/v1/characters/profile?region=us&realm=area%2052&name=`;

const Home = () => {
  const [raidProgressData, setRaidProgressData] = useState([]);
  const [guildRosterData, setGuildRosterData] = useState([]);

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
        setRaidProgressData(raidData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    let charData = [];
    let promises = [];

    raidRoster.forEach((member) => {
      promises.push(
        axios
          .get(`${charDataUrl}${member.characterName}`)
          .then((res) => {
            charData.push({
              displayName: member.displayName,
              charName: res.data.name,
              className: res.data.class,
              charImg: res.data.thumbnail_url,
              charRole: res.data.active_spec_role,
            });
          })
          .catch((err) => {
            console.error(err);
          })
      );
    });

    Promise.all(promises).then(() => {
      setGuildRosterData(charData);
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

  raidProgressData.map((raid, index) => {
    console.log(raid, index);
    return true;
  });

  return (
    <div className='home-container'>
      <div className='progress-container'>
        <h1>Raid Progress</h1>
        {raidProgressData.map((raid, index) => (
          <div
            key={index}
            className='raid-card'
            style={{
              backgroundImage: `url(${raids[index].img})`,
              backgroundSize: 'cover',
            }}
          >
            <div className='card-text'>
              <h3>{raids[index].display}</h3>
              <p>{raid.progress || '0'}</p>
            </div>
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
          </div>
        ))}
      </div>
      <div className='recruiting-container'>
        <h1>Recruiting</h1>
        <div className='recruiting-icons'>
          {needSpec.map(({ name, recruitng, img }, index) => (
            <img
              key={index}
              src={images[img].default}
              alt='spec icon'
              title={name}
            />
          ))}
        </div>
      </div>
      <div className='previous-progress-container'>
        <h1>Previous Tiers</h1>
        <table>
          <thead>
            <tr>
              <th colSpan='1' className='first-th'>
                Raid
              </th>
              <th colSpan='1'>Region</th>
              <th colSpan='1'>Realm</th>
            </tr>
          </thead>
          <tbody>
            {previousRaids.map(({ raidName, regionRank, realmRank }, index) => (
              <tr key={index}>
                <td className='raid-label'>{raidName}</td>
                <td>{regionRank}</td>
                <td>{realmRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='roster-container'>
        <h1>Raid Team</h1>
        <div className='character-cards'>
          {guildRosterData.map((member, index) => (
            <div key={index} className='character-card'>
              <h4 className={classLabels[0][member.className]}>
                {member.displayName}
              </h4>
              <a
                href={`https://www.warcraftlogs.com/character/us/area-52/${member.charName}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src={member.charImg} alt='character portrait' />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
