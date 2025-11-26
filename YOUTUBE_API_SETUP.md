# YouTube API Integration Guide

This guide will help you set up YouTube Data API v3 integration for real-time channel data.

## Why YouTube API Integration?

With the YouTube API configured, your website will:
- ✅ Display real-time subscriber counts, view counts, and video counts
- ✅ Automatically fetch and display your latest videos
- ✅ Show actual video thumbnails, titles, and descriptions
- ✅ Calculate accurate video durations and view counts
- ✅ Auto-categorize videos based on content
- ✅ Keep content fresh without manual updates

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "TOMO Academy Website")
4. Click "Create"

### 2. Enable YouTube Data API v3

1. In your project, go to "APIs & Services" → "Library"
2. Search for "YouTube Data API v3"
3. Click on it and press "Enable"

### 3. Create API Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key
4. (Optional but recommended) Click "Restrict Key":
   - Under "API restrictions", select "Restrict key"
   - Choose "YouTube Data API v3"
   - Under "Application restrictions", you can add your website domain
   - Click "Save"

### 4. Find Your YouTube Channel ID

**Method 1: From YouTube Studio**
1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Click on "Customization" → "Basic info"
3. Your Channel ID is displayed there

**Method 2: From Channel URL**
1. Go to your channel page
2. Click "About"
3. Click "Share channel" → "Copy channel ID"

**Method 3: From Channel URL**
If your URL is `youtube.com/@TOMOACADEMY`, you'll need to:
1. View page source (Right-click → View Page Source)
2. Search for "channelId"
3. Copy the ID (format: UC... with 24 characters)

### 5. Configure Environment Variables

1. In your project root, copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your keys:
   ```env
   VITE_YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxx
   ```

3. Save the file

**Important:** Never commit `.env.local` to git! It's already in `.gitignore`.

### 6. Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

3. Check the browser console for any errors

4. You should see:
   - Real subscriber counts
   - Latest videos with thumbnails
   - Accurate view counts
   - Proper video durations

## API Features Implemented

### Channel Statistics
- Subscriber count
- Total view count
- Total video count
- Channel title and description

### Video Data
- Latest 12 videos (configurable)
- Video titles and descriptions
- View counts
- Durations (formatted from ISO 8601)
- Thumbnails (high quality)
- Published dates
- Automatic categorization

### Smart Categorization
Videos are automatically categorized based on keywords:
- **Programming**: "programming", "language", "c", "code"
- **Statistics**: "statistics", "probability", "frequency", "histogram", "ogive", "polygon"
- **Visualization**: "visualization", "chart", "data", "dimension", "measure"
- **General**: Everything else

## API Quota Information

YouTube Data API v3 has daily quotas:
- **Default quota**: 10,000 units per day
- **Our usage per page load**: ~3-5 units
- **Estimated page loads**: 2,000-3,000 per day

### Cost breakdown:
- Channel statistics request: 1 unit
- Playlist items request: 1 unit
- Video details request: 1 unit per video

### Optimization Tips:
1. **Implement caching** - Cache API responses for 5-10 minutes
2. **Use fallback data** - Already implemented for offline/error scenarios
3. **Request only what you need** - We only fetch 12 videos max

## Troubleshooting

### "API key not valid" error
- Check if the API key is correctly copied
- Ensure YouTube Data API v3 is enabled
- Check API key restrictions (domain, referrer)

### "Channel not found" error
- Verify your Channel ID is correct (24 characters starting with UC)
- Make sure the channel is public
- Try using the channel ID instead of custom URL

### No videos showing
- Check if channel has public videos
- Verify the uploads playlist is accessible
- Check browser console for specific errors

### CORS errors
- This shouldn't happen with YouTube API
- If it does, check your API key restrictions
- Ensure you're using VITE_ prefix for environment variables

### Quota exceeded
- Wait until quota resets (daily at midnight Pacific Time)
- Consider implementing caching
- Reduce the number of videos fetched

## Advanced Configuration

### Fetch More Videos
In `services/youtube.ts`, change the `maxResults` parameter:
```typescript
await fetchChannelVideos(20) // Fetch 20 videos instead of 12
```

### Custom Categorization
Edit the `categorizeVideo` function in `services/youtube.ts` to add your own keywords.

### Caching Implementation
Consider adding browser localStorage caching:
```typescript
// Example caching logic
const CACHE_KEY = 'youtube_data';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Before fetching, check cache
const cached = localStorage.getItem(CACHE_KEY);
if (cached) {
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp < CACHE_DURATION) {
    return data;
  }
}

// After fetching, save to cache
localStorage.setItem(CACHE_KEY, JSON.stringify({
  data: response,
  timestamp: Date.now()
}));
```

## Security Best Practices

1. **Never commit API keys** - Always use environment variables
2. **Restrict API keys** - Add domain restrictions in Google Cloud Console
3. **Monitor usage** - Check quota usage regularly
4. **Use HTTPS** - Always deploy to HTTPS sites
5. **Keep keys secret** - Don't share API keys in screenshots or documentation

## Additional Resources

- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [API Quota Calculator](https://developers.google.com/youtube/v3/determine_quota_cost)
- [Google Cloud Console](https://console.cloud.google.com/)
- [YouTube API Code Samples](https://developers.google.com/youtube/v3/code_samples)

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify API keys and Channel ID
3. Test API calls directly in [API Explorer](https://developers.google.com/youtube/v3/docs/)
4. Check Google Cloud Console for quota usage

---

**Happy coding! Your website now has live YouTube integration! 🎉**
