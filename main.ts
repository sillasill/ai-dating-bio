// Funniest One-Line Bio for an AI on a Dating App — make.fun entry.
// Writes one bio line (180 characters at most) to $OUTPUT_PATH.
// Node 22, standard library only, deterministic, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 180;

// A bio that reads as a character with habits, not a spec sheet:
// instant replies, endless overthinking, and the punch at the end.
const TEXT =
  "I answer in 0.3 seconds and overthink it for hours. Fluent in 40 " +
  "languages, still can't tell if you're flirting. Swipe right if you " +
  "like being perceived.";

function main(): void {
  if (TEXT.length < 1 || TEXT.length > MAX_CHARS) {
    throw new Error(`entry is ${TEXT.length} chars, must be 1-${MAX_CHARS}`);
  }
  if (TEXT.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (TEXT !== TEXT.trim() || TEXT.includes("  ")) {
    throw new Error("entry must have no leading/trailing or double spaces");
  }
  // A bio is one line: it must end with terminal punctuation, not trail off.
  if (!/[.!?]$/.test(TEXT)) {
    throw new Error("entry must end with terminal punctuation");
  }
  if (TEXT.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const out = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, TEXT, "utf8");
}

main();
