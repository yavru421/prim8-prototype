# Prim8 Prototype

TypeScript backend + Tampermonkey userscript that requests AI-generated userscripts.

## Components
- **Backend**: Express server exposing POST /generate.
- **Userscript**: Floating UI to send prompt and inject returned script.

## Setup
```bash
npm install
cp .env.example .env # edit LLAMA_API_KEY
npm run dev
```
Server listens on `:5000` by default.

## Environment
`.env`:
```
LLAMA_API_KEY=your_key_here
PORT=5000
ALLOW_ORIGINS=*
```

## Userscript
Edit `userscript/prim8.user.js` replacing `http://127.0.0.1:5000` if needed, then install in Tampermonkey.

## Validation
Current validator blocks obvious dangerous tokens, but you must still review generated code.

## Roadmap
- Stronger static analysis / AST parsing.
- Script signature hashing.
- Optional moderation of prompts.
- Auth & rate limiting.

## License
MIT
