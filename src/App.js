import React, { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";

// videoId = the part after "v=" in a YouTube URL, e.g.
// https://www.youtube.com/watch?v=fZ5Z1pn3HTs -> "fZ5Z1pn3HTs"
//
// The 3 below are verified working YouTube videos for the actual songs.
// Replace the "REPLACE_ME_..." ids with real video ids you've checked
// yourself (open the YouTube link, confirm it's the right song, copy
// the id from the URL).
const songs = [
  {
    id: 1,
    title: "गुलाबी साडी",
    artist: "संंजू राठोड आणि जी-स्पार्क",
    image: "https://static.toiimg.com/thumb/msid-109594107,width-1280,height-720,imgsize-104414,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    videoId: "B_6d3RBiEN0",
  },
  {
    id: 2,
    title: "वेड लागलं",
    artist: "विशाल दादलानी आणि अजय गोगावले",
    image: "https://images.ottplay.com/images/ved-poster-663.jpg",
    videoId: "tlunj_2Wojo",
  },
  {
    id: 3,
    title: "चंद्रा",
    artist: "श्रेया घोषाळ",
    image: "https://images.indianexpress.com/2022/05/Amruta-Khanvilkar.jpg",
    videoId: "r6tU3GvJ5so",
  },
  {
    id: 4,
    title: "झिंगाट",
    artist: "अजय-अतुल",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhd9bPg-0vb1__6jouNLAIFJro_F9jZE7ITjN_uADPV40tU50qKzCiXCHOxhq2nbPmQttZu4wsySBCEJYKGOe_DcC6TqqczQIKJbCRmJpPTzoie_z5vKpq7V8RazW04DMulxfa57g8UPSI/s1600/Akash+Thosar+Image-Sairat+%2528%25E0%25A4%25B8%25E0%25A5%2588%25E0%25A4%25B0%25E0%25A4%25BE%25E0%25A4%259F%2529+Cast+and+Crew.jpg",
    videoId: "2gcsgfzqN8k",
  },
  {
    id: 5,
    title: "सैराट झालं जी",
    artist: "चिन्मयी श्रीपाद आणि अजय गोगावले",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhd9bPg-0vb1__6jouNLAIFJro_F9jZE7ITjN_uADPV40tU50qKzCiXCHOxhq2nbPmQttZu4wsySBCEJYKGOe_DcC6TqqczQIKJbCRmJpPTzoie_z5vKpq7V8RazW04DMulxfa57g8UPSI/s1600/Akash+Thosar+Image-Sairat+%2528%25E0%25A4%25B8%25E0%25A5%2588%25E0%25A4%25B0%25E0%25A4%25BE%25E0%25A4%259F%2529+Cast+and+Crew.jpg",
    videoId: "AQ-P5RR7r40",
  },
  {
    id: 6,
    title: "अप्सरा आली",
    artist: "श्रेया घोषाळ आणि बेला शेंडे",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/natarang-et00004089-24-03-2017-17-59-29.jpg",
    videoId: "mW67u_hWiSo",
  },
  {
    id: 7,
    title: "सूर निरागस हो",
    artist: "शंकर महादेवन",
    image: "http://www.impawards.com/intl/india/2015/posters/katyar_kaljat_ghusali_ver6_xlg.jpg",
    videoId: "IUzRhOJScuc",
  },
  {
    id: 8,
    title: "याड लागलं",
    artist: "अजय गोगावले",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhd9bPg-0vb1__6jouNLAIFJro_F9jZE7ITjN_uADPV40tU50qKzCiXCHOxhq2nbPmQttZu4wsySBCEJYKGOe_DcC6TqqczQIKJbCRmJpPTzoie_z5vKpq7V8RazW04DMulxfa57g8UPSI/s1600/Akash+Thosar+Image-Sairat+%2528%25E0%25A4%25B8%25E0%25A5%2588%25E0%25A4%25B0%25E0%25A4%25BE%25E0%25A4%259F%2529+Cast+and+Crew.jpg",
    videoId: "8uP0F3-tiP0",
  },
  {
    id: 9,
    title: "खेळ मांडला",
    artist: "अजय गोगावले",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/natarang-et00004089-24-03-2017-17-59-29.jpg",
    videoId: "9-nm7N-myDI",
  },
  {
    id: 10,
    title: "जीव रंगला",
    artist: "हरीहरन आणि श्रेया घोषाळ",
    image: "https://m.media-amazon.com/images/S/pv-target-images/1a03eb25cafc5d2de7e9ff02e1d959c24e2a653337a8cb4761e6470de113e1ae.jpg",
    videoId: "gtDPLOVPjkA",
  },
  {
    id: 11,
    title: "कोंबडी पळाली",
    artist: "आनंद शिंदे आणि वैशाली सामंत",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/jatra-et00000570-24-03-2017-19-15-56.jpg",
    videoId: "2KaDL9TSja0",
  },
  {
    id: 12,
    title: "वाजले की बारा",
    artist: "बेला शेंडे",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/natarang-et00004089-24-03-2017-17-59-29.jpg",
    videoId: "yO2V9sl6bhg",
  },
  {
    id: 13,
    title: "मला वेड लागले",
    artist: "स्वप्नील बांदोडकर आणि केतकी माटेगावकर",
    image: "https://cdn1.marathistars.com/wp-content/uploads/2013/09/Timepass-Marathi-Movie-First-Look-Poster-Revealed.jpg",
    videoId: "H6No6p8k-MY",
  },
  {
    id: 14,
    title: "धागा धागा",
    artist: "हर्षवर्धन वावरे आणि आनंदी जोशी",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/daagdi-chaawl-et00033100-01-09-2015-05-43-16.jpg",
    videoId: "JHraK6Z8Ty8",
  }
];

// Loads the YouTube IFrame API script once and resolves when ready.
function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }
    const existingScript = document.getElementById("youtube-iframe-api");
    if (!existingScript) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback();
      resolve(window.YT);
    };
  });
}

function App() {
  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const currentSong = songs[currentIndex];

  const clearProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const startProgressInterval = useCallback(() => {
    clearProgressInterval();
    progressIntervalRef.current = setInterval(() => {
      const player = playerInstanceRef.current;
      if (player && player.getCurrentTime) {
        setCurrentTime(player.getCurrentTime());
      }
    }, 500);
  }, []);

  // Initialize the YouTube player once.
  useEffect(() => {
    let cancelled = false;

    loadYouTubeAPI().then((YT) => {
      if (cancelled) return;
      playerInstanceRef.current = new YT.Player(playerRef.current, {
        height: "0",
        width: "0",
        videoId: songs[0].videoId,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setIsReady(true);
            setDuration(playerInstanceRef.current.getDuration());
          },
          onStateChange: (event) => {
            // 0 = ended, 1 = playing, 2 = paused
            if (event.data === 1) {
              setIsPlaying(true);
              setDuration(playerInstanceRef.current.getDuration());
              startProgressInterval();
            } else if (event.data === 2) {
              setIsPlaying(false);
              clearProgressInterval();
            } else if (event.data === 0) {
              setIsPlaying(false);
              clearProgressInterval();
              nextSong();
            }
          },
          onError: () => {
            setLoadError(true);
            setIsPlaying(false);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      clearProgressInterval();
      if (playerInstanceRef.current && playerInstanceRef.current.destroy) {
        playerInstanceRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load a new video whenever the current song changes.
  // Track the index we've already loaded so this doesn't re-fire on
  // every isReady/isPlaying change - only on an actual song change.
  const loadedIndexRef = useRef(null);

  useEffect(() => {
    if (!isReady || !playerInstanceRef.current) return;
    if (loadedIndexRef.current === currentIndex) return;

    loadedIndexRef.current = currentIndex;
    setLoadError(false);
    setCurrentTime(0);
    setDuration(0);

    // loadVideoById (unlike cueVideoById) always starts playback from
    // the given startSeconds, which guarantees the next song begins
    // at 0 instead of carrying over any leftover position/buffering
    // state from the previous video.
    playerInstanceRef.current.loadVideoById({
      videoId: currentSong.videoId,
      startSeconds: 0,
    });
    setIsPlaying(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isReady]);

  const togglePlayPause = () => {
    const player = playerInstanceRef.current;
    if (!player || !isReady) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const previousSong = () => {
    setCurrentIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  const handleSeek = (event) => {
    const newTime = Number(event.target.value);
    const player = playerInstanceRef.current;
    if (player && player.seekTo) {
      player.seekTo(newTime, true);
    }
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="page">
      <div className="background"></div>
      <div className="overlay"></div>

      {/* <div className="clock">
        10:58 pm
        <span></span>
      </div> */}

      {/* <div className="online">
        <span className="online-dot"></span>
        <strong>34</strong>
        <span>online</span>
      </div> */}

      {/* Hidden YouTube player - audio plays, no visible video */}
      <div style={{ display: "none" }}>
        <div ref={playerRef}></div>
      </div>

      <div className="player">
        <div className="album">
          <img src={currentSong.image} alt={currentSong.title} />
        </div>

        <div className="song-details">
          <h2>{currentSong.title}</h2>
          <p>{currentSong.artist}</p>

          {loadError && (
            <p style={{ color: "#ff8080", fontSize: "0.85em" }}>
              This track couldn't load — check the video id for "{currentSong.title}".
            </p>
          )}

          <input
            className="progress-input"
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            style={{
              background: `linear-gradient(to right, #ffffff ${progressPercent}%, rgba(255, 255, 255, 0.25) ${progressPercent}%)`,
            }}
          />

          <div className="time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="controls">
          <button className="previous" onClick={previousSong} title="Previous">
            |◀
          </button>

          <button
            className="play"
            onClick={togglePlayPause}
            title={isPlaying ? "Pause" : "Play"}
            disabled={!isReady}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <button className="next" onClick={nextSong} title="Next">
            ▶|
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;