import {useEffect} from 'react';

const BackgroundMusic = () => {
	useEffect(() => {
		const audio = new Audio('/audio.mp3');
		audio.loop = true;

		const playAudio = () => {
			audio
				.play()
				.catch(() =>
					document.addEventListener('click', playAudio, {once: true})
				);
		};

		playAudio();
	}, []);

	return null;
};

export default BackgroundMusic;
