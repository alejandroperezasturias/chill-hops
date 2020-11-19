import { useContext } from 'react';
import { MusicContext } from '../App.js';

export default function SongThumbnail({ song, index, highLightSelectedSong }) {
	const { handleChooseSong } = useContext(MusicContext);
	return (
		<section>
			<div
				onClick={() => {
					handleChooseSong(song.id, index);
				}}
				className={
					highLightSelectedSong
						? 'container song-thumbnail active flex  gap-small  bg-dark'
						: 'container song-thumbnail  flex  gap-small  bg-dark'
				}
			>
				<div className={'song-image'}>
					<img className={'vynil'} src={song.cover}></img>
				</div>
				<div className="song-info flow-content flow-content--small">
					<h1>{highLightSelectedSong ? 'Now Playing' : ''}</h1>
					<h1 className={'text-accent'}>{song.name}</h1>
					<p>{song.artist}</p>
				</div>
			</div>
		</section>
	);
}
