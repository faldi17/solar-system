import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {useRef, useEffect} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import BackgroundMusic from './components/BackgroundMusic';

const planets = [
	{
		name: 'Mercury',
		size: 18,
		distance: 60,
		rotationSpeed: 0.1,
		orbitSpeed: 0.5,
		color: 'gray',
	},
	{
		name: 'Venus',
		size: 27,
		distance: 105,
		rotationSpeed: 0.08,
		orbitSpeed: 0.4,
		color: 'yellow',
	},
	{
		name: 'Earth',
		size: 31.5,
		distance: 150,
		rotationSpeed: 0.06,
		orbitSpeed: 0.3,
		color: 'blue',
	},
	{
		name: 'Mars',
		size: 25.2,
		distance: 210,
		rotationSpeed: 0.05,
		orbitSpeed: 0.25,
		color: 'red',
	},
	{
		name: 'Jupiter',
		size: 63,
		distance: 300,
		rotationSpeed: 0.04,
		orbitSpeed: 0.2,
		color: 'orange',
	},
	{
		name: 'Saturn',
		size: 54,
		distance: 420,
		rotationSpeed: 0.035,
		orbitSpeed: 0.15,
		color: 'goldenrod',
	},
	{
		name: 'Uranus',
		size: 45,
		distance: 540,
		rotationSpeed: 0.03,
		orbitSpeed: 0.1,
		color: 'lightblue',
	},
	{
		name: 'Neptune',
		size: 40.5,
		distance: 660,
		rotationSpeed: 0.025,
		orbitSpeed: 0.08,
		color: 'darkblue',
	},
];

const Planet = ({size, distance, rotationSpeed, orbitSpeed, color}) => {
	const planetRef = useRef();
	const orbitRef = useRef();

	useFrame(({clock}) => {
		const t = clock.getElapsedTime();
		if (planetRef.current && orbitRef.current) {
			planetRef.current.rotation.y += rotationSpeed;
			orbitRef.current.position.x = Math.cos(t * orbitSpeed) * distance;
			orbitRef.current.position.z = Math.sin(t * orbitSpeed) * distance;
		}
	});

	return (
		<group ref={orbitRef}>
			<mesh ref={planetRef}>
				<sphereGeometry args={[size, 32, 32]} />
				<meshStandardMaterial color={color} />
			</mesh>
		</group>
	);
};

const Orbit = ({distance}) => {
	const points = [];
	for (let i = 0; i <= 100; i++) {
		const angle = (i / 100) * Math.PI * 2;
		points.push(
			new THREE.Vector3(
				Math.cos(angle) * distance,
				0,
				Math.sin(angle) * distance
			)
		);
	}

	const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

	return (
		<line geometry={lineGeometry}>
			<lineBasicMaterial attach='material' color='black' linewidth={2} />
		</line>
	);
};

const FullscreenCanvas = ({children}) => {
	useEffect(() => {
		document.body.style.margin = '0';
		document.body.style.overflow = 'hidden';
	}, []);

	return (
		<div style={{width: '100vw', height: '100vh'}}>
			<Canvas camera={{position: [0, 250, 600]}}>{children}</Canvas>
		</div>
	);
};

const Sun = () => (
	<mesh>
		<sphereGeometry args={[45, 64, 64]} />
		<meshStandardMaterial
			color='yellow'
			emissive='yellow'
			emissiveIntensity={2}
		/>
	</mesh>
);

export default function App() {
	return (
		<>
			<BackgroundMusic />
			<FullscreenCanvas>
				<ambientLight intensity={0.5} />
				<pointLight position={[0, 0, 0]} intensity={2} />
				<Sun />
				{planets.map((planet, index) => (
					<group key={index}>
						<Orbit distance={planet.distance} />
						<Planet {...planet} />
					</group>
				))}
				<OrbitControls />
			</FullscreenCanvas>
		</>
	);
}
