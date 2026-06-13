import { NextResponse } from "next/server";

const YOUTUBE_CHANNEL_ID = "UCxURVEh8UEwyS5KtyLLb0NA";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "";

export const revalidate = 3600;

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export async function GET() {
  try {
    let subscriberCount = 586;
    let viewCount = 239615;
    let videoCount = 443;
    let latestVideos: VideoItem[] = [];

    if (YOUTUBE_API_KEY) {
      const [channelRes, videosRes] = await Promise.all([
        fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
          { next: { revalidate: 3600 } }
        ),
        fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&order=date&maxResults=9&type=video&key=${YOUTUBE_API_KEY}`,
          { next: { revalidate: 3600 } }
        ),
      ]);

      if (channelRes.ok) {
        const channelData = await channelRes.json();
        if (channelData.items?.length > 0) {
          const stats = channelData.items[0].statistics;
          subscriberCount = parseInt(stats.subscriberCount, 10);
          viewCount = parseInt(stats.viewCount, 10);
          videoCount = parseInt(stats.videoCount, 10);
        }
      }

      if (videosRes.ok) {
        const videosData = await videosRes.json();
        if (videosData.items) {
          latestVideos = videosData.items.map(
            (v: {
              id: { videoId: string };
              snippet: {
                title: string;
                publishedAt: string;
                thumbnails: { medium: { url: string } };
              };
            }) => ({
              id: v.id.videoId,
              title: v.snippet.title,
              thumbnail: v.snippet.thumbnails.medium.url,
              publishedAt: v.snippet.publishedAt,
            })
          );
        }
      }
    }

    return NextResponse.json({
      stats: { subscriberCount, viewCount, videoCount },
      latestVideos,
    });
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json({
      stats: { subscriberCount: 586, viewCount: 239615, videoCount: 443 },
      latestVideos: [],
    });
  }
}
