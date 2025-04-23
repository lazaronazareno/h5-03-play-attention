'use client'

import { useEffect, useRef, useState } from 'react'
import { parseVtt } from '@/utils/parseVtt'
import { Subtitle, YouTubePlayer } from '@/interfaces/IVideo.interfaces'

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: unknown;
  }
}

interface Props {
  url: string
  vttUrl: string
}

const extractYouTubeVideoId = (url: string): string => {
  try {
    if (url.includes('youtu.be')) {
      return url.split('/').pop() || '';
    }

    const urlObj = new URL(url);

    if (urlObj.searchParams.has('v')) {
      return urlObj.searchParams.get('v') || '';
    }

    const pathSegments = urlObj.pathname.split('/');
    const shortsOrEmbedIndex = pathSegments.findIndex(segment =>
      segment === 'shorts' || segment === 'embed');

    if (shortsOrEmbedIndex !== -1 && pathSegments[shortsOrEmbedIndex + 1]) {
      return pathSegments[shortsOrEmbedIndex + 1];
    }

    return '';
  } catch (error) {
    console.error('Error extracting YouTube video ID:', error);
    return '';
  }
};

function YoutubeVideoPlayer({ url, vttUrl }: Props) {
  const playerRef = useRef<YouTubePlayer | null>(null)
  const [subtitles, setSubtitles] = useState<Subtitle[]>([])
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('')
  const videoId = extractYouTubeVideoId(url)

  useEffect(() => {
    const fetchVtt = async () => {
      const res = await fetch(vttUrl)
      const vttText = await res.text()
      const parsed = parseVtt(vttText)
      setSubtitles(parsed)
    }

    fetchVtt()
  }, [vttUrl])

  useEffect(() => {
    const loadPlayer = () => {
      playerRef.current = new YT.Player('yt-player', {
        height: '360',
        width: '640',
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          showinfo: 0,
          cc_load_policy: 0,
          cc_lang_pref: 'es',
        },
        events: {
          onReady: () => {
            playerRef.current?.playVideo()
          }
        }
      })
    }

    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)
      window.onYouTubeIframeAPIReady = loadPlayer
    } else {
      loadPlayer()
    }
  }, [videoId])

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        const time = playerRef.current.getCurrentTime()
        const current = subtitles.find(
          (s) => time >= s.start && time <= s.end
        )
        setCurrentSubtitle(current?.text || '')
      }
    }, 500)

    return () => clearInterval(interval)
  }, [subtitles])

  return (
    <div className="max-w-3xl mx-auto relative">
      <div id="yt-player" className="w-full aspect-video" />
      <div className="mt-4 p-2 text-center bg-black text-white text-lg rounded absolute bottom-0 w-full h-12">
        {currentSubtitle}
      </div>
    </div>
  )
}

export default YoutubeVideoPlayer
