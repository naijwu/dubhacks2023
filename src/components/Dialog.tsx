import React from 'react'
import { Canvas } from 'react-three-fiber';
import styles from "./Landing.module.css";
import { PerspectiveCamera } from '@react-three/drei';
import SpeechBubbles from './SpeechBubbles';
import { extend } from '@react-three/fiber'

const Dialog = () => {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <Canvas 
                    className={styles.animation}
                    onCreated={({ gl }) => {
                    gl.domElement.style.touchAction = 'auto';
                    gl.domElement.style.userSelect = 'auto';
                    }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} rotation={[0, 0, 0]} />
                    {/* <Penguin scale={0.005}/> */}
                    <SpeechBubbles scale={0.035}/>
                    {/* <PenguinBBQ/> */}
                    {/* <OrbitControls/> */}
                </Canvas>
            </div>
        </div>
    )
}

export default Dialog
