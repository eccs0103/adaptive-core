"use strict";

import { Matrix, Point2D } from "./Measures.js";

const { min, max, trunc, abs } = Math;

//#region Color formats
/**
 * Enumeration of color formats.
 * @enum {string}
 */
const ColorFormats = {
	/** @readonly */ RGB: `RGB`,
	/** @readonly */ HSL: `HSL`,
	/** @readonly */ HEX: `HEX`,
};
Object.freeze(ColorFormats);
//#endregion
//#region Color
class Color {
	//#region Converters
	/**
	 * @param {number} hue [0 360]
	 * @param {number} saturation [0 100]
	 * @param {number} lightness [0 100]
	 * @returns {[number, number, number]} red [0 255], green [0 255], blue [0 255]
	 */
	static #HSLtoRGB(hue, saturation, lightness) {
		hue /= 30;
		saturation /= 100;
		lightness /= 100;
		/** @param {number} level */
		function transform(level) {
			const sector = (level + hue) % 12;
			return lightness - (saturation * min(lightness, 1 - lightness)) * max(-1, min(sector - 3, 9 - sector, 1));
		}
		return [
			trunc(transform(0) * 255),
			trunc(transform(8) * 255),
			trunc(transform(4) * 255)
		];
	}
	/**
	 * @param {number} red [0 255]
	 * @param {number} green [0 255]
	 * @param {number} blue [0 255]
	 * @returns {[number, number, number]} hue [0 360], saturation [0 100], lightness [0 100]
	 */
	static #RGBtoHSL(red, green, blue) {
		red /= 255;
		green /= 255;
		blue /= 255;
		const
			value = max(red, green, blue),
			level = value - min(red, green, blue),
			factor = 1 - abs(value + value - level - 1),
			hue = level && (value === red ? (green - blue) / level : ((value === green) ? 2 + (blue - red) / level : 4 + (red - green) / level));
		return [
			trunc((hue < 0 ? hue + 6 : hue) * 60),
			trunc((factor ? level / factor : 0) * 100),
			trunc(((value + value - level) / 2) * 100)
		];
	}
	/**
	 * Converts a Color object to a string representation.
	 * @param {Color} source The source Color object.
	 * @param {boolean} deep Whether to include alpha channel.
	 * @param {ColorFormats} format The desired output format.
	 * @returns {string} The string representation of the Color object.
	 */
	static stringify(source, deep = false, format = ColorFormats.RGB) {
		switch (format) {
			case ColorFormats.RGB: return `rgb${deep ? `a` : ``}(${source.#red}, ${source.#green}, ${source.#blue}${deep ? `, ${source.#alpha}` : ``})`;
			case ColorFormats.HSL: return `hsl${deep ? `a` : ``}(${source.#hue}deg, ${source.#saturation}%, ${source.#lightness}%${deep ? `, ${source.#alpha}` : ``})`;
			case ColorFormats.HEX: return `#${source.#red.toString(16).replace(/^(?!.{2})/, `0`)}${source.#green.toString(16).replace(/^(?!.{2})/, `0`)}${source.#blue.toString(16).replace(/^(?!.{2})/, `0`)}${deep ? (source.#alpha * 255).toString(16).replace(/^(?!.{2})/, `0`) : ``}`;
			default: throw new TypeError(`Invalid color format: '${format}'.`);
		}
	}
	/**
	 * Parses a string representation into a Color object.
	 * @param {string} source The string representation of the Color object.
	 * @param {boolean} deep Whether to include alpha channel.
	 * @param {ColorFormats} format The format of the input string.
	 * @returns {Color} The parsed Color object.
	 */
	static parse(source, deep = false, format = ColorFormats.RGB) {
		switch (format) {
			case ColorFormats.RGB: {
				const regex = new RegExp(`rgb${deep ? `a` : ``}\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*${deep ? `,\\s*(0(\\.\\d+)?|1(\\.0+)?)\\s*` : ``}\\)`, `i`);
				const matches = regex.exec(source);
				if (!matches) {
					throw new SyntaxError(`Invalid ${format} format color syntax: '${source}'.`);
				}
				const [, red, green, blue, alpha] = matches.map((item) => Number.parseInt(item));
				return Color.viaRGB(red, green, blue, deep ? alpha : 1);
			};
			case ColorFormats.HSL: {
				const regex = new RegExp(`hsl${deep ? `a` : ``}\\(\\s*(\\d+)(?:deg)?\\s*,\\s*(\\d+)(?:%)?\\s*,\\s*(\\d+)(?:%)?\\s*${deep ? `,\\s*(0(\\.\\d+)?|1(\\.0+)?)\\s*` : ``}\\)`, `i`);
				const matches = regex.exec(source);
				if (!matches) {
					throw new SyntaxError(`Invalid ${format} format color syntax: '${source}'.`);
				}
				const [, hue, saturation, lightness, alpha] = matches.map((item) => Number.parseInt(item));
				return Color.viaHSL(hue, saturation, lightness, deep ? alpha : 1);
			};
			case ColorFormats.HEX: {
				const regex = new RegExp(`#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})${deep ? `([0-9a-f]{2})` : ``}`, `i`);
				const matches = regex.exec(source);
				if (!matches) {
					throw new SyntaxError(`Invalid ${format} format color syntax: '${source}'.`);
				}
				const [, red, green, blue, alpha] = matches.map((item) => Number.parseInt(item, 16));
				return Color.viaRGB(red, green, blue, deep ? alpha : 1);
			};
			default: throw new TypeError(`Invalid color format: '${format}'.`);
		}
	}
	/**
	 * Tries to parse a string representation into a Color object.
	 * @param {string} source The string representation of the Color object.
	 * @returns {Color?} The parsed Color object or null if parsing fails.
	 */
	static tryParse(source) {
		for (const [format, deep] of Object.values(ColorFormats).flatMap((format) => (/** @type {[string, boolean][]} */ ([[format, false], [format, true]])))) {
			try {
				return Color.parse(source, deep, format);
			} catch {
				continue;
			}
		}
		return null;
	}
	//#endregion
	//#region Constructors
	/**
	 * Creates a Color object based on RGB values.
	 * @param {number} red Range: [0 255].
	 * @param {number} green Range: [0 255].
	 * @param {number} blue Range: [0 255].
	 * @param {number} alpha Range: [0 1].
	 * @returns {Color} The Color object created.
	 */
	static viaRGB(red, green, blue, alpha = 1) {
		if (red < 0 || red > 255) throw new RangeError(`Property 'red' out of range: ${red}`);
		if (green < 0 || green > 255) throw new RangeError(`Property 'green' out of range: ${green}`);
		if (blue < 0 || blue > 255) throw new RangeError(`Property 'blue' out of range: ${blue}`);
		if (alpha < 0 || alpha > 1) throw new RangeError(`Property 'alpha' out of range: ${alpha}`);
		const result = new Color();
		result.#green = trunc(green);
		result.#red = trunc(red);
		result.#blue = trunc(blue);
		[result.#hue, result.#saturation, result.#lightness] = Color.#RGBtoHSL(result.#red, result.#green, result.#blue);
		result.#alpha = alpha;
		return result;
	}
	/**
	 * Creates a Color object based on HSL values.
	 * @param {number} hue Range: [0 360].
	 * @param {number} saturation Range: [0 100].
	 * @param {number} lightness Range: [0 100].
	 * @param {number} alpha Range: [0 1].
	 * @returns {Color} The Color object created.
	 */
	static viaHSL(hue, saturation, lightness, alpha = 1) {
		if (hue < 0 || hue > 360) throw new RangeError(`Property 'hue' out of range: ${hue}`);
		if (saturation < 0 || saturation > 100) throw new RangeError(`Property 'saturation' out of range: ${saturation}`);
		if (lightness < 0 || lightness > 100) throw new RangeError(`Property 'lightness' out of range: ${lightness}`);
		if (alpha < 0 || alpha > 1) throw new RangeError(`Property 'alpha' out of range: ${alpha}`);
		const result = new Color();
		result.#hue = trunc(hue);
		result.#saturation = trunc(saturation);
		result.#lightness = trunc(lightness);
		[result.#red, result.#green, result.#blue] = Color.#HSLtoRGB(result.#hue, result.#saturation, result.#lightness);
		result.#alpha = alpha;
		return result;
	}
	/**
	 * Creates a copy of a Color object.
	 * @param {Color} source The source Color object.
	 * @returns {Color} The cloned Color object.
	 */
	static clone(source) {
		const result = new Color();
		result.#red = source.#red;
		result.#green = source.#green;
		result.#blue = source.#blue;
		result.#hue = source.#hue;
		result.#saturation = source.#saturation;
		result.#lightness = source.#lightness;
		result.#alpha = source.#alpha;
		return result;
	}
	//#endregion
	//#region Presets
	/**
	 * Represents a transparent color.
	 * @readonly
	 * @returns {Color}
	 */
	static get TRANSPARENT() { return Color.viaRGB(0, 0, 0, 0); };
	/**
	 * Represents the color maroon.
	 * @readonly
	 * @returns {Color}
	 */
	static get MAROON() { return Color.viaRGB(128, 0, 0); };
	/**
	 * Represents the color red.
	 * @readonly
	 * @returns {Color}
	 */
	static get RED() { return Color.viaRGB(255, 0, 0); };
	/**
	 * Represents the color orange.
	 * @readonly
	 * @returns {Color}
	 */
	static get ORANGE() { return Color.viaRGB(255, 165, 0); };
	/**
	 * Represents the color yellow.
	 * @readonly
	 * @returns {Color}
	 */
	static get YELLOW() { return Color.viaRGB(255, 255, 0); };
	/**
	 * Represents the color olive.
	 * @readonly
	 * @returns {Color}
	 */
	static get OLIVE() { return Color.viaRGB(128, 128, 0); };
	/**
	 * Represents the color green.
	 * @readonly
	 * @returns {Color}
	 */
	static get GREEN() { return Color.viaRGB(0, 128, 0); };
	/**
	 * Represents the color purple.
	 * @readonly
	 * @returns {Color}
	 */
	static get PURPLE() { return Color.viaRGB(128, 0, 128); };
	/**
	 * Represents the color fuchsia.
	 * @readonly
	 * @returns {Color}
	 */
	static get FUCHSIA() { return Color.viaRGB(255, 0, 255); };
	/**
	 * Represents the color lime.
	 * @readonly
	 * @returns {Color}
	 */
	static get LIME() { return Color.viaRGB(0, 255, 0); };
	/**
	 * Represents the color teal.
	 * @readonly
	 * @returns {Color}
	 */
	static get TEAL() { return Color.viaRGB(0, 128, 128); };
	/**
	 * Represents the color aqua.
	 * @readonly
	 * @returns {Color}
	 */
	static get AQUA() { return Color.viaRGB(0, 255, 255); };
	/**
	 * Represents the color blue.
	 * @readonly
	 * @returns {Color}
	 */
	static get BLUE() { return Color.viaRGB(0, 0, 255); };
	/**
	 * Represents the color navy.
	 * @readonly
	 * @returns {Color}
	 */
	static get NAVY() { return Color.viaRGB(0, 0, 128); };
	/**
	 * Represents the color black.
	 * @readonly
	 * @returns {Color}
	 */
	static get BLACK() { return Color.viaRGB(0, 0, 0); };
	/**
	 * Represents the color gray.
	 * @readonly
	 * @returns {Color}
	 */
	static get GRAY() { return Color.viaRGB(128, 128, 128); };
	/**
	 * Represents the color silver.
	 * @readonly
	 * @returns {Color}
	 */
	static get SILVER() { return Color.viaRGB(192, 192, 192); };
	/**
	 * Represents the color white.
	 * @readonly
	 * @returns {Color}
	 */
	static get WHITE() { return Color.viaRGB(255, 255, 255); };
	//#endregion
	//#region Modifiers
	/**
	 * Mixes two colors.
	 * @param {Color} first The first color.
	 * @param {Color} second The second color.
	 * @param {number} ratio Range: [0 1].
	 * @returns {Color} The mixed color.
	 */
	static mix(first, second, ratio = 0.5) {
		if (ratio < 0 || ratio > 1) throw new RangeError(`Property 'ratio' out of range: ${ratio}`);
		return Color.viaRGB(
			first.#red + (second.#red - first.#red) * ratio,
			first.#green + (second.#green - first.#green) * ratio,
			first.#blue + (second.#blue - first.#blue) * ratio
		);
	}
	/**
	 * Creates a grayscale version of a color.
	 * @param {Color} source The source color.
	 * @param {number} scale Range: [0 1].
	 * @returns {Color} The grayscale color.
	 */
	static grayscale(source, scale = 1) {
		if (scale < 0 || scale > 1) throw new RangeError(`Property 'scale' out of range: ${scale}`);
		const grayness = (source.#red + source.#green + source.#blue) / 3;
		return Color.viaRGB(
			source.#red + (grayness - source.#red) * scale,
			source.#green + (grayness - source.#green) * scale,
			source.#blue + (grayness - source.#blue) * scale
		);
	}
	/**
	 * Inverts the colors of a color.
	 * @param {Color} source The source color.
	 * @param {number} scale Range: [0 1].
	 * @returns {Color} The inverted color.
	 */
	static invert(source, scale = 1) {
		if (scale < 0 || scale > 1) throw new RangeError(`Property 'scale' out of range: ${scale}`);
		const [red, green, blue] = [255 - source.#red, 255 - source.#green, 255 - source.#blue];
		return Color.viaRGB(
			source.#red + (red - source.#red) * scale,
			source.#green + (green - source.#green) * scale,
			source.#blue + (blue - source.#blue) * scale
		);
	}
	/**
	 * Applies sepia tone to a color.
	 * @param {Color} source The source color.
	 * @param {number} scale Range: [0 1].
	 * @returns {Color} The sepia-toned color.
	 */
	static sepia(source, scale = 1) {
		if (scale < 0 || scale > 1) throw new RangeError(`Property 'scale' out of range: ${scale}`);
		const
			red = max(0, min(((source.#red * 0.393) + (source.#green * 0.769) + (source.#blue * 0.189)), 255)),
			green = max(0, min(((source.#red * 0.349) + (source.#green * 0.686) + (source.#blue * 0.168)), 255)),
			blue = max(0, min(((source.#red * 0.272) + (source.#green * 0.534) + (source.#blue * 0.131)), 255));
		return Color.viaRGB(
			source.#red + (red - source.#red) * scale,
			source.#green + (green - source.#green) * scale,
			source.#blue + (blue - source.#blue) * scale
		);
	}
	/**
	 * Rotates the hue of a color.
	 * @param {Color} source The source color.
	 * @param {number} angle Range: (-∞ ∞).
	 * @returns {Color} The rotated color.
	 */
	static rotate(source, angle) {
		let hue = trunc(source.#hue + angle) % 361;
		if (hue < 0) hue += 360;
		return Color.viaHSL(hue, source.#saturation, source.#lightness);
	}
	/**
	 * Saturates a color.
	 * @param {Color} source The source color.
	 * @param {number} scale Range: [0 1].
	 * @returns {Color} The saturated color.
	 */
	static saturate(source, scale) {
		if (scale < 0 || scale > 1) throw new RangeError(`Property 'scale' out of range: ${scale}`);
		return Color.viaHSL(source.#hue, 100 * scale, source.#lightness);
	}
	/**
	 * Illuminates a color.
	 * @param {Color} source The source color.
	 * @param {number} scale Range: [0 1].
	 * @returns {Color} The illuminated color.
	 */
	static illuminate(source, scale) {
		if (scale < 0 || scale > 1) throw new RangeError(`Property 'scale' out of range: ${scale}`);
		return Color.viaHSL(source.#hue, source.#saturation, 100 * scale);
	}
	/**
	 * Adjusts the alpha of a color.
	 * @param {Color} source The source color.
	 * @param {number} scale Range: [0 1].
	 * @returns {Color} The color with adjusted alpha.
	 */
	static pass(source, scale) {
		if (scale < 0 || scale > 1) throw new RangeError(`Property 'scale' out of range: ${scale}`);
		return Color.viaHSL(source.#hue, source.#saturation, source.#lightness, scale);
	}
	//#endregion
	//#region Properties
	/** @type {number} */
	#red = 0;
	/** 
	 * Gets the red component of the color.
	 */
	get red() {
		return this.#red;
	}
	/** 
	 * Sets the red component of the color.
	 */
	set red(value) {
		if (value < 0 || value > 255) throw new RangeError(`Property 'red' out of range: ${value}`);
		this.#red = trunc(value);
		[this.#hue, this.#saturation, this.#lightness] = Color.#RGBtoHSL(this.#red, this.#green, this.#blue);
	}
	/** @type {number} */
	#green = 0;
	/** 
	 * Gets the green component of the color.
	 */
	get green() {
		return this.#green;
	}
	/** 
	 * Sets the green component of the color.
	 */
	set green(value) {
		if (value < 0 || value > 255) throw new RangeError(`Property 'green' out of range: ${value}`);
		this.#green = trunc(value);
		[this.#hue, this.#saturation, this.#lightness] = Color.#RGBtoHSL(this.#red, this.#green, this.#blue);
	}
	/** @type {number} */
	#blue = 0;
	/** 
	 * Gets the blue component of the color.
	 */
	get blue() {
		return this.#blue;
	}
	/** 
	 * Sets the blue component of the color.
	 */
	set blue(value) {
		if (value < 0 || value > 255) throw new RangeError(`Property 'blue' out of range: ${value}`);
		this.#blue = trunc(value);
		[this.#hue, this.#saturation, this.#lightness] = Color.#RGBtoHSL(this.#red, this.#green, this.#blue);
	}
	/** @type {number} */
	#hue = 0;
	/** 
	 * Gets the hue component of the color.
	 */
	get hue() {
		return this.#hue;
	}
	/** 
	 * Sets the hue component of the color.
	 */
	set hue(value) {
		if (value < 0 || value > 360) throw new RangeError(`Property 'hue' out of range: ${value}`);
		this.#hue = trunc(value);
		[this.#red, this.#green, this.#blue] = Color.#HSLtoRGB(this.#hue, this.#saturation, this.#lightness);
	}
	/** @type {number} */
	#saturation = 0;
	/** 
	 * Gets the saturation component of the color.
	 */
	get saturation() {
		return this.#saturation;
	}
	/** 
	 * Sets the saturation component of the color.
	 */
	set saturation(value) {
		if (value < 0 || value > 100) throw new RangeError(`Property 'saturation' out of range: ${value}`);
		this.#saturation = trunc(value);
		[this.#red, this.#green, this.#blue] = Color.#HSLtoRGB(this.#hue, this.#saturation, this.#lightness);
	}
	/** @type {number} */
	#lightness = 0;
	/** 
	 * Gets the lightness component of the color.
	 */
	get lightness() {
		return this.#lightness;
	}
	/** 
	 * Sets the lightness component of the color.
	 */
	set lightness(value) {
		if (value < 0 || value > 100) throw new RangeError(`Property 'lightness' out of range: ${value}`);
		this.#lightness = trunc(value);
		[this.#red, this.#green, this.#blue] = Color.#HSLtoRGB(this.#hue, this.#saturation, this.#lightness);
	}
	/** @type {number} */
	#alpha = 1;
	/** 
	 * Gets the alpha (transparency) component of the color.
	 */
	get alpha() {
		return this.#alpha;
	}
	/** 
	 * Sets the alpha (transparency) component of the color.
	 */
	set alpha(value) {
		if (value < 0 || value > 1) throw new RangeError(`Property 'alpha' out of range: ${value}`);
		this.#alpha = value;
	}
	//#endregion
	//#region Methods
	/**
	 * Converts the color object to a string representation.
	 * @param {boolean} deep If true, includes detailed information. Default is false.
	 * @param {ColorFormats} format The format in which to represent the color. Default is ColorFormats.RGB.
	 * @returns {string} String representation of the color.
	 */
	toString(deep = false, format = ColorFormats.RGB) {
		return Color.stringify(this, deep, format);
	}
	/**
	 * Creates and returns a deep copy of the current color object.
	 * @returns {Color} A new color object that is a clone of the current color.
	 */
	clone() {
		return Color.clone(this);
	}
	/**
	 * Mixes the current color with another color.
	 * @param {Color} other The color to mix with.
	 * @param {number} ratio The ratio of the other color in the mix. Should be in the range [0, 1]. Default is 0.5.
	 * @returns {Color} A new color resulting from the mixture.
	 */
	mix(other, ratio = 0.5) {
		return Color.mix(this, other, ratio);
	}
	/**
	 * Converts the current color to grayscale.
	 * @param {number} scale The scale of the grayscale effect. Should be in the range [0, 1]. Default is 1.
	 * @returns {Color} A new color in grayscale.
	 */
	grayscale(scale = 1) {
		return Color.grayscale(this, scale);
	}
	/**
	 * Inverts the current color.
	 * @param {number} scale The scale of the inversion effect. Should be in the range [0, 1]. Default is 1.
	 * @returns {Color} A new color resulting from the inversion.
	 */
	invert(scale = 1) {
		return Color.invert(this, scale);
	}
	/**
	 * Applies sepia effect to the current color.
	 * @param {number} scale The scale of the sepia effect. Should be in the range [0, 1]. Default is 1.
	 * @returns {Color} A new color with sepia effect applied.
	 */
	sepia(scale = 1) {
		return Color.sepia(this, scale);
	}
	/**
	 * Rotates the hue of the current color.
	 * @param {number} angle The angle of rotation. Can be any real number.
	 * @returns {Color} A new color resulting from the hue rotation.
	 */
	rotate(angle) {
		return Color.rotate(this, angle);
	}
	/**
	 * Increases or decreases the saturation of the current color.
	 * @param {number} scale The scale of the saturation effect. Should be in the range [0, 1].
	 * @returns {Color} A new color with adjusted saturation.
	 */
	saturate(scale) {
		return Color.saturate(this, scale);
	}
	/**
	 * Increases or decreases the lightness of the current color.
	 * @param {number} scale The scale of the illumination effect. Should be in the range [0, 1].
	 * @returns {Color} A new color with adjusted lightness.
	 */
	illuminate(scale) {
		return Color.illuminate(this, scale);
	}
	/**
	 * Adjusts the alpha (transparency) of the current color.
	 * @param {number} scale The scale of the adjustment. Should be in the range [0, 1].
	 * @returns {Color} A new color with adjusted alpha.
	 */
	pass(scale) {
		return Color.pass(this, scale);
	}
	//#endregion
}
//#endregion

//#region Texture
/**
 * A matrix representing a texture with colors.
 * @extends {Matrix<Color>}
 */
class Texture extends Matrix {
	//#region Converters
	/**
	 * Converts the texture to ImageData.
	 * @param {Texture} texture The texture to convert.
	 * @returns {ImageData} ImageData representing the texture.
	 */
	static toImageData(texture) {
		const imageData = new ImageData(texture.size.x, texture.size.y);
		const data = imageData.data;
		for (let y = 0; y < texture.size.y; y++) {
			for (let x = 0; x < texture.size.x; x++) {
				const position = new Point2D(x, y);
				const index = texture.size.x * y + x;
				const color = texture.get(position);
				data[index * 4 + 0] = color.red;
				data[index * 4 + 1] = color.green;
				data[index * 4 + 2] = color.blue;
				data[index * 4 + 3] = color.alpha;
			}
		}
		return imageData;
	}
	/**
	 * Converts ImageData to a Texture.
	 * @param {ImageData} imageData The ImageData to convert.
	 * @returns {Texture} Texture representing the ImageData.
	 */
	static fromImageData(imageData) {
		const texture = new Texture(new Point2D(imageData.width, imageData.height));
		const data = imageData.data;
		for (let y = 0; y < texture.size.y; y++) {
			for (let x = 0; x < texture.size.x; x++) {
				const position = new Point2D(x, y);
				const index = texture.size.x * y + x;
				const color = Color.viaRGB(
					data[index * 4 + 0],
					data[index * 4 + 1],
					data[index * 4 + 2],
					data[index * 4 + 3],
				);
				texture.set(position, color);
			}
		}
		return texture;
	}
	//#endregion
	//#region Contructors
	/**
	 * Creates a clone of the given texture.
	 * @param {Texture} texture The texture to clone.
	 * @returns {Texture} The cloned texture.
	 */
	static clone(texture) {
		const result = new Texture(texture.size);
		for (let y = 0; y < texture.size.y; y++) {
			for (let x = 0; x < texture.size.x; x++) {
				const position = new Point2D(x, y);
				texture.set(position, texture.get(position).clone());
			}
		}
		return texture;
	}
	/**
	 * Constructs a new texture with the specified size.
	 * @param {Readonly<Point2D>} size The size of the texture.
	 */
	constructor(size) {
		super(size, Color.TRANSPARENT);
	}
	//#endregion
	//#region Modifiers
	/**
	 * Mixes two textures together based on the specified ratio.
	 * @param {Texture} first The first texture.
	 * @param {Texture} second The second texture.
	 * @param {number} ratio The ratio of the mix, ranging from 0 to 1.
	 * @returns {Texture} The resulting mixed texture.
	 */
	static mix(first, second, ratio = 0.5) {
		if (ratio < 0 || ratio > 1) throw new RangeError(`Ratio ${ratio} out of range [0 - 1]`);
		const result = first.clone();
		for (let y = 0; y < result.size.y; y++) {
			for (let x = 0; x < result.size.x; x++) {
				const position = new Point2D(x, y);
				result.set(position, first.get(position).mix(second.get(position), ratio));
			}
		}
		return result;
	}
	/**
	 * Converts the source texture to grayscale.
	 * @param {Texture} source The source texture.
	 * @param {number} scale The scale of grayscale, ranging from 0 to 1.
	 * @returns {Texture} The resulting grayscale texture.
	 */
	static grayscale(source, scale = 1) {
		if (scale < 0 || scale > 1) throw new RangeError(`Scale ${scale} out of range [0 - 1]`);
		const result = source.clone();
		for (let y = 0; y < result.size.y; y++) {
			for (let x = 0; x < result.size.x; x++) {
				const position = new Point2D(x, y);
				result.set(position, source.get(position).grayscale(scale));
			}
		}
		return result;
	}
	/**
	 * Inverts the colors of the source texture.
	 * @param {Texture} source The source texture.
	 * @param {number} scale The scale of inversion, ranging from 0 to 1.
	 * @returns {Texture} The resulting inverted texture.
	 */
	static invert(source, scale = 1) {
		if (scale < 0 || scale > 1) throw new RangeError(`Scale ${scale} out of range [0 - 1]`);
		const result = source.clone();
		for (let y = 0; y < result.size.y; y++) {
			for (let x = 0; x < result.size.x; x++) {
				const position = new Point2D(x, y);
				result.set(position, source.get(position).invert(scale));
			}
		}
		return result;
	}
	/**
	 * Applies a sepia tone to the source texture.
	 * @param {Texture} source The source texture.
	 * @param {number} scale The scale of sepia, ranging from 0 to 1.
	 * @returns {Texture} The resulting sepia-toned texture.
	 */
	static sepia(source, scale = 1) {
		if (scale < 0 || scale > 1) throw new RangeError(`Scale ${scale} out of range [0 - 1]`);
		const result = source.clone();
		for (let y = 0; y < result.size.y; y++) {
			for (let x = 0; x < result.size.x; x++) {
				const position = new Point2D(x, y);
				result.set(position, source.get(position).sepia(scale));
			}
		}
		return result;
	}
	/**
	 * Rotates the colors of the source texture.
	 * @param {Texture} source The source texture.
	 * @param {number} angle The angle of rotation.
	 * @returns {Texture} The resulting rotated texture.
	 */
	static rotate(source, angle) {
		const result = source.clone();
		for (let y = 0; y < result.size.y; y++) {
			for (let x = 0; x < result.size.x; x++) {
				const position = new Point2D(x, y);
				result.set(position, source.get(position).rotate(angle));
			}
		}
		return result;
	}
	/**
	 * Saturates the colors of the source texture.
	 * @param {Texture} source The source texture.
	 * @param {number} scale The scale of saturation, ranging from 0 to 1.
	 * @returns {Texture} The resulting saturated texture.
	 */
	static saturate(source, scale) {
		if (scale < 0 || scale > 1) throw new RangeError(`Scale ${scale} out of range [0 - 1]`);
		const result = source.clone();
		for (let y = 0; y < result.size.y; y++) {
			for (let x = 0; x < result.size.x; x++) {
				const position = new Point2D(x, y);
				result.set(position, source.get(position).saturate(scale));
			}
		}
		return result;
	}
	/**
	 * Illuminates the colors of the source texture.
	 * @param {Texture} source The source texture.
	 * @param {number} scale The scale of illumination, ranging from 0 to 1.
	 * @returns {Texture} The resulting illuminated texture.
	 */
	static illuminate(source, scale) {
		if (scale < 0 || scale > 1) throw new RangeError(`Scale ${scale} out of range [0 - 1]`);
		const result = source.clone();
		for (let y = 0; y < result.size.y; y++) {
			for (let x = 0; x < result.size.x; x++) {
				const position = new Point2D(x, y);
				result.set(position, source.get(position).illuminate(scale));
			}
		}
		return result;
	}
	/**
	 * Passes the colors of the source texture.
	 * @param {Texture} source The source texture.
	 * @param {number} scale The scale of passing, ranging from 0 to 1.
	 * @returns {Texture} The resulting passed texture.
	 */
	static pass(source, scale) {
		if (scale < 0 || scale > 1) throw new RangeError(`Scale ${scale} out of range [0 - 1]`);
		const result = source.clone();
		for (let y = 0; y < result.size.y; y++) {
			for (let x = 0; x < result.size.x; x++) {
				const position = new Point2D(x, y);
				result.set(position, source.get(position).pass(scale));
			}
		}
		return result;
	}
	//#endregion
	//#region Methods
	/**
	 * Creates a deep clone of the current texture.
	 * @returns {Texture} The cloned texture.
	 */
	clone() {
		return Texture.clone(this);
	}
	/**
	 * Mixes the current texture with another texture based on the specified ratio.
	 * @param {Texture} other The other texture to mix with.
	 * @param {number} ratio The ratio of the mix, ranging from 0 to 1.
	 * @returns {Texture} The resulting mixed texture.
	 */
	mix(other, ratio = 0.5) {
		return Texture.mix(this, other, ratio);
	}
	/**
	 * Converts the current texture to grayscale.
	 * @param {number} scale The scale of grayscale, ranging from 0 to 1.
	 * @returns {Texture} The resulting grayscale texture.
	 */
	grayscale(scale = 1) {
		return Texture.grayscale(this, scale);
	}
	/**
	 * Inverts the colors of the current texture.
	 * @param {number} scale The scale of inversion, ranging from 0 to 1.
	 * @returns {Texture} The resulting inverted texture.
	 */
	invert(scale = 1) {
		return Texture.invert(this, scale);
	}
	/**
	 * Applies a sepia tone to the current texture.
	 * @param {number} scale The scale of sepia, ranging from 0 to 1.
	 * @returns {Texture} The resulting sepia-toned texture.
	 */
	sepia(scale = 1) {
		return Texture.sepia(this, scale);
	}
	/**
	 * Rotates the colors of the current texture.
	 * @param {number} angle The angle of rotation.
	 * @returns {Texture} The resulting rotated texture.
	 */
	rotate(angle) {
		return Texture.rotate(this, angle);
	}
	/**
	 * Saturates the colors of the current texture.
	 * @param {number} scale The scale of saturation, ranging from 0 to 1.
	 * @returns {Texture} The resulting saturated texture.
	 */
	saturate(scale) {
		return Texture.saturate(this, scale);
	}
	/**
	 * Illuminates the colors of the current texture.
	 * @param {number} scale The scale of illumination, ranging from 0 to 1.
	 * @returns {Texture} The resulting illuminated texture.
	 */
	illuminate(scale) {
		return Texture.illuminate(this, scale);
	}
	/**
	 * Passes the colors of the current texture.
	 * @param {number} scale The scale of passing, ranging from 0 to 1.
	 * @returns {Texture} The resulting passed texture.
	 */
	pass(scale) {
		return Texture.pass(this, scale);
	}
	//#endregion
};
//#endregion

export { ColorFormats, Color, Texture };
