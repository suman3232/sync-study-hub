import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Music,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Track {
  id: string;
  name: string;
  category: string;
  url: string;
}

// Free ambient sounds from public sources
const tracks: Track[] = [
  {
    id: 'rain',
    name: 'Rain Sounds',
    category: 'Nature',
    url: 'https://cdn.pixabay.com/audio/2022/05/13/audio_0108e60730.mp3',
  },
  {
    id: 'forest',
    name: 'Forest Ambience',
    category: 'Nature',
    url: 'https://cdn.pixabay.com/audio/2022/02/22/audio_44b79e1d6c.mp3',
  },
  {
    id: 'lofi',
    name: 'Lo-Fi Beats',
    category: 'Music',
    url: 'https://cdn.pixabay.com/audio/2022/11/22/audio_a09b3a3952.mp3',
  },
  {
    id: 'cafe',
    name: 'Coffee Shop',
    category: 'Ambience',
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_d8e1c8e3f8.mp3',
  },
];

const FocusMusicPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    audioRef.current = new Audio(currentTrack.url);
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const wasPlaying = isPlaying;
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);

    audioRef.current = new Audio(tracks[nextIndex].url);
    audioRef.current.loop = true;
    audioRef.current.volume = isMuted ? 0 : volume / 100;

    if (wasPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      setIsPlaying(false);
    }
  };

  const selectTrack = (index: number) => {
    const wasPlaying = isPlaying;
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setCurrentTrackIndex(index);
    audioRef.current = new Audio(tracks[index].url);
    audioRef.current.loop = true;
    audioRef.current.volume = isMuted ? 0 : volume / 100;

    if (wasPlaying) {
      audioRef.current.play().catch(console.error);
    }
  };

  return (
    <Card className={cn(
      "fixed bottom-4 right-4 w-72 transition-all duration-300 shadow-lg z-40",
      !isExpanded && "w-auto"
    )}>
      <CardContent className="p-3">
        {/* Collapsed View */}
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant={isPlaying ? "default" : "outline"}
            className="h-10 w-10 rounded-full shrink-0"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" />
            )}
          </Button>

          {isExpanded ? (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{currentTrack.name}</p>
              <p className="text-xs text-muted-foreground">{currentTrack.category}</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Focus Music</span>
            </div>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {/* Controls */}
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={nextTrack}
              >
                <SkipForward className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>

              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={(val) => {
                  setVolume(val[0]);
                  if (val[0] > 0) setIsMuted(false);
                }}
                className="flex-1"
              />
            </div>

            {/* Track List */}
            <div className="space-y-1">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(index)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    index === currentTrackIndex
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <p className="font-medium">{track.name}</p>
                  <p className="text-xs text-muted-foreground">{track.category}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FocusMusicPlayer;
