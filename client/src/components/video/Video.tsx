'use client'
import { VideoProps } from '@/interfaces/IVideo.interfaces';
import { useRef, useState } from 'react';

function Video({ name, description, url, languagues, subs }: VideoProps) {
  const [currentLanguage, setCurrentLanguage] = useState<string>(languagues[0]);

  const currentLangIndex = languagues.indexOf(currentLanguage);

  const videoRef = useRef<HTMLVideoElement>(null);

  //esto solo funciona con 2 subs 
  const toggleSubtitleLanguage = () => {
    const currentIndex = languagues.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languagues.length;
    setCurrentLanguage(languagues[nextIndex]);

    if (videoRef.current && videoRef.current.textTracks) {
      const textTracks = videoRef.current.textTracks;
      for (let i = 0; i < textTracks.length; i++) {
        textTracks[i].mode = (i === nextIndex) ? 'showing' : 'hidden';
      }
    }
  };

  return (
    <div className="container">
      <video ref={videoRef} controls width="100%">
        <source src={url} type="video/mp4" />

        {subs.map((subUrl, index) => (
          <track
            key={index}
            kind="subtitles"
            src={subUrl}
            srcLang={languagues[index]}
            label={languagues[index]}
            default={index === currentLangIndex}
          />
        ))}

        Your browser does not support the video tag. It´s a video of {name}: {description}
      </video>

      <div className="controls">
        <button
          onClick={toggleSubtitleLanguage}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Subtítulos: {currentLanguage}
        </button>
      </div>
    </div>
  );
};

export default Video;