import { useContext, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MusicContext } from '../App.js';

export default function Nav() {
	const { setToogleSideBar, toogleSideBar } = useContext(MusicContext);
	return (
		<div className="container nav flex space-between bg-light">
			<h1 className="text-accent">Chill And Hops</h1>
			<div
				className={'menu flex columns'}
				onClick={() => setToogleSideBar(!toogleSideBar)}
			>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
