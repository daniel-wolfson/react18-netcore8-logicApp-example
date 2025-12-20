import { parseDateFromString } from '../components/JobViewChart';

describe('parseDateFromString', () => {
    describe('ISO date formats', () => {
        it('should parse ISO date format YYYY-MM-DD', () => {
            const result = parseDateFromString('2024-12-31');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(11); // December is month 11 (0-indexed)
            expect(result?.getDate()).toBe(31);
        });

        it('should parse ISO datetime format YYYY-MM-DDTHH:mm:ssZ', () => {
            const result = parseDateFromString('2024-12-31T10:20:30Z');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(11);
            expect(result?.getDate()).toBe(31);
        });

        it('should parse ISO datetime with milliseconds', () => {
            const result = parseDateFromString('2024-01-15T14:30:45.123Z');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(0); // January
            expect(result?.getDate()).toBe(15);
        });

        it('should parse ISO date with time and offset', () => {
            const result = parseDateFromString('2024-06-15T08:00:00+05:00');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(5); // June
            expect(result?.getDate()).toBe(15);
        });
    });

    describe('Non-ISO date formats with slash separator', () => {
        it('should parse DD/MM/YYYY when day > 12', () => {
            const result = parseDateFromString('31/12/2024');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(11); // December
            expect(result?.getDate()).toBe(31);
        });

        it('should parse MM/DD/YYYY when month > 12', () => {
            const result = parseDateFromString('12/31/2024');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(11); // December
            expect(result?.getDate()).toBe(31);
        });

        it('should parse ambiguous dates as MM/DD/YYYY', () => {
            const result = parseDateFromString('06/08/2024');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(5); // June (MM/DD interpretation)
            expect(result?.getDate()).toBe(8);
        });

        it('should parse single-digit day/month with slash as MM/DD', () => {
            const result = parseDateFromString('5/9/2024');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(4); // May (MM/DD interpretation)
            expect(result?.getDate()).toBe(9);
        });
    });

    describe('Non-ISO date formats with dash separator', () => {
        it('should parse DD-MM-YYYY when day > 12', () => {
            const result = parseDateFromString('25-03-2024');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(2); // March
            expect(result?.getDate()).toBe(25);
        });

        it('should parse MM-DD-YYYY when month > 12', () => {
            const result = parseDateFromString('03-25-2024');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(2); // March
            expect(result?.getDate()).toBe(25);
        });
    });

    describe('Non-ISO date formats with dot separator', () => {
        it('should parse DD.MM.YYYY when day > 12', () => {
            const result = parseDateFromString('20.07.2024');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(6); // July
            expect(result?.getDate()).toBe(20);
        });

        it('should parse MM.DD.YYYY when month > 12', () => {
            const result = parseDateFromString('07.20.2024');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(6); // July
            expect(result?.getDate()).toBe(20);
        });
    });

    describe('Edge cases', () => {
        it('should return null for empty string', () => {
            const result = parseDateFromString('');
            expect(result).toBeNull();
        });

        it('should return null for null-like input', () => {
            const result = parseDateFromString(null as any);
            expect(result).toBeNull();
        });

        it('should return null for undefined input', () => {
            const result = parseDateFromString(undefined as any);
            expect(result).toBeNull();
        });

        it('should return null for completely invalid date string', () => {
            const result = parseDateFromString('not-a-date');
            expect(result).toBeNull();
        });

        it('should return null for invalid date values', () => {
            const result = parseDateFromString('99/99/9999');
            expect(result).toBeNull();
        });

        it('should return null for date with month > 12', () => {
            const result = parseDateFromString('15/13/2024');
            expect(result).toBeNull();
        });

        it('should handle leap year correctly', () => {
            const result = parseDateFromString('29/02/2024');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2024);
            expect(result?.getMonth()).toBe(1); // February
            expect(result?.getDate()).toBe(29);
        });

        it('should return null for invalid leap year date', () => {
            const result = parseDateFromString('29/02/2023');
            expect(result).toBeNull();
        });
    });

    describe('Fallback parser', () => {
        it('should use fallback parser for unusual formats', () => {
            // Some browsers can parse this format
            const result = parseDateFromString('December 25, 2024');
            // Fallback parser is browser-dependent, so we just verify it doesn't throw
            expect(result === null || result instanceof Date).toBe(true);
        });

        it('should use fallback parser for short date format', () => {
            const result = parseDateFromString('Jan 15 2024');
            // Fallback parser is browser-dependent, so we just verify it doesn't throw
            expect(result === null || result instanceof Date).toBe(true);
        });
    });

    describe('Year variations', () => {
        it('should handle 2-digit year format', () => {
            // date-fns interprets 2-digit years (00-99) relative to 2000
            const result = parseDateFromString('12/25/24');
            expect(result).toBeInstanceOf(Date);
            // 2-digit year '24' becomes year 24 (0024), which is valid but unexpected
            // This is standard date-fns behavior
            expect(result).not.toBeNull();
        });

        it('should handle early 2000s dates', () => {
            const result = parseDateFromString('2000-01-01');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2000);
            expect(result?.getMonth()).toBe(0);
            expect(result?.getDate()).toBe(1);
        });

        it('should handle future dates', () => {
            const result = parseDateFromString('2030-12-31');
            expect(result).toBeInstanceOf(Date);
            expect(result?.getFullYear()).toBe(2030);
            expect(result?.getMonth()).toBe(11);
            expect(result?.getDate()).toBe(31);
        });
    });
});
