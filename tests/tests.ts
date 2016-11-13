/// <reference path="../typings/index.d.ts" />

import '../node_modules/jasmine-core/lib/jasmine-core/jasmine';
import { compileUrl } from '../ts/asp-net-core-url-compiler';

const validEmptyTemplate = '';

describe('Url helper', () => {

    it('should throw error if url === null', () => {
        expect(() => compileUrl(null, null))
            .toThrowError('Can\'t compile null URL.');
    });

    it('should throw error if parameters === null', () => {
        expect(() => compileUrl(validEmptyTemplate, null))
            .toThrowError('Can\'t compile URL with null parameters.');
        expect(() => compileUrl(validEmptyTemplate, undefined))
            .toThrowError('Can\'t compile URL with undefined parameters.');
    });

    it('should throw error if parameters contains complex types', () => {
        let parameters = {
            hardOne: { thing: 'abbacabba' },
            simpleString: 'simple?',
            simpleNumber: 13
        };

        expect(() => compileUrl(validEmptyTemplate, parameters))
            .toThrowError('Can\'t compile URL with complex parameter \'hardOne\'.');
    });

    it('should compile template without parameters', () => {
        let parameter = { };
        let result = compileUrl('/testurl', parameter);

        expect(result).toBe('/testurl');
    });

    it('should compile single numeric template', () => {
        let parameter = { page: 3 };
        let result = compileUrl('/{page}', parameter);

        expect(result).toBe(`/${parameter.page}`);
    });

    it('should compile single string template', () => {
        let parameter = { page: 'last' };
        let result = compileUrl('/{page}', parameter);

        expect(result).toBe(`/${parameter.page}`);
    });

    it('should compile repetitive template', () => {
        let parameter = { page: 3 };
        let result = compileUrl('/{page}/some/{page}', parameter);

        expect(result).toBe(`/${parameter.page}/some/${parameter.page}`);
    });

    it('should compile multiple template', () => {
        let parameter = {
            spell: 'avadakedavra',
            page: 42,
        };
        let result = compileUrl('/{page}/{spell}', parameter);

        expect(result).toBe(`/${parameter.page}/${parameter.spell}`);
    });

    it('should encode parameters', () => {
        let parameter = {
            encodeMe: 'To be or not to be?'
        };
        let result = compileUrl('/{encodeMe}', parameter);

        expect(result).toBe('/To%20be%20or%20not%20to%20be%3F');
    });
});
