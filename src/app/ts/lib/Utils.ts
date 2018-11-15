import { CONFIG } from '../config';
import {
	EVideoImageKind,
	EVideoFileExtension,
	EVideoFileSize,
} from '../enums/video';
import { ItemsStore } from '../stores/ItemsStore';

export class Utils {
	public static getImagePath(
		videoId: number,
		fileName: string,
		kind: EVideoImageKind,
	): string {
		let extension: EVideoFileExtension = null;

		switch (kind) {
			case EVideoImageKind.Preview: {
				extension = EVideoFileExtension.Gif;
				break;
			}

			case EVideoImageKind.Thumbnail: {
				extension = EVideoFileExtension.Webp;
				break;
			}
		}

		return `${CONFIG.CONTENT_PATH}/${videoId}/${fileName}${extension}`;
	}

	public static getVideoPath(
		videoId: number,
		videos: ItemsStore.IVideoFile[],
		size: EVideoFileSize,
	): string {
		const video = this.selectVideoSize(size, videos);
		return `${CONFIG.CONTENT_PATH}/${videoId}/${
			video.fileName
		}${EVideoFileExtension.Mp4.toString()}`;
	}

	private static selectVideoSize(
		size: EVideoFileSize,
		videos: ItemsStore.IVideoFile[],
	): ItemsStore.IVideoFile {
		const requestedSize = videos.find(video => video.fileName === size);

		if (requestedSize) {
			return requestedSize;
		} else {
			videos = videos.sort((v1, v2) => {
				return (
					parseInt(v2.fileName.replace('uhd', '9999').replace('p', '')) -
					parseInt(v1.fileName.replace('uhd', '9999').replace('p', ''))
				);
			});

			return videos[0];
		}
	}
}
