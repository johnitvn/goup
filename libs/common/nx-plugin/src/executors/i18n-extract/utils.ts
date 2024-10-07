import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export function findFiles(dir: string, extensions: string[]): string[] {
  let results: string[] = [];
  const list = readdirSync(dir);

  list.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(findFiles(filePath, extensions));
    } else if (extensions.some((ext) => file.endsWith(ext))) {
      results.push(filePath);
    }
  });

  return results;
}

interface KeywordData {
  value: string;
  description: string;
  file: string;
  params: string[];
}

export function extractPipe(
  content: string,
  file: string,
  ignoreKeywords: string[] = [],
  existingKeywords: Record<string, KeywordData>
): Record<string, KeywordData> {
  const result: Record<string, KeywordData> = { ...existingKeywords };

  // Regular expression to match the translator pipe and capture keyword, value, description, and arguments
  const regex =
    // eslint-disable-next-line no-useless-escape
    /{{\s*'([\w\.\-]+)'\s*\|\s*translator\s*(?:\:\s*'([^']*)'\s*)?(?:\:\s*'([^']*)'\s*)?(?:\:\s*\{([^}]*)\}\s*)?}}/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const [_, keyword, value = '', description = '', argsString = ''] = match;

    // Skip if keyword is in the ignoreKeywords list
    if (shouldIgnore(keyword, ignoreKeywords)) continue;

    // Throw error if keyword already exists (either in result or passed in existingKeywords)

    // Extract arguments as a list from the string { name: 'John', age: 30, job: variable }
    const argumentsArray = argsString
      .split(',')
      .map((arg) => arg.split(':')[0].trim())
      .filter((arg) => arg.length > 0);

    const rows = content.split('\n');
    const matchRow = rows.find((r) => r.includes(match[0]));
    if (result[keyword]) {
      throw new Error(`Duplicate keyword: ${keyword} at ${file}:${rows.indexOf(matchRow) + 1}`);
    }

    if (value.trim().length === 0) {
      throw new Error(`Empty default value: ${keyword} at ${file}:${rows.indexOf(matchRow) + 1}`);
    }

    if (description.trim().length === 0) {
      console.warn(
        `Empty description value: "${keyword}" - "${value.trim()}" at ${file}:${rows.indexOf(matchRow) + 1}`
      );
    }

    // Add the keyword and its details to the result
    result[keyword] = {
      value: value.trim(),
      description: description.trim(),
      file,
      params: argumentsArray,
    };
  }

  return result;
}

// Function to check if a keyword should be ignored based on the ignoreKeywords array
function shouldIgnore(keyword: string, ignoreKeywords: string[]): boolean {
  return ignoreKeywords.some((ignoreKey) => {
    if (ignoreKey.endsWith('.*')) {
      // Match any keyword that starts with the base of the ignoreKey
      const baseKey = ignoreKey.replace('.*', '');
      return keyword.startsWith(baseKey);
    } else {
      return keyword === ignoreKey;
    }
  });
}
export function extractMarker(
  content: string,
  file: string,
  ignoreKeywords: string[] = [],
  existingKeywords: Record<string, KeywordData> = {}
): Record<string, KeywordData> {
  const result: Record<string, KeywordData> = { ...existingKeywords };
  const regex = /marker\('([^']+)',\s*'([^']*)',\s*'([^']*)'(?:,\s*({[^}]+}))?\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const [_, keyword, value = '', description = '', argsString = ''] = match;

    // Skip if keyword is in the ignoreKeywords list
    if (shouldIgnore(keyword, ignoreKeywords)) continue;

    // Extract arguments as a list from the string { name: 'John', age: 30, job: variable }
    const argumentsArray = argsString
      ? argsString
          .slice(1, -1) // Remove curly braces
          .split(',')
          .map((arg) => arg.split(':')[0].trim())
          .filter((arg) => arg.length > 0)
      : [];

    const rows = content.split('\n');
    const matchRow = rows.find((r) => r.includes(match[0]));
    if (result[keyword]) {
      throw new Error(`Duplicate keyword: ${keyword} at ${file}:${rows.indexOf(matchRow) + 1}`);
    }

    if (value.trim().length === 0) {
      throw new Error(`Empty default value: ${keyword} at ${file}:${rows.indexOf(matchRow) + 1}`);
    }

    // Allow empty description without throwing an error
    if (description.trim().length === 0) {
      console.warn(
        `Empty description value: "${keyword}" - "${value.trim()}" at ${file}:${rows.indexOf(matchRow) + 1}`
      );
    }

    // Add the keyword and its details to the result
    result[keyword] = {
      value: value.trim(),
      description: description.trim(),
      file,
      params: argumentsArray,
    };
  }

  return result;
}

export function extractService(
  content: string,
  file: string,
  ignoreKeywords: string[] = [],
  existingKeywords: Record<string, KeywordData> = {}
): Record<string, KeywordData> {
  const result: Record<string, KeywordData> = { ...existingKeywords };

  // Cập nhật regex để nhận cả translator.translate và translator.instant
  const regex = /\.(translate|instant)\('([^']+)',\s*'([^']*)',\s*'([^']*)'(?:,\s*({[^}]+}))?\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, method, keyword, value = '', description = '', argsString = ''] = match;

    // Skip if keyword is in the ignoreKeywords list
    if (shouldIgnore(keyword, ignoreKeywords)) continue;

    // Extract arguments as a list from the string { name: 'John', age: 30, job: variable }
    const argumentsArray = argsString
      ? argsString
          .slice(1, -1) // Remove curly braces
          .split(',')
          .map((arg) => arg.split(':')[0].trim())
          .filter((arg) => arg.length > 0)
      : [];

    const rows = content.split('\n');
    const matchRow = rows.find((r) => r.includes(match[0]));
    if (result[keyword]) {
      throw new Error(`Duplicate keyword: ${keyword} at ${file}:${rows.indexOf(matchRow) + 1}`);
    }

    if (value.trim().length === 0) {
      throw new Error(`Empty default value: ${keyword} at ${file}:${rows.indexOf(matchRow) + 1}`);
    }

    if (description.trim().length === 0) {
      console.warn(
        `Empty description value: "${keyword}" - "${value.trim()}" at ${file}:${rows.indexOf(matchRow) + 1}`
      );
    }

    // Add the keyword and its details to the result
    result[keyword] = {
      value: value.trim(),
      description: description.trim(),
      file,
      params: argumentsArray,
    };
  }

  return result;
}
