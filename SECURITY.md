# Security Notes

Prim8 generates userscripts which execute in the context of arbitrary webpages. Treat all generated code as untrusted until manually reviewed.

## Current Safeguards
- Basic static validator blocks obvious network / credential access patterns.
- Backend logs prompts + scripts to local SQLite for traceability.

## Known Limitations / TODO
- Validator is heuristic and can be bypassed with obfuscation.
- No sandboxing of generated script (Tampermonkey executes with page privileges).
- No rate limiting or auth on the /generate endpoint.

## Recommended Manual Review Checklist
1. Search for network exfiltration (`fetch`, `XMLHttpRequest`, `websocket`).
2. Look for data access APIs (`document.cookie`, `localStorage`, `indexedDB`).
3. Ensure no DOM scraping of sensitive pages (banking, email, etc.).
4. Avoid credential form manipulation.

## Reporting
Open a GitHub issue with details if you discover a vulnerability.
