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
import evokerIcon from '../images/class-evoker.png';
import questionIcon from '../images/class-unknown.png';
import streamsJSON from '../config/streams.json';
import ReactPlayer from 'react-player';

const Streams = () => {
	return (
		<div className="stream-container">
			<ul>
				{streamsJSON.map(
					(
						{
							twitchName,
							displayName,
							role,
							charClass,
						},
						index
					) => (
						<li key={index}>
							<div className="stream-window">
								<ReactPlayer
									title={twitchName}
									className="react-player"
									url={`https://twitch.tv/${twitchName}`}
									width="100%"
									height="240px"
									config={{
										options: {
											parent: [
												'localhost',
												'staymad.netlify.app',
											],
											allowfullscreen: true,
											autoplay: false,
											muted: true,
											theme: 'dark',
										},
									}}
								/>
								<div className="stream-names">
									<img
										className="role-icons"
										src={
											role === 'tank'
												? tankIcon
												: role === 'dps'
												? dpsIcon
												: healerIcon
										}
										alt="tank role icon"
									/>
									<span>{displayName}</span>
									<img
										className="class-icons"
										src={
											charClass === 'dh'
												? dhIcon
												: charClass ===
												  'dk'
												? dkIcon
												: charClass ===
												  'druid'
												? druidIcon
												: charClass ===
												  'hunter'
												? hunterIcon
												: charClass ===
												  'mage'
												? mageIcon
												: charClass ===
												  'monk'
												? monkIcon
												: charClass ===
												  'paladin'
												? paladinIcon
												: charClass ===
												  'priest'
												? priestIcon
												: charClass ===
												  'rogue'
												? rogueIcon
												: charClass ===
												  'shaman'
												? shamanIcon
												: charClass ===
												  'warlock'
												? warlockIcon
												: charClass ===
												  'warrior'
												? warriorIcon
												: charClass ===
												  'evoker'
												? evokerIcon
												: questionIcon
										}
										alt="class icon"
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
