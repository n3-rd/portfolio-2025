# Immich Integration Setup

This project is configured to fetch photos from your self-hosted Immich instance instead of using local files.

## Prerequisites

1. **Running Immich Instance**: You need a running Immich server (self-hosted)
2. **API Key**: Generate an API key from your Immich dashboard

## Configuration

### 1. Create Environment Variables

Create a `.env` file in your project root with:

```bash
# Immich Configuration
IMMICH_HOST=http://your-immich-host:2283
IMMICH_API_KEY=your_immich_api_key_here

# Optional: Specific album ID for portfolio photos
PORTFOLIO_ALBUM_ID=your_album_id_here
```

### 2. Get Your API Key

1. Open your Immich web interface
2. Go to **Account Settings** → **API Keys**
3. Click **Create API Key**
4. Copy the generated key to your `.env` file

### 3. Optional: Use Specific Album

If you want to display photos from a specific album instead of all photos:

1. Create or find your desired album in Immich
2. Copy the album ID from the URL (e.g., `albums/{album-id}`)
3. Modify the server code to use `getAlbumPhotos(albumId)` instead of `getAllPhotos()`

## Available Functions

The photography server provides three functions:

### `getAllPhotos()`
Fetches all images from your Immich instance.

### `getAlbumPhotos(albumId: string)`
Fetches images from a specific album.

### `getRandomPhotos(count: number)`
Fetches random images using Immich's `/api/assets/random` endpoint.

## Usage Examples

### Use Random Photos (Recommended for Portfolio)
Update `src/routes/photography/+page.server.ts`:

```typescript
import { getRandomPhotos } from "$lib/server/photography";

export async function load() {
    const photos = await getRandomPhotos(12); // Get 12 random photos
    return { photos };
}
```

### Use Specific Album
```typescript
import { getAlbumPhotos } from "$lib/server/photography";

export async function load() {
    const albumId = process.env.PORTFOLIO_ALBUM_ID || '';
    const photos = await getAlbumPhotos(albumId);
    return { photos };
}
```

## Image Sizes

The integration uses Immich's thumbnail system:
- **Preview size**: `?size=preview` - Good for gallery views
- **Thumbnail size**: `?size=thumbnail` - Smaller, faster loading
- **Original**: Direct asset URL for full resolution

## Troubleshooting

### No Photos Displaying
1. Check your `.env` file configuration
2. Verify your Immich instance is accessible
3. Ensure your API key has proper permissions
4. Check the browser console for error messages

### CORS Issues
If running Immich on a different domain, you may need to configure CORS settings in your Immich instance.

### Performance
- Use `getRandomPhotos()` for better performance on large libraries
- Consider implementing pagination for very large photo collections
- The current setup uses preview-sized images for optimal loading

## Security Notes

- Keep your API key secure and never commit it to version control
- Use environment variables for all sensitive configuration
- Consider setting up proper authentication if exposing this publicly 