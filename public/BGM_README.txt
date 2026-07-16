Drop your two music files here, named exactly:

  bgm-design.mp3   -> plays in UI/UX Designer mode
  bgm-sde.mp3      -> plays in Software Engineer mode

MP3, loopable, royalty-free. Volume is normalized to 0.35 in code
(TARGET_VOL in src/components/Cinema.jsx).

If a file is missing, the site falls back to the built-in generative
score automatically, so nothing breaks in the meantime.
