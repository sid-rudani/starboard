// Basic profanity filter — extend this list as needed
const BAD_WORDS = [
    'fuck', 'shit', 'ass', 'bitch', 'bastard', 'damn', 'crap',
    'piss', 'dick', 'cock', 'pussy', 'cunt', 'whore', 'slut',
    'nigger', 'nigga', 'faggot', 'fag', 'retard', 'rape', 'kill yourself', 'chutiya', 'jhatu', 'puka', 'yadava', 'solla', 'lanja', 'madarchod', 'bhenchod', 'nigg', 'chut', 'madar'
];

/**
 * Returns the matched bad word if found, or null if clean.
 */
export function findBadWord(text) {
    const lower = text.toLowerCase();
    return BAD_WORDS.find(word => lower.includes(word)) || null;
}
