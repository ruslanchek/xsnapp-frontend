import { CONFIG } from '../config';
import {
	EVideoFileKind,
	EVideoFileExtension,
	EVideoFileSize,
} from '../enums/video';
import { ItemsStore } from '../stores/ItemsStore';

export class Utils {
	public static getImagePath(
		videoId: number,
		fileName: string,
		kind: EVideoFileKind,
	): string {
		let extension: EVideoFileExtension = null;

		switch (kind) {
			case EVideoFileKind.Preview: {
				extension = EVideoFileExtension.Mp4;
				break;
			}

			case EVideoFileKind.Thumbnail: {
				extension = EVideoFileExtension.Image;
				break;
			}
		}

		return `${CONFIG.CONTENT_PATH}/${videoId}/${fileName}${extension}`;
	}

	public static getAvatarPath(userId: number): string {
		return `${CONFIG.AVATARS_PATH}/${userId}/avatar${
			EVideoFileExtension.Image
		}`;
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
