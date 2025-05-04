'use client'
import { VideoProps } from '@/interfaces/IVideo.interfaces';
import { useEffect, useRef, useState } from 'react';

//TO DO: HACER QUE EL VIDEO SOLO CARGUE CUANDO SE ABRE, PASARLE UNA PROP O ALGO QUE LO HAGA CARGAR
function Video({ name, description, url, apiResponse }: VideoProps) {
  const [languagues, setLanguages] = useState<string[]>([]);
  const [subs, setSubs] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const transcriptionLanguages = apiResponse.transcription.languages;
    const translationLanguages = apiResponse.translation.languages;
    const allLanguages = [...transcriptionLanguages, ...translationLanguages];

    const transcriptionSubs = apiResponse.transcription.subtitles.map(sub => sub.subtitles);
    const translationSubs = apiResponse.translation.subtitles.map(sub => sub.subtitles);
    const allSubs = [...transcriptionSubs, ...translationSubs];

    setLanguages(allLanguages);
    setSubs(allSubs);
    setCurrentLanguage(allLanguages[0]);
  }, [apiResponse]);

  const toggleSubtitleLanguage = () => {
    const currentIndex = languagues.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languagues.length;
    setCurrentLanguage(languagues[nextIndex]);

    if (videoRef.current && videoRef.current.textTracks) {
      const textTracks = videoRef.current.textTracks;
      for (let i = 0; i < textTracks.length; i++) {
        textTracks[i].mode = i === nextIndex ? 'showing' : 'hidden';
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
            src={`data:text/vtt;charset=utf-8,${encodeURIComponent(subUrl)}`}
            srcLang={languagues[index]}
            label={languagues[index]}
            default={index === languagues.indexOf(currentLanguage)}
          />
        ))}

        Your browser does not support the video tag. It´s a video of {name}: {description}
      </video>

      {subs.length > 0 && (
        <div className="controls absolute top-0 right-0">
          <button
            onClick={toggleSubtitleLanguage}
            className="bg-violet-main capitalize cursor-pointer text-white font-bold py-2 px-4 rounded"
          >
            {currentLanguage}
          </button>
        </div>
      )}
    </div>
  );
}

export default Video;