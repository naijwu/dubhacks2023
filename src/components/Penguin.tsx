/*
  Auto-generated by Spline
*/

import React, { useState } from 'react';
import useSpline from '@splinetool/r3f-spline'
import { OrthographicCamera } from '@react-three/drei'
import { useRef } from 'react';
import { useFrame } from 'react-three-fiber';


export default function Penguin({ ...props }) {

    const group = useRef();
    const [positionY, setPositionY] = useState(0);
    const amplitude = 0.1;
    const frequency = 20;

    useFrame(() => {
        if (group.current) {
          group.current.rotation.y += 0.002; // Adjust the rotation speed as needed
        //   group.current.rotation.y += 0.000; // Adjust the rotation speed as needed

            group.current.position.y = positionY + amplitude * Math.sin(frequency * group.current.rotation.y);
        }
      });

  const { nodes, materials } = useSpline('https://prod.spline.design/OejkXBqgHamF0hHE/scene.splinecode')
  return (
    <>
      {/* <color attach="background" args={['#74757a']} /> */}
      <group ref={group} {...props} dispose={null}>
        <scene name="Scene 1">
          <group name="Penguin">
            <group name="ChefHat" position={[0.83, 200.84, -35.76]}>
              <mesh
                name="Sphere 4"
                geometry={nodes['Sphere 4'].geometry}
                material={materials['Sphere 4 Material']}
                castShadow
                receiveShadow
                position={[-56.82, 13.01, 28.72]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.97, 1, 1]}
              />
              <mesh
                name="Sphere 3"
                geometry={nodes['Sphere 3'].geometry}
                material={materials['Sphere 3 Material']}
                castShadow
                receiveShadow
                position={[51.54, 14.08, -53.5]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                name="Sphere 2"
                geometry={nodes['Sphere 2'].geometry}
                material={materials['Sphere 2 Material']}
                castShadow
                receiveShadow
                position={[42.28, 19.38, 57.42]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                name="Sphere"
                geometry={nodes.Sphere.geometry}
                material={materials['Sphere Material']}
                castShadow
                receiveShadow
                position={[-46.02, 29, -46.33]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
              <mesh
                name="Cylinder"
                geometry={nodes.Cylinder.geometry}
                material={materials['Cylinder Material']}
                castShadow
                receiveShadow
                position={[-7.6, -33.18, -3.13]}
              />
            </group>
            <group name="Penguin 2" position={[0, -94.68, 3.03]}>
              <group name="Body" position={[3.59, 0, 0]}>
                <mesh
                  name="MainBody"
                  geometry={nodes.MainBody.geometry}
                  material={materials['MainBody Material']}
                  castShadow
                  receiveShadow
                  position={[-4.16, 33.76, -37.31]}
                />
                <mesh
                  name="WhiteBelly"
                  geometry={nodes.WhiteBelly.geometry}
                  material={materials['WhiteBelly Material']}
                  castShadow
                  receiveShadow
                  position={[0.81, -64.34, 11.09]}
                  rotation={[0.85, 0, 0]}
                  scale={1}
                />
              </group>
              <group name="Beak" position={[-8.17, 68.35, 103.51]}>
                <mesh
                  name="Sphere 31"
                  geometry={nodes['Sphere 31'].geometry}
                  material={materials['Sphere 31 Material']}
                  castShadow
                  receiveShadow
                  position={[0, 0.03, -0.28]}
                />
                <mesh
                  name="Sphere 21"
                  geometry={nodes['Sphere 21'].geometry}
                  material={materials['Sphere 21 Material']}
                  castShadow
                  receiveShadow
                  position={[0, 0.03, -0.28]}
                />
              </group>
              <group name="Feet" position={[-5.63, -165.38, -34.19]}>
                <mesh
                  name="Sphere 32"
                  geometry={nodes['Sphere 32'].geometry}
                  material={materials['Sphere 32 Material']}
                  castShadow
                  receiveShadow
                  position={[-99.4, 3.77, 0]}
                  rotation={[0, 0, -0.31]}
                />
                <mesh
                  name="Sphere 22"
                  geometry={nodes['Sphere 22'].geometry}
                  material={materials['Sphere 22 Material']}
                  castShadow
                  receiveShadow
                  position={[101.86, -7.69, 0]}
                  rotation={[0, 0, 0.2]}
                  scale={1}
                />
              </group>
              <group name="Arms" position={[0, -4.56, -39.23]}>
                <mesh
                  name="Cube 2"
                  geometry={nodes['Cube 2'].geometry}
                  material={materials['Cube 2 Material']}
                  castShadow
                  receiveShadow
                  position={[-168.24, 0.26, 17.62]}
                  rotation={[Math.PI, 0, 0.66]}
                />
                <mesh
                  name="Cube"
                  geometry={nodes.Cube.geometry}
                  material={materials['Cube Material']}
                  castShadow
                  receiveShadow
                  position={[164.23, -5.05, 17.62]}
                  rotation={[Math.PI, 0, -0.46]}
                />
              </group>
              <group name="Blush" position={[-14.19, 65.69, 107.41]}>
                <mesh
                  name="Ellipse 3"
                  geometry={nodes['Ellipse 3'].geometry}
                  material={materials['Ellipse 3 Material']}
                  castShadow
                  receiveShadow
                  position={[74.11, -4.52, -44.86]}
                  rotation={[-0.07, 0.51, 0.14]}
                  scale={1}
                />
                <mesh
                  name="Ellipse 2"
                  geometry={nodes['Ellipse 2'].geometry}
                  material={materials['Ellipse 2 Material']}
                  castShadow
                  receiveShadow
                  position={[-82.82, -3.15, -41.9]}
                  rotation={[0, -0.71, 0]}
                />
              </group>
              <group name="Eyes" position={[-21.03, 96.82, 111.27]} scale={[1, 0.99, 1]}>
                <mesh
                  name="Sphere 33"
                  geometry={nodes['Sphere 33'].geometry}
                  material={materials['Sphere 33 Material']}
                  castShadow
                  receiveShadow
                  position={[74.11, 5.24, -29.78]}
                />
                <mesh
                  name="Sphere 23"
                  geometry={nodes['Sphere 23'].geometry}
                  material={materials['Sphere 23 Material']}
                  castShadow
                  receiveShadow
                  position={[-55.98, 6.3, -40.14]}
                />
              </group>
            </group>
          </group>
          <directionalLight
            name="Directional Light"
            castShadow
            intensity={1.8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-10000}
            shadow-camera-far={100000}
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            position={[200, 718.52, 300]}
          />
          {/* <OrthographicCamera name="1" makeDefault={true} far={10000} near={-50000} /> */}
          <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" />
        </scene>
      </group>
    </>
  )
}
