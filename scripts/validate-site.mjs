import { access, readFile } from "node:fs/promises";

const html = await readFile("index.html", "utf8");
if (!html.includes('<meta name="robots" content="noindex, nofollow" />')) {
  throw new Error("Beta pages must stay out of search indexes.");
}
if (!html.includes('class="beta-banner"')) {
  throw new Error("Beta pages must display a preview banner.");
}
if (html.includes('<link rel="canonical" href="https://pavu.cn/" />')) {
  throw new Error("Beta pages must not claim the production canonical URL.");
}
const requiredFiles = [
  ".nojekyll",
  "app.js",
  "assets/pavu-icon.png",
  "favicon.svg",
  "index.html",
  "styles.css",
];

for (const file of requiredFiles) {
  await access(file);
}

for (const attribute of ["href", "src"]) {
  const pattern = new RegExp(`${attribute}="([^"]+)"`, "g");
  for (const [, reference] of html.matchAll(pattern)) {
    if (
      reference.startsWith("#") ||
      reference.startsWith("https://") ||
      reference.startsWith("http://") ||
      reference.startsWith("mailto:")
    ) {
      continue;
    }

    const path = reference.split(/[?#]/, 1)[0];
    await access(path);
  }
}

const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.has(anchor)) {
    throw new Error(`Missing anchor target: #${anchor}`);
  }
}

if (!html.includes("data-en=") || !html.includes("data-zh=")) {
  throw new Error("Bilingual content markers are missing.");
}

console.log("Static site validation passed.");
