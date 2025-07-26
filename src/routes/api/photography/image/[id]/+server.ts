import type { RequestHandler } from './$types';
import { IMMICH_API_KEY, IMMICH_HOST } from '$env/static/private';

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params;
    
    if (!IMMICH_API_KEY) {
        return new Response('API key not configured', { status: 500 });
    }

    try {
        const response = await fetch(`${IMMICH_HOST}/api/assets/${id}/thumbnail?size=preview`, {
            headers: {
                'x-api-key': IMMICH_API_KEY,
                'Accept': 'image/*'
            }
        });

        if (!response.ok) {
            return new Response('Image not found', { status: response.status });
        }

        const imageBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/jpeg';

        return new Response(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error fetching image from Immich:', error);
        return new Response('Error fetching image', { status: 500 });
    }
}; 