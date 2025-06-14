import { create } from 'zustand';
import { Howl } from 'howler';

interface SoundState {
  backgroundMusic: Howl | null;
  isMuted: boolean;
  volume: number;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  playEffect: (soundPath: string, vol?: number) => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  playEffectOnTime: (soundPath: string, duration: number, vol?: number) => void;

}

export const useSoundStore = create<SoundState>((set, get) => {
  const backgroundMusic = new Howl({
    src: [''], // Replace with your background music file path
    loop: true,
    volume: 0.5,
  });

  return {
    backgroundMusic,
    isMuted: false,
    volume: 1,

    playBackgroundMusic: () => {
      if (!get().isMuted) {
        get().backgroundMusic?.play();
      }
    },

    stopBackgroundMusic: () => {
      get().backgroundMusic?.stop();
    },

    playEffect: (soundPath, vol) => {
      if (!get().isMuted) {
        new Howl({ src: [soundPath], volume: vol ?? get().volume }).play();
      }
    },
    playEffectOnTime: (soundPath, duration, vol) => {
      if (!get().isMuted) {
        const sound = new Howl({ src: [soundPath], volume: vol ?? get().volume });
        const soundId = sound.play();
        setTimeout(() => {
          sound.stop(soundId);
        }, duration);
      }
    },

    toggleMute: () => {
      set((state) => {
        const newMuted = !state.isMuted;
        state.backgroundMusic?.mute(newMuted);
        return { isMuted: newMuted };
      });
    },

    setVolume: (vol: number) => {
      set((state) => {
        return { volume: vol };
      });
    }
  };
});
