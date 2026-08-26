/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  OrbitControls,
  Stage,
  ContactShadows,
  Environment,
  Preload
} from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  materials?: Record<string, string>; // materialName -> hexColor
  autoRotate?: boolean;
}

function ShoeModel({ url, materials, autoRotate = true }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const { scene } = useGLTF(url);

  // Apply material overrides if provided
  useEffect(() => {
    if (materials && scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // If the material name is in our config, apply the color
          if (child.material.name && materials[child.material.name]) {
            child.material = child.material.clone();
            child.material.color.set(materials[child.material.name]);
          }
        }
      });
    }
  }, [materials, scene]);

  useFrame((state, delta) => {
    if (autoRotate && group.current) {
      timeRef.current += delta;
      const t = timeRef.current;
      group.current.rotation.y = Math.sin(t / 4) / 4;
      group.current.position.y = Math.sin(t / 1.5) / 10;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

// Fallback loader
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  );
}

export interface Shoe3DViewerProps {
  modelUrl?: string;
  materialConfig?: Record<string, string>;
  className?: string;
  fallbackImage?: string;
  autoRotate?: boolean;
}

export function Shoe3DViewer({
  modelUrl,
  materialConfig,
  className = '',
  fallbackImage,
  autoRotate = true
}: Shoe3DViewerProps) {
  // Default placeholder if none provided
  const placeholderUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb';
  const urlToLoad = modelUrl || placeholderUrl;

  // If fallback logic is needed later, we could handle onError of a model loader
  // For now, always try to load the 3D model.

  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <Suspense fallback={<Loader />}>
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/modern_buildings_2_4k.hdr" background={true} blur={0} />
          <Stage environment="city" intensity={0.5}>
            <ShoeModel 
              url={urlToLoad} 
              materials={materialConfig} 
              autoRotate={autoRotate}
            />
          </Stage>
          <ContactShadows position={[0, -0.8, 0]} opacity={0.5} scale={10} blur={2} far={4} />
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
