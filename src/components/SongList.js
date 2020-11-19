import { useContext } from 'react';
import { MusicContext } from '../App.js';
import SongThumbnail from './SongThumbnail';

export default function SongList({}) {
	const { songs, toogleSideBar, setToogleSideBar, playedSong } = useContext(
		MusicContext
	);

	return (
		<section
			className={
				toogleSideBar ? 'bg-dark sidebar sidebar-active' : 'bg-dark sidebar'
			}
		>
			<div className={'flex columns gap-small'}>
				<button
					className={'btn btn-close'}
					onClick={() => setToogleSideBar(!toogleSideBar)}
				>
					<span>&times;</span>
				</button>
				{songs.map((song, index) => {
					if (index === playedSong) {
						return (
							<SongThumbnail
								key={song.id}
								song={song}
								index={index}
								highLightSelectedSong={true}
							/>
						);
					} else {
						return (
							<SongThumbnail
								key={song.id}
								song={song}
								index={index}
								highLightSelectedSong={false}
							/>
						);
					}
				})}
			</div>
		</section>
	);
}
