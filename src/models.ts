// ============ Model Constants ============

/** Available video generation models */
export const VIDEO_MODELS = {
  SORA_2: "sora-2",
  WAN_2_6: "wan-2-6",
  WAN_2_TURBO: "wan-2-turbo",
  HAILUO_2_3: "hailuo-2.3",
  KLING_MOTION_CONTROL: "kling-motion-control",
  KLING_1_6: "kling-1-6",
} as const;

/** Available image generation models */
export const IMAGE_MODELS = {
  GPT_4O: "gpt-4o",
  GPT_IMAGE_1_5: "gpt-image-1-5",
  NANO_BANANA_1: "nano-banana-1",
  NANO_BANANA_2: "nano-banana-2",
  WAN_I_2_6: "wan-i-2-6",
  WAN_2_5: "wan-2-5",
  SEEDREAM_4_0: "seedream-4-0",
} as const;

/** Available music generation models */
export const MUSIC_MODELS = {
  SUNO_3_5: "suno-3.5",
  UDIO_V1_6: "udio-v1-6",
} as const;

/** Available lip-sync models */
export const LIPSYNC_MODELS = {
  HEYGEN: "heygen",
  F5_TTS: "f5-tts",
} as const;

/** All supported models */
export const ALL_MODELS = {
  ...VIDEO_MODELS,
  ...IMAGE_MODELS,
  ...MUSIC_MODELS,
  ...LIPSYNC_MODELS,
} as const;

/** Model lists by type */
export const MODELS_BY_TYPE = {
  video: Object.values(VIDEO_MODELS),
  image: Object.values(IMAGE_MODELS),
  music: Object.values(MUSIC_MODELS),
  lipsync: Object.values(LIPSYNC_MODELS),
} as const;
