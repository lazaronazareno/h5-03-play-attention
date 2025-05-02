import { Subtitle } from "@/interfaces/IVideo.interfaces"

export function parseVtt(vttText: string): Subtitle[] {
  const lines = vttText.split("\n").map((line) => line.trim())
  const subs: Subtitle[] = []

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("-->")) {
      const [startStr, endStr] = lines[i].split(" --> ")
      const text = lines[i + 1]
      subs.push({
        start: timeToSeconds(startStr),
        end: timeToSeconds(endStr),
        text,
      })
      i++
    }
  }

  return subs
}

function timeToSeconds(time: string): number {
  const [h, m, s] = time.split(":")
  const [sec, ms] = s.split(".")
  return (
    parseInt(h) * 3600 +
    parseInt(m) * 60 +
    parseInt(sec) +
    (ms ? parseInt(ms) / 1000 : 0)
  )
}
