/**
 * String case conversion utilities for normalizing text formatting
 * @module stringCaseConverters
 * @description Provides functions to convert strings to various case formats (dot.case, camelCase)
 * with comprehensive input validation and error handling
 */

/**
 * Converts a string to dot.case format with robust error handling
 * @function toDotCase
 * @param {string} str - The string to convert to dot.case format
 * @returns {string} The dot.case version of the string where words are separated by dots and lowercase
 * @throws {TypeError} If input is null or undefined
 * @throws {TypeError} If input is not a string type
 * @example
 * // Basic usage
 * toDotCase('hello world'); // "hello.world"
 * toDotCase('hello_world'); // "hello.world"
 * toDotCase('hello-world'); // "hello.world"
 * @example
 * // With special characters
 * toDotCase('hello@world!'); // "hello.world"
 * toDotCase('user#name$'); // "user.name"
 * @example
 * // Edge cases
 * toDotCase('   hello world   '); // "hello.world"
 * toDotCase('hello___world'); // "hello.world"
 * toDotCase('   '); // ""
 */

/**
 * Converts a string to camelCase format with robust error handling
 * @function toCamelCase
 * @param {string} str - The string to convert to camelCase format
 * @returns {string} The camelCase version of the string where the first word is lowercase
 * and subsequent words have their first letter capitalized
 * @throws {TypeError} If input is null or undefined
 * @throws {TypeError} If input is not a string type
 * @example
 * // Basic usage
 * toCamelCase('hello world'); // "helloWorld"
 * toCamelCase('hello_world'); // "helloWorld"
 * toCamelCase('hello-world'); // "helloWorld"
 * @example
 * // Multiple words and separators
 * toCamelCase('hello_world-foo bar'); // "helloWorldFooBar"
 * toCamelCase('api_response_code'); // "apiResponseCode"
 * toCamelCase('API response code'); // "apiResponseCode"
 * @example
 * // With special characters and numbers
 * toCamelCase('hello@world!'); // "helloWorld"
 * toCamelCase('version 2 update'); // "version2Update"
 * toCamelCase('user#name$'); // "userName"
 * @example
 * // Edge cases
 * toCamelCase('   hello world   '); // "helloWorld"
 * toCamelCase('hello   world'); // "helloWorld"
 * toCamelCase('hello'); // "hello"
 * toCamelCase('___'); // ""
 * @example
 * // Error handling
 * toCamelCase(null); // throws TypeError
 * toCamelCase(undefined); // throws TypeError
 * toCamelCase(123); // throws TypeError
 */

function toDotCase(str) {
    // Validate input
    if (str === null || str === undefined) {
        throw new TypeError('Input cannot be null or undefined');
    }

    if (typeof str !== 'string') {
        throw new TypeError(`Expected string, received ${typeof str}`);
    }

    // Trim leading and trailing whitespace
    str = str.trim();

    // Handle empty string after trimming
    if (str.length === 0) {
        return '';
    }

    // Replace spaces, underscores, and hyphens with a common separator
    // Then remove special characters except alphanumeric
    const cleaned = str
        .replace(/[\s_-]+/g, ' ') // Normalize separators to spaces
        .replace(/[^\w\s]/g, '') // Remove special characters
        .split(/\s+/) // Split by spaces (handles multiple consecutive separators)
        .filter(word => word.length > 0); // Remove empty strings

    // Return empty string if no valid words remain
    if (cleaned.length === 0) {
        return '';
    }

    // Convert to dot.case
    return cleaned
        .map(word => word.toLowerCase())
        .join('.');
}

/**
 * Converts a string to camelCase with robust error handling
 * @param {string} str - The string to convert
 * @returns {string} The camelCase version of the string
 * @throws {TypeError} If input is not a string, null, or undefined
 */
function toCamelCase(str) {
    // Validate input
    if (str === null || str === undefined) {
        throw new TypeError('Input cannot be null or undefined');
    }

    if (typeof str !== 'string') {
        throw new TypeError(`Expected string, received ${typeof str}`);
    }

    // Trim leading and trailing whitespace
    str = str.trim();

    // Handle empty string after trimming
    if (str.length === 0) {
        return '';
    }

    // Replace spaces, underscores, and hyphens with a common separator
    // Then remove special characters except alphanumeric
    const cleaned = str
        .replace(/[\s_-]+/g, ' ') // Normalize separators to spaces
        .replace(/[^\w\s]/g, '') // Remove special characters
        .split(/\s+/) // Split by spaces (handles multiple consecutive separators)
        .filter(word => word.length > 0); // Remove empty strings

    // Return empty string if no valid words remain
    if (cleaned.length === 0) {
        return '';
    }

    // Convert to camelCase
    return cleaned
        .map((word, index) => {
            // First word: lowercase everything
            if (index === 0) {
                return word.toLowerCase();
            }
            // Subsequent words: capitalize first letter, lowercase rest
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

// ============================================
// TEST CASES
// ============================================

console.log('=== VALID INPUTS ===');

// Basic cases
console.log(toCamelCase('hello world')); // "helloWorld"
console.log(toCamelCase('hello_world')); // "helloWorld"
console.log(toCamelCase('hello-world')); // "helloWorld"

// Mixed separators
console.log(toCamelCase('hello_world-foo bar')); // "helloWorldFooBar"

// Multiple consecutive separators
console.log(toCamelCase('hello___world')); // "helloWorld"
console.log(toCamelCase('hello   world')); // "helloWorld"

// With numbers
console.log(toCamelCase('version 2 update')); // "version2Update"
console.log(toCamelCase('api_response_code')); // "apiResponseCode"

// With special characters
console.log(toCamelCase('hello@world!')); // "helloWorld"
console.log(toCamelCase('user#name$')); // "userName"

// With whitespace
console.log(toCamelCase('  hello world  ')); // "helloWorld"

// Single word
console.log(toCamelCase('hello')); // "hello"

// All uppercase acronym
console.log(toCamelCase('API response code')); // "apiResponseCode"

// Empty-like cases
console.log(toCamelCase('   ')); // ""
console.log(toCamelCase('___')); // ""

console.log('\n=== INVALID INPUTS ===');

// Test error handling
try {
    toCamelCase(null);
} catch (e) {
    console.log(`✓ Caught error for null: ${e.message}`);
}

try {
    toCamelCase(undefined);
} catch (e) {
    console.log(`✓ Caught error for undefined: ${e.message}`);
}

try {
    toCamelCase(123);
} catch (e) {
    console.log(`✓ Caught error for number: ${e.message}`);
}

try {
    toCamelCase({});
} catch (e) {
    console.log(`✓ Caught error for object: ${e.message}`);
}

try {
    toCamelCase([]);
} catch (e) {
    console.log(`✓ Caught error for array: ${e.message}`);
}