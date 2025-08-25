// Basic heuristic validator; expand with real AST parsing later.

const FORBIDDEN_PATTERNS: RegExp[] = [
  /document\.cookie/i,
  /localStorage/i,
  /sessionStorage/i,
  /indexedDB/i,
  /fetch\s*\(/i,
  /XMLHttpRequest/i,
  /websocket/i,
  /navigator\.clipboard/i
];

export function validateScript(jsCode: string): void {
  for (const pat of FORBIDDEN_PATTERNS) {
    if (pat.test(jsCode)) {
      throw new Error(`Forbidden pattern detected: ${pat}`);
    }
  }
  // Size guard
  if (jsCode.length > 20_000) throw new Error('Script too large');
}
