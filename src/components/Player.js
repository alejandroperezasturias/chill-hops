import { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleRight,
	faAngleLeft,
	faPause,
} from '@fortawesome/free-solid-svg-icons';
import { MusicContext } from '../App.js';

export default function Player() {
	const {
		handlePlaying,
		playing,
		handleSkipForward,
		handleSkipBack,
		playedSong,
		songs,

	} = useContext(MusicContext);

	const [time, setTime] = useState({
		currentTime: 0,
		duration: 0,
	});

	useEffect(() => {
		// Load metadata wehn audio ready
		songs[playedSong].audio.addEventListener('loadedmetadata', (e) => {
			setTime({
				...time,
				currentTime: e.target.currentTime,
				duration: e.target.duration,
			});
		});
		// Load metadata when audio is running
		songs[playedSong].audio.addEventListener('timeupdate', (e) => {
			setTime({
				...time,
				currentTime: e.target.currentTime,
				duration: e.target.duration,
			});
		});
		// Change the song when finished
		songs[playedSong].audio.addEventListener('ended', (e) => {
			handleSkipForward()
		});
	}, [playedSong, songs]);

	const getTime = (x) => {
		return Math.floor(x / 60) + ':' + ('0' + Math.floor(x % 60)).slice(-2);
	};

	const getDuration = (x) => {
		return Math.floor(x / 60) + ':' + ('0' + Math.floor(x % 60)).slice(-2);
	};

	const handleDrag = (e) => {
		if (!playing){songs[playedSong].audio.currentTime = e.target.value;}
		if (playing) {
			songs[playedSong].audio.pause()
			songs[playedSong].audio.currentTime = e.target.value
			songs[playedSong].audio.play()}
	};

	return (
		<section className="bg-light">
			<div className={'container player flow-content flex columns'}>
				<div className="play-control flex center gap-big">
					<FontAwesomeIcon
						size={'2x'}
						icon={faAngleLeft}
						className={'btn'}
						onClick={handleSkipBack}
					/>
					{playing ? (
						<FontAwesomeIcon
							size={'2x'}
							icon={faPause}
							onClick={handlePlaying}
							className={'btn'}
						/>
					) : (
						<FontAwesomeIcon
							size={'2x'}
							icon={faPlay}
							onClick={handlePlaying}
							className={'btn'}
						/>
					)}
					<FontAwesomeIcon
						size={'2x'}
						icon={faAngleRight}
						onClick={handleSkipForward}
						className={'btn'}
					/>
				</div>
				<div className="time-control flex space-between gap-very-small">
					<span className={'time-in'}>{getTime(time.currentTime)}</span>
					<input
						value={time.currentTime}
						min={0}
						onChange={handleDrag}
						max={time.duration}
						type="range"
					></input>
					<span className={'time-remaining'}>{getDuration(time.duration)}</span>
				</div>
			</div>
		</section>
	);
}
