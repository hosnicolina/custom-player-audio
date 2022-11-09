import { useRef, useState, useEffect } from 'react'

const formatTime = (duration) => {
  if (!duration) return;
  const min = parseInt(duration / 60, 10)
  const sec = parseInt(duration % 60)
  return `${min}:${sec < 10 ? '0' + String(sec) : sec}`
}
const formatTimeCurrent = (currentTime) => {
  let mins = Math.floor(currentTime / 60);
  let secs = Math.floor(currentTime % 60);
  return `${mins}:${secs < 10 ? '0' + String(secs) : secs}`
}

function App() {
  const audioRef = useRef()
  const [play, setPlay] = useState(false)
  const [muted, setMuted] = useState(false)
  const [duration, setDuration] = useState('00:00')
  const [currentTime, setCurrentTime] = useState('0:00')
  const [currentTimeProgress, setcurrentTimeProgress] = useState(0)

  const playMusic = () => {
    setPlay(!play)
    const music = play ? audioRef.current.pause() : audioRef.current.play()
  }
  const playMuted = () => {
    setMuted(!muted)
    const music = muted
      ? (audioRef.current.muted = false)
      : (audioRef.current.muted = true)
  }

  const updateTime = () => {
    setcurrentTimeProgress(audioRef.current.currentTime * 100 / audioRef.current.duration)
    setCurrentTime(formatTimeCurrent(audioRef.current.currentTime))
  }

  useEffect(() => {
    if (audioRef) {
      console.log('llego', audioRef.current.duration)
      setDuration(formatTime(audioRef.current.duration))
    }
  }, [audioRef])

  return (
    <div className="container">
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        src="../y2mate.com - Sebastián Yatra  Tacones Rojos 20211022 0201.mp3"
      ></audio>
      <div className="custom-play">
        <div className="custom-play-title">
          Conjure fadsuhflksudhfkluhsdlfuh
        </div>
        <div className="custom-play-icon">
          {play ? (
            <i onClick={playMusic} className="bi bi-pause-fill"></i>
          ) : (
            <i onClick={playMusic} className="bi bi-play-fill"></i>
          )}
        </div>
        <div className="custom-time-currem">
          {currentTime}/{duration}
        </div>
        <div className="custom-play-duration">
          <div className="current-time"></div>
          <div 
            style={{
              width: `${currentTimeProgress}%`
            }}
          className="current-time progress"></div>
        </div>
        <div className="custom-volumen-icon">
          {muted ? (
            <i onClick={playMuted} className="bi bi-volume-mute-fill"></i>
          ) : (
            <i onClick={playMuted} className="bi bi-volume-down-fill"></i>
          )}
        </div>
        <div className="custom-play-duration">{duration}</div>
      </div>
    </div>
  )
}

export default App
