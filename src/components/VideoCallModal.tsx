import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Users, Construction } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface VideoCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomName: string;
  participants?: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
}

const VideoCallModal = ({ open, onOpenChange, roomName, participants = [] }: VideoCallModalProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Placeholder participants for demo
  const demoParticipants = participants.length > 0 ? participants : [
    { id: '1', name: 'You', avatar: undefined },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Video Call - {roomName}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Construction className="h-4 w-4 text-accent" />
            <span className="text-accent font-medium">Feature Under Development</span>
          </DialogDescription>
        </DialogHeader>

        {/* Video Grid */}
        <div className="flex-1 bg-muted/50 rounded-lg p-4 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Video className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Video Calling Coming Soon</h3>
              <p className="text-muted-foreground max-w-sm">
                We're working on bringing you real-time video calls so you can study face-to-face with your group.
              </p>
            </div>
          </div>

          {/* Participant tiles (placeholder layout) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 opacity-30">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="aspect-video bg-muted rounded-lg flex items-center justify-center"
              >
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-secondary text-lg">
                    ?
                  </AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 py-4">
          <Button
            variant={isMuted ? 'destructive' : 'secondary'}
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => setIsMuted(!isMuted)}
            disabled
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <Button
            variant={isVideoOff ? 'destructive' : 'secondary'}
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => setIsVideoOff(!isVideoOff)}
            disabled
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>

          <Button
            variant="destructive"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <PhoneOff className="h-5 w-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12 rounded-full"
            disabled
          >
            <Users className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Video calls will be available in a future update. Stay tuned!
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCallModal;
