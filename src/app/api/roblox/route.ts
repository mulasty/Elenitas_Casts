import { NextResponse } from "next/server";
import type { RobloxAvatarResponse, RobloxGame } from "@/lib/roblox";

const USER_ID = 8278538697;
const AVATAR_BASE = "https://avatar.roblox.com";
const FRIENDS_BASE = "https://friends.roblox.com";
const GAMES_BASE = "https://games.roblox.com";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
  try {
    const [avatarRes, friendsRes, gamesRes] = await Promise.allSettled([
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

    return NextResponse.json({
      avatar,
      friendsCount,
      favoriteGames,
    });
  } catch {
    return NextResponse.json(
      {
        avatar: null,
        friendsCount: 41,
        favoriteGames: [],
      },
      { status: 200 }
    );
  }
}
