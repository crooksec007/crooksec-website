import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Upload, Film } from 'lucide-react';

export const VideoIntro = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current || videoError) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          setVideoError(true);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, videoError]);

  const handleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section
      id="video-intro"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      data-testid="video-intro-section"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,240,255,0.07) 0%, rgba(112,0,255,0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(112,0,255,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-cyan-500/20 rounded-full bg-cyan-500/5">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            See Us In Action
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Who We{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Really Are
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Watch how CrookSec engineers, defends, and innovates — across every layer of the digital frontier.
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          className="relative rounded-3xl overflow-hidden group"
          style={{
            scale,
            opacity,
            border: '1px solid rgba(0,240,255,0.15)',
            boxShadow:
              '0 0 0 1px rgba(112,0,255,0.1), 0 40px 80px -20px rgba(0,0,0,0.8), 0 0 60px -10px rgba(0,240,255,0.1)',
          }}
        >
          {/* Glow border animation */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none z-20"
            animate={{
              boxShadow: isPlaying
                ? '0 0 40px -5px rgba(0,240,255,0.3), inset 0 0 40px -20px rgba(0,240,255,0.05)'
                : '0 0 0px transparent',
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Video element — drop your file into public/intro.mp4 */}
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover bg-black"
            src="/services/intro.mp4"
            muted
            loop
            playsInline
            onEnded={() => setIsPlaying(false)}
            onError={() => { setVideoError(true); setIsPlaying(false); setHasStarted(false); }}
          />

          {/* No-source fallback overlay */}
          {videoError && (
            <div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4"
              style={{
                background: 'linear-gradient(135deg, rgba(2,6,23,0.97) 0%, rgba(10,0,30,0.95) 100%)',
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-2"
                style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)' }}
              >
                <Film className="w-9 h-9" style={{ color: '#00F0FF' }} strokeWidth={1.3} />
              </motion.div>
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white font-bold text-xl"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                No Video Loaded Yet
              </motion.h3>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-slate-400 text-sm text-center max-w-xs"
              >
                Drop your intro video into the{' '}
                <span className="text-cyan-400 mono font-semibold">public/</span> folder and name it{' '}
                <span className="text-cyan-400 mono font-semibold">intro.mp4</span>
              </motion.p>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm mono mt-2"
                style={{
                  background: 'rgba(0,240,255,0.08)',
                  border: '1px dashed rgba(0,240,255,0.3)',
                  color: '#00F0FF',
                }}
              >
                <Upload className="w-4 h-4" />
                public/intro.mp4
              </motion.div>
              <div className="absolute bottom-4 left-6 mono text-xs font-bold tracking-widest" style={{ color: 'rgba(0,240,255,0.3)' }}>
                CROOKSEC ™
              </div>
            </div>
          )}

          {/* Overlay — shown before play, only when no error */}
          {!hasStarted && !videoError && (
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(2,6,23,0.85) 0%, rgba(10,0,30,0.8) 100%)',
                backdropFilter: 'blur(2px)',
              }}
            >
              {/* Animated rings behind play button */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute w-32 h-32 rounded-full border border-cyan-500/20"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute w-24 h-24 rounded-full border border-cyan-500/30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 0.4, ease: 'easeInOut' }}
                />
                <motion.button
                  onClick={handlePlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)',
                    boxShadow: '0 0 40px -5px rgba(0,240,255,0.6)',
                  }}
                  data-testid="video-play-btn"
                >
                  <Play className="w-8 h-8 text-black ml-1" fill="black" />
                </motion.button>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-slate-400 text-sm mono tracking-wider"
              >
                Watch Our Story
              </motion.p>

              {/* Brand watermark */}
              <div
                className="absolute bottom-6 left-6 mono text-xs font-bold tracking-widest"
                style={{ color: 'rgba(0,240,255,0.4)' }}
              >
                CROOKSEC ™
              </div>
            </div>
          )}

          {/* Controls bar — shown after play starts */}
          {hasStarted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 z-20 px-6 py-4 flex items-center gap-4"
              style={{
                background: 'linear-gradient(to top, rgba(2,6,23,0.9) 0%, transparent 100%)',
              }}
            >
              <motion.button
                onClick={handlePlayPause}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,240,255,0.15)', border: '1px solid rgba(0,240,255,0.3)' }}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Play className="w-4 h-4 text-cyan-400 ml-0.5" />
                )}
              </motion.button>

              <motion.button
                onClick={handleMute}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-slate-400" />
                )}
              </motion.button>

              <div className="flex-1" />

              <div className="mono text-xs text-slate-500 tracking-wider">CROOKSEC™</div>

              <motion.button
                onClick={handleFullscreen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Maximize2 className="w-4 h-4 text-slate-400" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mt-8"
        >
          {[
            { value: '200+', label: 'Projects Delivered' },
            { value: '50+', label: 'Enterprise Clients' },
            { value: '3', label: 'Continents Served' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4, borderColor: 'rgba(0,240,255,0.3)' }}
              className="rounded-2xl p-5 text-center cursor-default"
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(148,163,184,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="text-2xl font-bold mono mb-1"
                style={{ color: '#00F0FF' }}
              >
                {stat.value}
              </div>
              <div className="text-slate-500 text-xs uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
