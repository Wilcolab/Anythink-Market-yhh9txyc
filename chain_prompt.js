function toKebabCase(input) {
    // Step 1: Validate input
    if (input === null || input === undefined || typeof input !== 'string') {
        throw new Error('Input must be a non-null string');
    }

    // Step 2: Normalize the string
    let normalized = input
        .trim()
        .toLowerCase()
        .replace(/[^\w\s\-]/g, ''); // Remove special characters except spaces, underscores, hyphens

    // Step 3: Replace spaces, underscores, and multiple consecutive separators with single hyphen
    normalized = normalized
        .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphen
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens

    // Step 4: Return the result
    return normalized;
}

// Test cases
console.log(toKebabCase("Hello World")); // "hello-world"
console.log(toKebabCase(" API_Response Code ")); // "api-response-code"
console.log(toKebabCase("test-case")); // "test-case"
console.log(toKebabCase("___multiple___underscores___")); // "multiple-underscores"
console.log(toKebabCase("")); // ""

// Error case
try {
    toKebabCase(123);
} catch (error) {
    console.error(error.message); // "Input must be a non-null string"
}