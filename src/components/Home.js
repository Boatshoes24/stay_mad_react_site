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
      .get(raiderIOUrl, {
        validateStatus: function (status) {
          return status >= 200 && status < 300;
        },
      })
      .then((res) => {
        for (const [key, value] of Object.entries(res.data.raid_progression)) {
          if (key.includes('fated')) continue;
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
        if (err.response) {
          console.error(err.response.data);
          console.error(err.response.status);
          console.error(err.response.headers);
        } else if (err.request) {
          console.error(err.request);
        } else {
          console.error('Error', err.message);
        }
        console.error(err.config);
      });
  }, []);

  useEffect(() => {
    let charData = [];
    let promises = [];

    raidRoster.forEach((member) => {
      promises.push(
        axios
          .get(`${charDataUrl}${member.characterName}`, {
            validateStatus: function (status) {
              return status >= 200 && status < 300;
            },
          })
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
            if (err.response) {
              console.error(err.response.data);
              console.error(err.response.status);
              console.error(err.response.headers);
            } else if (err.request) {
              console.error(err.request);
            } else {
              console.error('Error', err.message);
            }
            console.error(err.config);
          })
      );
    });

    Promise.all(promises).then(() => {
      setGuildRosterData(charData);
    });
  }, []);

  const needSpec = {}
  classes.forEach((spec) => {
    if (!needSpec[spec.class] && spec.recruiting === true) 
      needSpec[spec.class] = []
    if (spec.recruiting === true)
      needSpec[spec.class].push([spec.name, spec.img, spec.class])
  })

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  }

  function FormatClassNames(className){
    const words = className.split("-")
    for(let i = 0; i < words.length; i++){
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ")
  }

  const images = importAll(
    require.context('../images', false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div className='home-container'>
      <div className='progress-container'>
        <h1>Raid Progress</h1>
        {raids.map(({ name, display, img }, index) => (
          raidProgressData.filter((raid) => raid.name === name).map((raid) => (
            <div
              key={index}
              className='raid-card'
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: '130% 110%',
                backgroundRepeat: 'no-repeat'
              }} >
              <div className='card-text'>
                <h3>{`${display}:`}<span className='highlight'>{` (${raid.progress || '0'})`}</span></h3>
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
          ))
        ))}
      </div>
      <div className='recruiting-container'>
        <h1>Recruiting</h1>
        <table className='raid-info-table'>
            <thead>
              <tr>
                <td className='header' colSpan={2}>Raid Schedule</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='column-1'>Tuesday</td>
                <td className='column-2'>9pm - 1am EST</td>
              </tr>
              <tr>
                <td className='column-1'>Thursday</td>
                <td className='column-2'>9pm - 1am EST</td>
              </tr>
              <tr>
                <td className='column-1'>Sunday</td>
                <td className='column-2'>9pm - 12am EST</td>
              </tr>
            </tbody>
        </table>
        <hr />
        {Object.keys(needSpec).length > 0 ?
          <table className='recruiting-table'>
          <tbody>
              {Object.keys(needSpec).map((key, idx) => (
                <tr key={idx}>
                  <td className={`${classLabels[0][FormatClassNames(key)]} column-1`}>{FormatClassNames(key)}</td>
                  <td className='column-2'>
                    {needSpec[key].map((data, index) => (
                      <img key={`${index}${data[0]}`} src={images[data[1]]} alt='spec icon' title={data[0]} />
                    ))}
                  </td>
                </tr>
              ))}
        </tbody>
        </table>
        : 
        <div className="recruiting-closed">
          <p>
            We are not looking for anything specific right now, but please don't hesitate to apply if you feel you are a strong candidate.
          </p>
        </div>}
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
