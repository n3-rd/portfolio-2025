import type { PageServerLoad } from "../../routes/photography/$types";
import { IMMICH_API_KEY, IMMICH_HOST, PORTFOLIO_ALBUM_ID } from "$env/static/private";

// src/lib/server/photography.ts
export interface Photo {
    src: string;
    alt: string;
    id: string;
}

interface ImmichAsset {
    id: string;
    originalFileName: string;
    type: 'IMAGE' | 'VIDEO';
    // Add other fields as needed
}

interface ImmichAlbum {
    id: string;
    albumName: string;
    description: string;
    assets: ImmichAsset[];
    // Add other fields as needed
}

export async function getAllPhotos(): Promise<Photo[]> {
    
    if (!IMMICH_API_KEY) {
        console.warn('IMMICH_API_KEY not found, falling back to empty array');
        return [];
    }

    try {
        // Fetch album from Immich
        const response = await fetch(`${IMMICH_HOST}/api/albums/${PORTFOLIO_ALBUM_ID}`, {
            headers: {
                'x-api-key': IMMICH_API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.log(response)
            console.error('Failed to fetch from Immich:', response.status);
            return [];
        }

        const album: ImmichAlbum = await response.json();
        
        // Filter for images only and map to Photo interface
        return album.assets
            .filter(asset => asset.type === 'IMAGE')
            .map(asset => ({
                id: asset.id,
                src: `/api/photography/image/${asset.id}`,
                alt: asset.originalFileName.split('.')[0] // Remove extension for alt text
            }));

    } catch (error) {
        console.error('Error fetching photos from Immich:', error);
        return [];
    }
}

// Alternative function to get photos from a specific album
export async function getAlbumPhotos(albumId: string): Promise<Photo[]> {
    
    if (!IMMICH_API_KEY) {
        console.warn('IMMICH_API_KEY not found');
        return [];
    }

    try {
        const response = await fetch(`${IMMICH_HOST}/api/albums/${albumId}`, {
            headers: {
                'x-api-key': IMMICH_API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch album from Immich:', response.status);
            return [];
        }

        const album: ImmichAlbum = await response.json();
        
        return album.assets
            .filter((asset: ImmichAsset) => asset.type === 'IMAGE')
            .map((asset: ImmichAsset) => ({
                id: asset.id,
                src: `/api/photography/image/${asset.id}`,
                alt: asset.originalFileName.split('.')[0]
            }));

    } catch (error) {
        console.error('Error fetching album photos from Immich:', error);
        return [];
    }
}

// Function to get random photos for variety
export async function getRandomPhotos(count: number = 12): Promise<Photo[]> {
    
    if (!IMMICH_API_KEY) {
        console.warn('IMMICH_API_KEY not found');
        return [];
    }

    try {
        const photos: Photo[] = [];
        
        // Fetch multiple random assets
        for (let i = 0; i < count; i++) {
            const response = await fetch(`${IMMICH_HOST}/api/assets/random`, {
                headers: {
                    'x-api-key': IMMICH_API_KEY,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const asset: ImmichAsset = await response.json();
                if (asset.type === 'IMAGE') {
                    photos.push({
                        id: asset.id,
                        src: `/api/photography/image/${asset.id}`,
                        alt: asset.originalFileName.split('.')[0]
                    });
                }
            }
        }
        
        return photos;

    } catch (error) {
        console.error('Error fetching random photos from Immich:', error);
        return [];
    }
}

export const load: PageServerLoad = async () => {
    const photos = await getAllPhotos();
  return { photos };
};