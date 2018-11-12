import Color = require('color');
import { css } from 'emotion';

export const COLORS = {
	GRAY_LIGHT: Color('#F3F5F7'),
	GRAY_DARK: Color('#F7F8F9').darken(.025),
	GRAY_EXTRA_DARK: Color('#F7F8F9').darken(.1),
	WHITE: Color('#FFFFFF'),
	BLACK: Color('#222E3F'),
	BLACK_LIGHT: Color('#5A636F'),
	BLACK_EXTRA_LIGHT: Color('#5A636F').lighten(.5),
	RED: Color('#DA1D58'),
	RED_LIGHT: Color('#FCEAEE'),
	RED_LIGHT_ACTIVE: Color('#FAD6DE'),
	BLUE_LIGHT: Color('#E9F1FB'),
	BLUE_LIGHT_ACTIVE: Color('#D3E4F7'),
	BLUE: Color('#017AD5'),
	BLUE_SELECTED: Color('#017AD5').alpha(.05),
	BLUE_HOVER: Color('#017AD5').alpha(.038),
	GREEN: Color('#00914D'),
	FACEBOOK: Color('#3B5998'),
};

export const THEME = {
	FONT: '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
	HEADER_HEIGHT: 54,
	NAV_HEIGHT: 0,
	CURRENCY_ICON_SIZE: 36,
	SECTION_PADDING_H: 20,
	SECTION_PADDING_V: 15,
	FONT_SIZE_H1: 28,
	FONT_SIZE_REGULAR: 14,
	FONT_SIZE_BIG: 22,
	FONT_SIZE_MEDIUM: 18,
	FONT_SIZE_SMALL: 12,
	FONT_SIZE_TINY: 10,
	BOX_SHADOW_ELEVATION_MINIMAL: `0 1px 2px 0 ${COLORS.BLACK.alpha(0.07).toString()}`,
	BOX_SHADOW_ELEVATION_MINIMAL_INVERTED: `0 -1px 2px 0 ${COLORS.BLACK.alpha(0.07).toString()}`,
	BOX_SHADOW_ELEVATION_1: `0 3px 9px 0 ${COLORS.BLACK.alpha(0.12).toString()}`,
	BOX_SHADOW_ELEVATION_2: `0 8px 15px 0 ${COLORS.BLACK.alpha(0.09).toString()}`,
	PAGE_SIDE_PADDING_DESKTOP: 40,
	PAGE_SIDE_PADDING_PHONE: 20,
	PAGE_MAX_WIDTH: 1600,
	INPUT_HEIGHT: 38
};

export const COMMON_STYLES = {
	LINK: css({
		color: COLORS.BLACK.toString(),
		textDecoration: 'none',

		':link': {
			color: COLORS.BLACK.toString(),
		},

		':visited': {
			color: COLORS.BLACK.toString(),
		},

		':hover': {
			color: COLORS.BLACK.lighten(1.25).toString(),
		},

		':active': {
			color: COLORS.BLACK.lighten(1).toString(),
		}
	}),

	SMALL_TEXT: css({
		fontSize: THEME.FONT_SIZE_SMALL,
	}),

	FILTER_ACCENT: css({
		color: COLORS.BLACK.toString(),
		fontWeight: 600,
	}),
};
