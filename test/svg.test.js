'use strict';
const svgCaptcha = require('../lib/captcha');

test.skip('Generate random test', () => {
	for (let i = 0; i < 100; i++) {
		const text = svgCaptcha.randomText();
		expect(text).toMatch(/^[0-9a-zA-Z]+$/);
	}
});

test.skip('Filter chars', () => {
	const opt = {ignoreChars: '0123456789'};
	for (let i = 0; i < 100; i++) {
		const text = svgCaptcha.randomText(opt);
		expect(text).toMatch(/^[a-zA-Z]+$/);
	}
});

const xmlReg = /^<svg[\s\S]+\/svg>$/;
test.skip('Old svgCaptcha() api', () => {
	expect(svgCaptcha()).toMatch(xmlReg);
	expect(svgCaptcha('abcd')).toMatch(xmlReg);
});

test('Current create() api', () => {
	const c = svgCaptcha.create();
	expect(c.data).toMatch(xmlReg);
	expect(c.text.length).toEqual(5);
});

test.skip('Global charPreset options', () => {
	const defaultPreset = svgCaptcha.options.charPreset;
	svgCaptcha.options.charPreset = '0123456789';
	for (let i = 0; i < 100; i++) {
		const text = svgCaptcha.randomText();
		expect(text).toMatch(/^[0-9]+$/);
	}
	svgCaptcha.options.charPreset = defaultPreset;
});

test.skip('Local charPreset options', () => {
	const opt = {charPreset: '0123456789'};
	for (let i = 0; i < 100; i++) {
		const text = svgCaptcha.randomText(opt);
		expect(text).toMatch(/^[0-9]+$/);
	}
});
