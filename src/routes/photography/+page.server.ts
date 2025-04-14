import { getAllPhotos } from "$lib/server/photography";

export async function load() {
    const photos = await getAllPhotos();
    return { photos };
}