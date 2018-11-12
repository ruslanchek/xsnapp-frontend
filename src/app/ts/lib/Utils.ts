import { CONFIG } from '../config';

export class Utils {
	public static getFilePath(videoId: number, fileName: string): string {
		return `${CONFIG.CONTENT_PATH}/${videoId}/${fileName}`;
	}
}
