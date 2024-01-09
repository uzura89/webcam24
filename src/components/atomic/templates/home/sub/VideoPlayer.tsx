import clsx from "clsx";
import { useRef, useEffect } from "react";
import YouTube from "react-youtube";

import { usePlayerStore } from "@/store/playerStore";

export function VideoPlayer(props: { height: number; youtubeVideoId: string }) {
  // player store
  const inTransition = usePlayerStore((state) => state.inTransition);
  const secondsUntilNext = usePlayerStore((state) => state.secondsUntilNext);
  // refs
  const playerEventRef = useRef<any>(null);
  const inTransitionRef = useRef<boolean>(false);

  function onPlayerReady(event: any) {
    playerEventRef.current = event.target;

    playerEventRef.current?.playVideo();
    playerEventRef.current?.setVolume(0);

    setTimeout(() => {
      if (!inTransitionRef.current) return;
      playerEventRef.current?.setVolume(15);
    }, 2000);

    setTimeout(() => {
      if (!inTransitionRef.current) return;
      playerEventRef.current?.setVolume(30);
    }, 3000);

    setTimeout(() => {
      if (!inTransitionRef.current) return;
      playerEventRef.current?.setVolume(60);
    }, 4000);
  }

  /**
   * Effects
   */

  useEffect(() => {
    inTransitionRef.current = inTransition;

    if (!inTransition) {
      playerEventRef.current?.setVolume(100);
    }
  }, [inTransition]);

  useEffect(() => {
    if (secondsUntilNext === 5) {
      let volume = 100;
      const interval = setInterval(() => {
        volume -= 10;
        playerEventRef.current?.setVolume(volume);
        if (volume <= 0) {
          clearInterval(interval);
        }
      }, 500);
    }
  }, [secondsUntilNext]);

  /**
   * Render
   */

  if (props.height < 0) {
    return null;
  }

  const opts = {
    height: props.height,
    width: "100%",
    playerVars: {
      autoplay: 1,
      loop: 1,
    },
  };

  return (
    <div className={clsx(inTransition ? "opacity-0" : "opacity-100")}>
      <YouTube
        videoId={props.youtubeVideoId}
        opts={opts}
        onReady={onPlayerReady}
      />
    </div>
  );
}
