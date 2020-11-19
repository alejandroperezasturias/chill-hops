import Data from './data';
import React, { useState, useEffect } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import './styles/App.css';
import SongList from './components/SongList';
import Nav from './components/Nav';
export const MusicContext = React.createContext({});

function App() {
	const [songs, setSongs] = useState(
		Data().map((song) => {
			return { ...song, audio: new Audio(song.audio) };
		})
	);
	const [playing, setPlaying] = useState(false);
	const [playedSong, setPlayedSong] = useState(0);
	const [nextSong, setNextSong] = useState(1);
	const [beforeSong, setBeforeSong] = useState(5);
	const [toogleSideBar, setToogleSideBar] = useState(false);
	const [highLightSelectedSong, setHighLightSelectedSong] = useState(false);

	const nowPLaying = songs[playedSong];
	const nextPlaying = songs[nextSong];
	const beforePlaying = songs[beforeSong];

	// Play Music
	useEffect(() => {
		playing ? songs[playedSong].audio.play() : songs[playedSong].audio.pause();
	}, [playing, playedSong]);

	// Handle Play Music
	function handlePlaying() {
		setPlaying(!playing);
	}

	// Pick song from list
	function handleChooseSong(id, index) {
		songs[playedSong].audio.pause();
		setPlayedSong(songs.findIndex((song) => song.id === id));

		if (playedSong === index) {
			setHighLightSelectedSong(!highLightSelectedSong);
		}
	}

	//  Refactor these lines of code using the % operator

	// Skip Forward
	const handleSkipForward = async () => {
		songs[playedSong].audio.pause();
		await setPlayedSong((currentSong) => {
			return (currentSong + 1) % songs.length;
		});
		setNextSong((currentNextSong) => {
			return (currentNextSong + 1) % songs.length;
		});
		setBeforeSong((currentBeforeSong) => {
			return (currentBeforeSong + 1) % songs.length;
		});
	};

	useEffect(() => {
		console.log(6 % 6);
		console.log(
			`My number is ${playedSong} modulus by ${songs.length} and we get ${
				playedSong % songs.length
			}`
		);
	}, [playedSong]);

	// Skip Backwards
	const handleSkipBack = async () => {
		songs[playedSong].audio.pause();

		if (
			(playedSong - 1) % songs.length === -1 ||
			(beforeSong - 1) % songs.length === -1
		) {
			await setPlayedSong(() => {
				return songs.length - 1;
			});

			setBeforeSong(() => {
				return songs.length - 2;
			});

			setNextSong(0);

			return;
		}
		await setPlayedSong((currentSong) => {
			return currentSong - 1;
		});

		setBeforeSong((beforeSong) => {
			return beforeSong - 1;
		});

		setNextSong(() => {
			return beforeSong + 1;
		});
	};

	const musicContextValue = {
		handlePlaying,
		playing,
		handleSkipForward,
		nowPLaying,
		playedSong,
		songs,
		setToogleSideBar,
		toogleSideBar,
		handleChooseSong,
		highLightSelectedSong,
		handleSkipBack,
		nextPlaying,
		beforePlaying,
	};

	return (
		<MusicContext.Provider value={musicContextValue}>
			<div className="App">
				<div>
					<div
						className={
							toogleSideBar
								? 'main flow-content flow-content--large animate-player'
								: 'main flow-content flow-content--large'
						}
					>
						<Nav />
						<Song />
						<Player />
					</div>
					<SongList />
				</div>
			</div>
		</MusicContext.Provider>
	);
}

export default App;
