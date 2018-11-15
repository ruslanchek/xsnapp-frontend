import { CONFIG } from '../config';

export class Utils {
	public static getFilePath(
		videoId: number,
		fileName: string,
		kind: string,
	): string {
		let extension = '';

		switch (kind) {
			case 'preview': {
				return '.gif';
			}

			case 'thumbnail': {
				return '.webp';
			}

			case 'video': {
				return '.mp4';
			}
		}

		return `${CONFIG.CONTENT_PATH}/${videoId}/${fileName}${extension}`;
	}

	public static getThumbnailExtension(): string {
		return '.webp';
	}
}
