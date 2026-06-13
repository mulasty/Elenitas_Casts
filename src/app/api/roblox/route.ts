import { NextResponse } from "next/server";
import type { RobloxAvatarResponse, RobloxGame } from "@/lib/roblox";

const USER_ID = 8278538697;
const AVATAR_BASE = "https://avatar.roblox.com";
const FRIENDS_BASE = "https://friends.roblox.com";
const GAMES_BASE = "https://games.roblox.com";
const THUMBNAILS_BASE = "https://thumbnails.roblox.com";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
  try {
    const [avatarRes, friendsRes, gamesRes, headshotRes] = await Promise.allSettled([
      fetch(`${AVATAR_BASE}/v1/users/${USER_ID}/avatar`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 300 },
      }),
      fetch(`${FRIENDS_BASE}/v1/users/${USER_ID}/friends/count`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 300 },
      }),
      fetch(
        `${GAMES_BASE}/v2/users/${USER_ID}/favorite/games?accessFilter=All&limit=10`,
        {
          headers: { Accept: "application/json" },
          next: { revalidate: 300 },
        }
      ),
      fetch(
        `${THUMBNAILS_BASE}/v1/users/avatar-headshot?userIds=${USER_ID}&size=420x420&format=Png`,
        {
          headers: { Accept: "application/json" },
          next: { revalidate: 300 },
        }
      ),
    ]);

    const avatar: RobloxAvatarResponse | null =
      avatarRes.status === "fulfilled" && avatarRes.value.ok
        ? await avatarRes.value.json()
        : null;

    const friendsCount: number =
      friendsRes.status === "fulfilled" && friendsRes.value.ok
        ? (await friendsRes.value.json()).count
        : 41;

    const favoriteGames: RobloxGame[] =
      gamesRes.status === "fulfilled" && gamesRes.value.ok
        ? (await gamesRes.value.json()).data
        : [];

    let headshotUrl: string | null = null;
    if (headshotRes.status === "fulfilled" && headshotRes.value.ok) {
      const headshotData = await headshotRes.value.json();
      headshotUrl = headshotData.data?.[0]?.imageUrl || null;
    }

    return NextResponse.json({
      avatar,
      friendsCount,
      favoriteGames,
      headshotUrl,
    });
  } catch {
    return NextResponse.json(
      {
        avatar: null,
        friendsCount: 41,
        favoriteGames: [],
        headshotUrl: null,
      },
      { status: 200 }
    );
  }
}
