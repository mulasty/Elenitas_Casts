"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getRobloxColor } from "@/lib/roblox";

interface ElenitaCharacter3DProps {
  animation?: "idle" | "wave" | "point" | "bounce";
  bodyColorId?: number;
  scale?: number;
  position?: [number, number, number];
  headshotUrl?: string | null;
}

const HAIR_COLOR = "#6B4226";
const SHIRT_COLOR = "#FFB7B2";
const PANTS_COLOR = "#FFF44F";
const GLASSES_COLOR = "#333333";
const PURSE_COLOR = "#B5EAD7";

function CharacterPart({
  position,
  size,
  color,
  rotation,
  emissive,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  rotation?: [number, number, number];
  emissive?: string;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive || color}
        emissiveIntensity={emissive ? 0.3 : 0}
      />
    </mesh>
  );
}

function AvatarFace({ url }: { url: string }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      },
      undefined,
      () => {}
    );
  }, [url]);

  if (!texture) return null;

  return (
    <mesh position={[0, 2.4, 0.38]} scale={[0.78, 0.73, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}

export default function ElenitaCharacter3D({
  animation = "idle",
  bodyColorId = 352,
  scale = 1,
  position = [0, 0, 0],
  headshotUrl = null,
}: ElenitaCharacter3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const skinColor = useMemo(() => getRobloxColor(bodyColorId), [bodyColorId]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;

    const t = timeRef.current;
    const s = scale;
    const group = groupRef.current;

    if (animation === "idle") {
      group.position.y = position[1] + Math.sin(t * 1.5) * 0.15 * s;
      group.rotation.z = Math.sin(t * 0.8) * 0.03;

      if (headRef.current) {
        headRef.current.rotation.z = Math.sin(t * 1.2) * 0.05;
        headRef.current.rotation.x = Math.sin(t * 0.9 + 1) * 0.03;
      }

      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(t * 1.3) * 0.15;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = Math.sin(t * 1.3 + Math.PI) * 0.15;
      }
    } else if (animation === "wave") {
      group.position.y = position[1] + Math.sin(t * 2.5) * 0.1 * s;

      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -1.2 + Math.sin(t * 4) * 0.6;
        rightArmRef.current.rotation.x = -0.3;
      }
      if (headRef.current) {
        headRef.current.rotation.z = Math.sin(t * 1.5) * 0.08;
      }
    } else if (animation === "point") {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -0.8;
        rightArmRef.current.rotation.x = -0.5;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = 0.3;
      }
      if (headRef.current) {
        headRef.current.rotation.y = 0.2;
        headRef.current.rotation.x = -0.1;
      }
    } else if (animation === "bounce") {
      const bounceY = Math.abs(Math.sin(t * 3)) * 0.5 * s;
      group.position.y = position[1] + bounceY;
      group.rotation.z = Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Body & Head group */}
      <group ref={headRef}>
        {/* Head */}
        <CharacterPart
          position={[0, 2.4, 0]}
          size={[0.9, 0.85, 0.75]}
          color={skinColor}
        />

        {/* Hair - main */}
        <CharacterPart
          position={[0, 2.7, 0.1]}
          size={[0.95, 0.4, 0.8]}
          color={HAIR_COLOR}
        />
        {/* Hair - sides */}
        <CharacterPart
          position={[0.35, 2.35, 0]}
          size={[0.22, 0.65, 0.55]}
          color={HAIR_COLOR}
        />
        <CharacterPart
          position={[-0.35, 2.35, 0]}
          size={[0.22, 0.65, 0.55]}
          color={HAIR_COLOR}
        />
        {/* Hair - back */}
        <CharacterPart
          position={[0, 2.3, -0.3]}
          size={[0.8, 0.55, 0.2]}
          color={HAIR_COLOR}
        />

        {/* Glasses */}
        <CharacterPart
          position={[0.2, 2.5, 0.4]}
          size={[0.25, 0.15, 0.05]}
          color={GLASSES_COLOR}
        />
        <CharacterPart
          position={[-0.2, 2.5, 0.4]}
          size={[0.25, 0.15, 0.05]}
          color={GLASSES_COLOR}
        />
        <CharacterPart
          position={[0, 2.48, 0.4]}
          size={[0.1, 0.05, 0.05]}
          color={GLASSES_COLOR}
        />

        {/* Real face from Roblox headshot */}
        {headshotUrl ? (
          <AvatarFace url={headshotUrl} />
        ) : (
          <>
            {/* Eyes */}
            <CharacterPart
              position={[0.2, 2.49, 0.39]}
              size={[0.12, 0.08, 0.02]}
              color="#FFFFFF"
            />
            <CharacterPart
              position={[-0.2, 2.49, 0.39]}
              size={[0.12, 0.08, 0.02]}
              color="#FFFFFF"
            />
            {/* Mouth */}
            <CharacterPart
              position={[0, 2.22, 0.4]}
              size={[0.2, 0.04, 0.02]}
              color="#D4898F"
            />
          </>
        )}
      </group>

      {/* Torso (Woman shape) */}
      <CharacterPart
        position={[0, 1.4, 0]}
        size={[0.75, 1.0, 0.45]}
        color={SHIRT_COLOR}
      />
      {/* Shirt detail */}
      <CharacterPart
        position={[0, 1.6, 0.24]}
        size={[0.4, 0.35, 0.02]}
        color={skinColor}
        emissive={skinColor}
      />

      {/* Purse */}
      <CharacterPart
        position={[0.25, 1.1, 0.3]}
        size={[0.2, 0.25, 0.15]}
        color={PURSE_COLOR}
      />

      {/* Pants / Legs */}
      <CharacterPart
        position={[0, 0.75, 0]}
        size={[0.65, 0.35, 0.4]}
        color={PANTS_COLOR}
      />

      {/* Left Leg */}
      <CharacterPart
        position={[-0.18, 0.1, 0]}
        size={[0.22, 0.75, 0.25]}
        color={PANTS_COLOR}
      />

      {/* Right Leg */}
      <CharacterPart
        position={[0.18, 0.1, 0]}
        size={[0.22, 0.75, 0.25]}
        color={PANTS_COLOR}
      />

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.49, 1.5, 0]}>
        <CharacterPart
          position={[0, -0.3, 0]}
          size={[0.22, 0.75, 0.22]}
          color={skinColor}
        />
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.49, 1.5, 0]}>
        <CharacterPart
          position={[0, -0.3, 0]}
          size={[0.22, 0.75, 0.22]}
          color={skinColor}
        />
      </group>
    </group>
  );
}

export function ElenitaCharacterCanvas({
  animation = "idle",
  bodyColorId = 352,
  scale = 1,
  headshotUrl = null,
}: ElenitaCharacter3DProps) {
  return (
    <mesh>
      <ElenitaCharacter3D
        animation={animation}
        bodyColorId={bodyColorId}
        scale={scale}
        position={[0, -1.5, 0]}
        headshotUrl={headshotUrl}
      />
    </mesh>
  );
}
