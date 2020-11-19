import { useContext, useEffect } from 'react';
import { MusicContext } from '../App.js';

export default function Song({}) {
	const { nowPLaying, playing, nextPlaying, beforePlaying } = useContext(
		MusicContext
	);

	return (
		<section>
			<div className="container song flex columns flow-content flow-content--large bg-light">
				<div className={'song-image flex gap-very-small'}>
					<img className={'vynil vynil-small'} src={beforePlaying.cover}></img>
					<img
						className={playing ? 'vynil spin' : 'vynil'}
						src={nowPLaying.cover}
					></img>
					<img className={'vynil vynil-small'} src={nextPlaying.cover}></img>
				</div>
				<div className="song-info">
					<h1 className={'text-accent'}>{nowPLaying.name}</h1>
					<p>{nowPLaying.artist}</p>
				</div>
			</div>
		</section>
	);
}
