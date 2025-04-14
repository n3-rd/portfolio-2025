import fs from 'fs';
import path from 'path';

interface Photo {
    src: string;
    alt: string;
}

export async function getAllPhotos(): Promise<Photo[]> {
    const imgDir = path.join(process.cwd(), 'static/img');
    const files = fs.readdirSync(imgDir);
    
    return files
        .filter((file: string) => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        })
        .map((file: string) => ({
            src: `/img/${file}`,
            alt: path.parse(file).name
        }));
} 