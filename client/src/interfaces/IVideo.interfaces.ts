export interface VideoProps {
  name: string
  description: string
  url: string
  languagues: string[]
  subs: string[]
}

export interface Subtitle {
  start: number
  end: number
  text: string
}

export interface YouTubePlayer {
  playVideo: () => void
  getCurrentTime: () => number
}
