import React, { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";

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
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhd9bPg-0vb1__6jouNLAIFJro_F9jZE7ITjN_uADPV40tU50qKzCiXCHOxhq2nbPmQttZu4wsySBCEJYKGOe_DcC6TqqczQIKJbCRmJpPTzoie_z5vKpq7V8RazW04DMulxfa57g8UPSI/s1600/Akash+Thosar+Image-Sairat+%2528%25E0%25A4%25B8%25E0%25A5%2588%25E0%25A4%25B0%25E0%25A4%25BA%25E0%25A4%259F%2529+Cast+and+Crew.jpg",
    videoId: "2gcsgfzqN8k",
  },
  {
    id: 5,
    title: "सैराट झालं जी",
    artist: "चिन्मयी श्रीपाद आणि अजय गोगावले",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhd9bPg-0vb1__6jouNLAIFJro_F9jZE7ITjN_uADPV40tU50qKzCiXCHOxhq2nbPmQttZu4wsySBCEJYKGOe_DcC6TqqczQIKJbCRmJpPTzoie_z5vKpq7V8RazW04DMulxfa57g8UPSI/s1600/Akash+Thosar+Image-Sairat+%2528%25E0%25A4%25B8%25E0%25A5%2588%25E0%25A4%25B0%25E0%25A4%25BA%25E0%25A4%259F%2529+Cast+and+Crew.jpg",
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
    id: 8,
    title: "याड लागलं",
    artist: "अजय गोगावले",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhd9bPg-0vb1__6jouNLAIFJro_F9jZE7ITjN_uADPV40tU50qKzCiXCHOxhq2nbPmQttZu4wsySBCEJYKGOe_DcC6TqqczQIKJbCRmJpPTzoie_z5vKpq7V8RazW04DMulxfa57g8UPSI/s1600/Akash+Thosar+Image-Sairat+%2528%25E0%25A4%25B8%25E0%25A5%2588%25E0%25A4%25B0%25E0%25A4%25BA%25E0%25A4%259F%2529+Cast+and+Crew.jpg",
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
  },
  /* --- NEW EMBEDDABLE LOVE SONGS ADDED BELOW --- */
{
    id: 15,
    title: "टिक टिक वाजते डोक्यात",
    artist: "सोनू निगम आणि सायली पंकज",
    image: "https://images.ottplay.com/images/duniyadari-poster.jpg",
    videoId: "5f1-YKtSQuc",
  },
  {
    id: 16,
    title: "मन उधाण वाऱ्याचे",
    artist: "शंकर महादेवन",
    image: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/aga-bai-arechya-et00000452-24-03-2017-19-15-46.jpg",
    videoId: "ssD0TNuMtIQ",
  },
  {
    id: 17,
    title: "परी म्हणू की सुंदरा",
    artist: "अवधूत गुप्ते आणि स्वप्नील बांदोडकर",
    image: "https://images.indianexpress.com/2022/05/Amruta-Khanvilkar.jpg",
    videoId: "lZMpnnehaxQ",
  },
  {
    id: 18,
    title: "तांबडी चामडी",
    artist: "क्रेटेक्स आणि श्रेयस",
    image: "https://c.saavncdn.com/839/Taambdi-Chaamdi-Marathi-2024-20240822161247-500x500.jpg",
    videoId: "kmjeMrjOjFA",
  },
  {
    id: 21,
    title: "राधा ही बावरी",
    artist: "स्वप्नील बांदोडकर",
    image: "https://c.saavncdn.com/835/Radha-Hi-Bawari-Marathi-2010-500x500.jpg",
    videoId: "UHCvbNgL15k",
  },
  {
    id: 23,
    title: "माउली माउली",
    artist: "अजय गोगावले",
    image: "https://c.saavncdn.com/393/Lai-Bhaari-Marathi-2014-500x500.jpg",
    videoId: "gWHfhYW99Wg",
  },
  {
    id: 24,
    title: "गालावर खळी",
    artist: "स्वप्नील बांदोडकर",
    image: "https://c.saavncdn.com/768/Duniyadari-Marathi-2013-500x500.jpg",
    videoId: "EwXxMBL1ZIM",
  }
];

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
  const isFirstRender = useRef(true);
  const loadedIndexRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Live Clock & Online Listeners State
  const [liveTime, setLiveTime] = useState("");
  const [onlineCount, setOnlineCount] = useState(34);

  const currentSong = songs[currentIndex];

  // Live Clock Interval
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).toLowerCase()
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    setOnlineCount((prevCount) => {
      // Randomly change count by -2, -1, 0, +1, or +2
      const change = Math.floor(Math.random() * 5) - 2;
      const newCount = prevCount + change;
      // Keep listener count within a realistic range (e.g., between 25 and 60)
      return Math.max(25, Math.min(60, newCount));
    });
  }, 4000); // Updates every 4 seconds

  return () => clearInterval(interval);
}, []);

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

  const nextSong = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  }, []);

  const previousSong = () => {
    setCurrentIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  // Initialize YouTube API Player
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
            if (playerInstanceRef.current.getDuration) {
              setDuration(playerInstanceRef.current.getDuration());
            }
          },
          onStateChange: (event) => {
            if (event.data === 1) { // Playing
              setIsPlaying(true);
              setDuration(playerInstanceRef.current.getDuration());
              startProgressInterval();
            } else if (event.data === 2) { // Paused
              setIsPlaying(false);
              clearProgressInterval();
            } else if (event.data === 0) { // Ended
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
  }, [startProgressInterval, nextSong]);

  // Load/Cue video logic
  useEffect(() => {
    if (!isReady || !playerInstanceRef.current) return;
    if (loadedIndexRef.current === currentIndex) return;

    loadedIndexRef.current = currentIndex;
    setLoadError(false);
    setCurrentTime(0);
    setDuration(0);

    if (isFirstRender.current) {
      // Cue paused on first visit so track does NOT auto-play
      playerInstanceRef.current.cueVideoById({
        videoId: currentSong.videoId,
        startSeconds: 0,
      });
      setIsPlaying(false);
      isFirstRender.current = false;
    } else {
      // Auto-play when switching songs via user action
      playerInstanceRef.current.loadVideoById({
        videoId: currentSong.videoId,
        startSeconds: 0,
      });
      setIsPlaying(true);
    }
  }, [currentIndex, isReady, currentSong.videoId]);

  const togglePlayPause = () => {
    const player = playerInstanceRef.current;
    if (!player || !isReady) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
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

      {/* Top Left - Live Clock */}
      <div className="clock">
        {liveTime || "10:58 pm"}
        <span></span>
      </div>

      {/* Top Center - Live Listeners Counter */}
      <div className="online">
        <span className="online-dot"></span>
        <strong>{onlineCount}</strong>
        <span>online</span>
      </div>

      {/* Hidden YouTube player frame */}
      <div style={{ display: "none" }}>
        <div ref={playerRef}></div>
      </div>

      <div className="player">
        {/* Spins continuously 360deg when playing */}
        <div className={`album ${isPlaying ? "playing" : ""}`}>
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