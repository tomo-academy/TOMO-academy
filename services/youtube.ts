/**
 * YouTube API Service
 * Fetches real-time data from YouTube Data API v3
 */

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface VideoData {
  id: string;
  title: string;
  views: string;
  duration: string;
  thumbnail: string;
  category: string;
  featured: boolean;
  publishedAt: string;
  description: string;
  thumbnailUrl: string;
}

export interface ChannelStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  title: string;
  description: string;
  customUrl: string;
  thumbnailUrl: string;
}

/**
 * Format duration from ISO 8601 to readable format (e.g., "PT5M30S" -> "5:30")
 */
function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format view count to readable format (e.g., "1234" -> "1.2K views")
 */
function formatViewCount(count: string): string {
  const num = parseInt(count);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M views`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K views`;
  }
  return `${num} views`;
}

/**
 * Categorize video based on title keywords
 */
function categorizeVideo(title: string, description: string): string {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('programming') || text.includes('language') || text.includes(' c ') || text.includes('code')) {
    return 'Programming';
  }
  if (text.includes('statistics') || text.includes('probability') || text.includes('frequency') || 
      text.includes('histogram') || text.includes('ogive') || text.includes('polygon')) {
    return 'Statistics';
  }
  if (text.includes('visualization') || text.includes('chart') || text.includes('data') || 
      text.includes('dimension') || text.includes('measure')) {
    return 'Visualization';
  }
  return 'General';
}

/**
 * Fetch channel statistics
 */
export async function fetchChannelStats(): Promise<ChannelStats | null> {
  if (!API_KEY || !CHANNEL_ID) {
    console.warn('YouTube API key or Channel ID not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error('Channel not found');
    }

    const channel = data.items[0];
    const stats = channel.statistics;
    const snippet = channel.snippet;

    return {
      subscriberCount: stats.subscriberCount,
      viewCount: stats.viewCount,
      videoCount: stats.videoCount,
      title: snippet.title,
      description: snippet.description,
      customUrl: snippet.customUrl || '@TOMOACADEMY',
      thumbnailUrl: snippet.thumbnails?.high?.url || '',
    };
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    return null;
  }
}

/**
 * Fetch latest videos from the channel
 */
export async function fetchChannelVideos(maxResults: number = 12): Promise<VideoData[]> {
  if (!API_KEY || !CHANNEL_ID) {
    console.warn('YouTube API key or Channel ID not configured');
    return [];
  }

  try {
    // First, get the uploads playlist ID
    const channelResponse = await fetch(
      `${BASE_URL}/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
    );

    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.status}`);
    }

    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error('Uploads playlist not found');
    }

    // Get videos from the uploads playlist
    const playlistResponse = await fetch(
      `${BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${API_KEY}`
    );

    if (!playlistResponse.ok) {
      throw new Error(`YouTube API error: ${playlistResponse.status}`);
    }

    const playlistData = await playlistResponse.json();
    const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');

    // Get video details including duration and statistics
    const videosResponse = await fetch(
      `${BASE_URL}/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${API_KEY}`
    );

    if (!videosResponse.ok) {
      throw new Error(`YouTube API error: ${videosResponse.status}`);
    }

    const videosData = await videosResponse.json();

    // Transform the data
    const videos: VideoData[] = videosData.items.map((video: any, index: number) => {
      const snippet = video.snippet;
      const statistics = video.statistics;
      const contentDetails = video.contentDetails;
      const category = categorizeVideo(snippet.title, snippet.description);

      return {
        id: video.id,
        title: snippet.title,
        views: formatViewCount(statistics.viewCount),
        duration: formatDuration(contentDetails.duration),
        thumbnail: getThumbnailColor(category),
        category: category,
        featured: index < 2, // First 2 videos are featured
        publishedAt: snippet.publishedAt,
        description: snippet.description,
        thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || '',
      };
    });

    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

/**
 * Get thumbnail background color based on category
 */
function getThumbnailColor(category: string): string {
  switch (category) {
    case 'Programming':
      return 'bg-stone-900';
    case 'Statistics':
      return 'bg-[#C5A059]';
    case 'Visualization':
      return 'bg-stone-700';
    default:
      return 'bg-stone-600';
  }
}

/**
 * Format large numbers with K/M suffix
 */
export function formatNumber(num: number | string): string {
  const n = typeof num === 'string' ? parseInt(num) : num;
  
  if (n >= 1000000) {
    return `${(n / 1000000).toFixed(1)}M`;
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}K`;
  }
  return n.toString();
}

/**
 * Get video topics distribution
 */
export function getTopicsDistribution(videos: VideoData[]): { name: string; count: number; color: string }[] {
  const counts: Record<string, number> = {};
  
  videos.forEach(video => {
    counts[video.category] = (counts[video.category] || 0) + 1;
  });

  const topics = [
    { name: 'Statistics & Probability', key: 'Statistics', color: 'bg-stone-900' },
    { name: 'C Programming', key: 'Programming', color: 'bg-[#C5A059]' },
    { name: 'Data Visualization', key: 'Visualization', color: 'bg-stone-700' },
    { name: 'General Topics', key: 'General', color: 'bg-stone-600' },
  ];

  return topics.map(topic => ({
    name: topic.name,
    count: counts[topic.key] || 0,
    color: topic.color,
  })).filter(t => t.count > 0);
}
