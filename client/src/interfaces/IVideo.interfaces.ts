/* export interface VideoProps {
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
} */

export interface YouTubePlayer {
  playVideo: () => void
  getCurrentTime: () => number
}

interface Subtitle {
  format: string
  subtitles: string
}

export interface ApiResponse {
  transcription: {
    subtitles: Subtitle[]
    languages: string[]
  }
  translation: {
    subtitles: Subtitle[]
    languages: string[]
  }
}

export interface VideoProps {
  name: string
  description: string
  url: string
  apiResponse: ApiResponse
}
