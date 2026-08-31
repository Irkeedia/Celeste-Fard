import { readFileSync, writeFileSync } from "node:fs";
const KEY = process.env.GEMINI_API_KEY;
const REF = "/home/mathieu/Projets/celeste-fard/scripts/refs";
const jobs = JSON.parse(readFileSync(process.argv[2], "utf8"));
const LIMIT = Number(process.argv[3] ?? 3);

async function one(job) {
  const input = [
    ...job.refs.map((n) => ({ type: "image", mime_type: "image/jpeg",
      data: readFileSync(`${REF}/${n}.jpg`).toString("base64") })),
    { type: "text", text: job.prompt },
  ];
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: { "x-goog-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ model: job.model, input,
      response_format: { type: "video", aspect_ratio: job.aspect, resolution: job.size } }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const j = await res.json();
  const v = j.steps?.flatMap((s) => s.content ?? []).find((c) => c.type === "video");
  if (!v?.data) throw new Error(`pas de video (status=${j.status})`);
  const buf = Buffer.from(v.data, "base64");
  writeFileSync(job.out, buf);
  return buf.length;
}

let cursor = 0;
const worker = async () => {
  while (cursor < jobs.length) {
    const job = jobs[cursor++];
    try { const n = await one(job); console.log(`OK   ${job.out}  ${(n/1e6).toFixed(1)}Mo`); }
    catch (e) { console.log(`FAIL ${job.out}  ${e.message.slice(0,160)}`); }
  }
};
await Promise.all(Array.from({ length: Math.min(LIMIT, jobs.length) }, worker));
console.log("--- termine ---");
