import { NextResponse } from "next/server";

const YOUTUBE_CHANNEL_HANDLE = "@エレニータ";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "";

export const revalidate = 3600;

async function fetchFromYouTube(endpoint: string) {
  if (!YOUTUBE_API_KEY) {
    return null;
  }
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/${endpoint}&key=${YOUTUBE_API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function GET() {
  try {
    let subscriberCount: number | null = null;
    let latestVideos: Array<{ id: string; title: string; thumbnail: string }> =
      [];

    if (YOUTUBE_API_KEY) {
      const channelRes = await fetchFromYouTube(
        `channels?part=statistics&forHandle=${YOUTUBE_CHANNEL_HANDLE}`
      );
      if (channelRes?.items?.length > 0) {
        const channel = channelRes.items[0];
        subscriberCount = parseInt(channel.statistics.subscriberCount, 10);
        const channelId = channel.id;

        const videosRes = await fetchFromYouTube(
          `search?part=snippet&channelId=${channelId}&order=date&maxResults=6&type=video`
        );
        if (videosRes?.items) {
          latestVideos = videosRes.items.map(
            (v: {
              id: { videoId: string };
              snippet: { title: string; thumbnails: { medium: { url: string } } };
            }) => ({
              id: v.id.videoId,
              title: v.snippet.title,
              thumbnail: v.snippet.thumbnails.medium.url,
            })
          );
        }
      }
    } else {
      const rssRes = await fetch(
        `https://www.youtube.com/feeds/videos.xml?user=@エレニータ`,
        { next: { revalidate: 3600 } }
      );
      if (rssRes.ok) {
        const text = await rssRes.text();
        const idMatches = text.match(/<yt:videoId>([^<]+)<\/yt:videoId>/g);
        const titleMatches = text.match(
          /<media:title>([^<]+)<\/media:title>/g
        );
        if (idMatches && titleMatches) {
          latestVideos = idMatches.slice(0, 6).map((id, i) => ({
            id: id.replace(/<\/?yt:videoId>/g, ""),
            title: (titleMatches[i] || "")
              .replace(/<\/?media:title>/g, ""),
            thumbnail: "",
          }));
        }
      }
    }

    return NextResponse.json({
      subscriberCount: subscriberCount || 15243,
      latestVideos,
    });
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json({
      subscriberCount: 15243,
      latestVideos: [],
    });
  }
}
