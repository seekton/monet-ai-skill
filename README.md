# Monet AI SDK

AI content generation API SDK for video, image, music and lip-sync.

## Features

- 🚀 **Async Task Creation** - Create tasks and poll for results
- 📡 **Streaming Support** - SSE-based streaming for real-time updates
- 🎬 **Video Generation** - Sora, Wan, Hailuo, Kling models
- 🖼️ **Image Generation** - GPT-4o, Stable Diffusion, and more
- 🎵 **Music Generation** - Suno, Udio
- 💋 **Lip Sync** - HeyGen, F5-TTS
- 🔒 **API Key Authentication** - Secure Bearer token auth

## Installation

```bash
npm install monet-ai
```

## Quick Start

```typescript
import { MonetAI } from "monet-ai";

const monet = new MonetAI({ 
  apiKey: process.env.MONET_API_KEY! 
});

// Create a video generation task
const task = await monet.createTask({
  type: "video",
  input: {
    model: "sora-2",
    prompt: "A cat running in the park",
    duration: 5,
    aspectRatio: "16:9"
  }
});

console.log("Task ID:", task.id);
console.log("Status:", task.status);

// Poll for completion
while (task.status === "pending" || task.status === "processing") {
  await new Promise(r => setTimeout(r, 3000));
  task = await monet.getTask(task.id);
}

console.log("Result:", task.outputs);
```

## API Reference

### Configuration

```typescript
import { MonetAI, VIDEO_MODELS, IMAGE_MODELS } from "monet-ai";

const monet = new MonetAI({
  apiKey: "monet_xxx",           // Required: Your API key (starts with monet_)
  baseUrl: "https://monet.vision", // Optional: Custom base URL
  timeout: 60000                  // Optional: Request timeout in ms
});
```

### Create Task (Async)

Creates a task and returns immediately. Use `getTask()` to poll for results.

```typescript
const task = await monet.createTask({
  type: "video",                 // "video" | "image" | "music" | "lipsync"
  input: {
    model: "sora-2",
    prompt: "A cat running in the park",
    duration: 5,
    aspectRatio: "16:9",
    images: ["https://example.com/image1.jpg"]  // Optional: reference images
  },
  idempotencyKey: "unique-key-123"  // Optional: deduplication key
});

// Response:
// {
//   id: "task_xxx",
//   type: "video",
//   status: "pending",
//   input: { ... },
//   outputs: [],
//   created_at: "2026-02-14T12:00:00Z",
//   updated_at: "2026-02-14T12:00:00Z"
// }
```

### Create Task (Sync/Stream)

Creates a task and returns a ReadableStream for real-time SSE updates.

```typescript
const stream = await monet.createTaskStream({
  type: "video",
  input: {
    model: "sora-2",
    prompt: "A cat running"
  }
});

const decoder = new TextDecoder();
for await (const chunk of stream) {
  const data = decoder.decode(chunk);
  console.log("SSE:", data);
  // Parse SSE data: "data: {...}\n\n"
}
```

### Get Task

```typescript
const task = await monet.getTask("task_id_here");

// Response:
// {
//   id: "task_xxx",
//   type: "video",
//   status: "completed",  // "pending" | "processing" | "completed" | "failed"
//   input: { model: "sora-2", prompt: "..." },
//   outputs: [
//     { model: "sora-2", status: "completed", progress: 100, url: "https://..." }
//   ],
//   created_at: "2026-02-14T12:00:00Z",
//   updated_at: "2026-02-14T12:05:00Z"
// }
```

### List Tasks

```typescript
const list = await monet.listTasks({
  page: 1,
  pageSize: 20
});

// Response:
// {
//   items: [Task, Task, ...],
//   page: 1,
//   pageSize: 20,
//   total: 100
// }
```

## Supported Models

### Video Generation

| Model | Description |
|-------|-------------|
| `sora-2` | OpenAI Sora 2 |
| `wan-2-6` | Wan 2.6 |
| `wan-2-turbo` | Wan 2.6 Turbo |
| `hailuo-2.3` | Hailuo 2.3 |
| `kling-motion-control` | Kling Motion Control |
| `kling-1-6` | Kling 1.6 |

### Image Generation

| Model | Description |
|-------|-------------|
| `gpt-4o` | OpenAI GPT-4o |
| `gpt-image-1-5` | OpenAI GPT Image 1.5 |
| `nano-banana-1` | Nano Banana 1 |
| `nano-banana-2` | Nano Banana 2 |
| `wan-i-2-6` | Wan I2.6 |
| `wan-2-5` | Wan 2.5 |
| `seedream-4-0` | Seedream 4.0 |

### Music Generation

| Model | Description |
|-------|-------------|
| `suno-3.5` | Suno 3.5 |
| `udio-v1-6` | Udio v1.6 |

### Lip Sync

| Model | Description |
|-------|-------------|
| `heygen` | HeyGen |
| `f5-tts` | F5-TTS |

## Input Parameters

### Video Input

```typescript
{
  model: "sora-2",           // Required: model name
  prompt: "A cat running",   // Required: text prompt
  duration?: 5,               // Optional: video duration in seconds
  aspectRatio?: "16:9",      // Optional: "16:9" | "9:16" | "1:1"
  images?: ["url"],           // Optional: reference images
  videos?: ["url"]           // Optional: reference videos
}
```

### Image Input

```typescript
{
  model: "gpt-4o",          // Required: model name
  prompt: "A cute cat",       // Required: text prompt
  aspectRatio?: "16:9",      // Optional: "16:9" | "9:16" | "1:1" | ...
  style?: "modern",          // Optional: style option
  quality?: "high",          // Optional: "auto" | "low" | "medium" | "high"
  images?: ["url"]          // Optional: reference images (max varies by model)
}
```

### Music Input

```typescript
{
  model: "suno-3.5",         // Required: model name
  prompt: "Upbeat pop song"   // Required: text prompt
}
```

### Lip Sync Input

```typescript
{
  model: "heygen",           // Required: model name
  video: "https://...",       // Required: video URL
  audio: "https://..."       // Required: audio URL
}
```

## Error Handling

```typescript
try {
  const task = await monet.createTask({
    type: "video",
    input: { model: "sora-2", prompt: "test" }
  });
} catch (error) {
  console.error("Error:", error.message);
  
  // Common error codes:
  // - "unauthorized": Invalid or missing API key
  // - "VALIDATION_ERROR": Invalid input parameters
  // - "not_found": Task not found
  // - "rate_limit": Too many requests
}
```

## TypeScript Support

This SDK is written in TypeScript and provides full type definitions:

```typescript
import { 
  MonetAI, 
  Task, 
  TaskStatus,
  VideoInput,
  ImageInput 
} from "monet-ai";
```

## License

MIT

## cURL Examples

### Create Task (Async)

```bash
curl -X POST https://monet.vision/api/v1/tasks/async \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer monet_xxxxxxxx" \
  -d '{
    "type": "video",
    "input": {
      "model": "sora-2",
      "prompt": "A cat running in the park",
      "duration": 5,
      "aspectRatio": "16:9"
    },
    "idempotency_key": "unique-key-123"
  }'
```

### Create Task (Sync/Stream)

```bash
curl -X POST https://monet.vision/api/v1/tasks/sync \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer monet_xxxxxxxx" \
  -N \
  -d '{
    "type": "video",
    "input": {
      "model": "sora-2",
      "prompt": "A cat running"
    }
  }'
```

### Get Task

```bash
curl https://monet.vision/api/v1/tasks/task_xxx \
  -H "Authorization: Bearer monet_xxxxxxxx"
```

### List Tasks

```bash
curl "https://monet.vision/api/v1/tasks/list?page=1&pageSize=20" \
  -H "Authorization: Bearer monet_xxxxxxxx"
```
