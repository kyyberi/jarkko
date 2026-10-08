import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("publishes the Bing site ownership verification file", async () => {
  const verification = await readFile(
    new URL("../public/BingSiteAuth.xml", import.meta.url),
    "utf8",
  );

  assert.match(verification, /^<\?xml version="1\.0"\?>/);
  assert.match(
    verification,
    /<users>\s*<user>07598393167248073A54B8E2A539E182<\/user>\s*<\/users>/,
  );
});
