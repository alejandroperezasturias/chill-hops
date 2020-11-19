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

	const nowPLaying = songs[playedSong];
	const nextPlaying = songs[nextSong];
	const beforePlaying = songs[beforeSong];

	// Facilitate sound skipping
	// Facilitate Plug & Play New Songs to our list
	useEffect(() => {
		let songSkipping = songs;
		songSkipping = songSkipping.map((song, index) => {
			if (index === 0) {
				return {
					...song,
					previousSong: songSkipping.length - 1,
					nextSong: 1,
				};
			} else if (index === songSkipping.length - 1) {
				return { ...song, previousSong: index - 1, nextSong: 0 };
			} else {
				return { ...song, previousSong: index - 1, nextSong: index + 1 };
			}
		});
		setSongs(songSkipping);
	}, []);

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
		// Adjust Now Playing Song
		setPlayedSong(songs.findIndex((song) => song.id === id));
		// Adjust Next Song Thumbnail
		setNextSong(() => {
			return songs.find((song) => song.id === id).nextSong;
		});
		// Adjust Previous Song Thumbnail
		setBeforeSong(() => {
			return songs.find((song) => song.id === id).previousSong;
		});
	}

	// Skip Forward
	const handleSkipForward = async () => {
		songs[playedSong].audio.pause();
		// Adjust Now Playing Song
		await setPlayedSong(() => {
			return nowPLaying.nextSong;
		});
		// Adjust Next Song Thumbnail
		setNextSong((currentNextSong) => {
			return songs[currentNextSong].nextSong;
		});
		// Adjust Previous Song Thumbnail
		setBeforeSong((currentBeforeSong) => {
			return songs[currentBeforeSong].nextSong;
		});
	};

	// Skip Backwards
	const handleSkipBack = async () => {
		songs[playedSong].audio.pause();
		// Adjust the current song
		await setPlayedSong(() => {
			return nowPLaying.previousSong;
		});
		// Adjust Next Song Thumbnail
		setNextSong((currentNextSong) => {
			return songs[currentNextSong].previousSong;
		});
		// Adjust Previous Song Thumbnail
		setBeforeSong((currentBeforeSong) => {
			return songs[currentBeforeSong].previousSong;
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
