export const ROBLOX_USER_ID = 8278538697;

export interface RobloxAvatarAsset {
  id: number;
  name: string;
  assetType: { id: number; name: string };
  currentVersionId: number;
  meta?: Record<string, unknown>;
}

export interface RobloxAvatarResponse {
  scales: {
    height: number;
    width: number;
    head: number;
    depth: number;
    proportion: number;
    bodyType: number;
  };
  playerAvatarType: string;
  bodyColors: {
    headColorId: number;
    torsoColorId: number;
    rightArmColorId: number;
    leftArmColorId: number;
    rightLegColorId: number;
    leftLegColorId: number;
  };
  assets: RobloxAvatarAsset[];
  emotes: { assetId: number; assetName: string; position: number }[];
}

export interface RobloxGame {
  id: number;
  name: string;
  description: string;
  creator: { id: number; type: string; name: string };
  rootPlace: { id: number; type: string };
  placeVisits: number;
  created: string;
  updated: string;
}

export interface RobloxProfileResponse {
  avatar: RobloxAvatarResponse;
  friendsCount: number;
  favoriteGames: RobloxGame[];
}

const ROBLOX_COLORS: Record<number, string> = {
  352: "#E2B1B0",
};

export function getRobloxColor(colorId: number): string {
  return ROBLOX_COLORS[colorId] || "#FFCC99";
}

export function formatVisits(visits: number): string {
  if (visits >= 1000000) return `${(visits / 1000000).toFixed(1)}M`;
  if (visits >= 1000) return `${(visits / 1000).toFixed(1)}K`;
  return String(visits);
}
