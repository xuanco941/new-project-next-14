import { useRef, useState, useCallback, useEffect } from 'react';

const useFullscreen = () => {
  const elementRef = useRef<HTMLIFrameElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const enterFullscreen = useCallback(() => {
    if (elementRef.current) {
      if (elementRef.current.requestFullscreen) {
        elementRef.current.requestFullscreen();
      } else if ((elementRef.current as any).mozRequestFullScreen) {
        // Firefox
        (elementRef.current as any).mozRequestFullScreen();
      } else if ((elementRef.current as any).webkitRequestFullscreen) {
        // Chrome, Safari và Opera
        (elementRef.current as any).webkitRequestFullscreen();
      } else if ((elementRef.current as any).msRequestFullscreen) {
        // IE/Edge
        (elementRef.current as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  }, []);


  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      // Firefox
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      // Chrome, Safari và Opera
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      // IE/Edge
      (document as any).msExitFullscreen();
    }
    setIsFullscreen(false);
  }, []);

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return { elementRef, isFullscreen, enterFullscreen, exitFullscreen, };
};

export default useFullscreen;
