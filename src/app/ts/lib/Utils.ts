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
				extension = '.gif';
				break;
			}

			case 'thumbnail': {
				extension = '.webp';
				break;
			}

			case 'video': {
				extension = '.mp4';
				break;
			}
		}

		return `${CONFIG.CONTENT_PATH}/${videoId}/${fileName}${extension}`;
	}

	public static getThumbnailExtension(): string {
		return '.webp';
	}
}
