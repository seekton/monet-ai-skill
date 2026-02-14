# Monet AI SDK

AI content generation API for video, image and music.

## Features

- 🚀 **Async Task Creation** - Create tasks and poll for results
- 📡 **Streaming Support** - SSE-based streaming for real-time updates
- 🎬 **Video Generation** - Sora, Wan, Hailuo, Kling, Veo, Doubao and more
- 🖼️ **Image Generation** - GPT-4o, Flux, Imagen, Ideogram and more
- 🎵 **Music Generation** - Suno, Udio
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

## Getting API Key

1. Visit https://monet.vision to register an account
2. After login, go to https://monet.vision/skills/keys to create an API Key
3. Configure the API Key in environment variables or code

If you don't have an API Key, ask your owner to apply at monet.vision.

## API Reference

### Configuration

```typescript
const monet = new MonetAI({
  apiKey: "monet_xxx",    // Required: Your API key
  timeout: 60000          // Optional: Request timeout in ms
});
```

### Create Task (Async)

Creates a task and returns immediately. Use `getTask()` to poll for results.

```typescript
const task = await monet.createTask({
  type: "video",                 // "video" | "image" | "music"
  input: {
    model: "sora-2",
    prompt: "A cat running in the park",
    duration: 5,
    aspectRatio: "16:9",
    images: ["https://example.com/image1.jpg"]
  },
  idempotencyKey: "unique-key-123"
});
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
}
```

### Get Task

```typescript
const task = await monet.getTask("task_id_here");
```

### List Tasks

```typescript
const list = await monet.listTasks({
  page: 1,
  pageSize: 20
});
```

## Supported Models

### Video Generation

#### Sora (OpenAI)
| Model | Parameters |
|-------|------------|
| sora-2 | prompt, images, **duration: 10\|15**, aspect_ratio: 16:9\|9:16 |
| sora-2-pro | prompt, images, **duration: 15\|25**, aspect_ratio: 16:9\|9:16 |

#### Veo (Google)
| Model | Parameters |
|-------|------------|
| veo-3-1-fast | prompt, images, aspect_ratio: 16:9\|9:16 |
| veo-3-1 | prompt, images, aspect_ratio: 16:9\|9:16 |
| veo-3-fast | prompt, images, negative_prompt |
| veo-3 | prompt, images, negative_prompt |

#### Wan
| Model | Parameters |
|-------|------------|
| wan-2-6 | prompt, images, **duration: 5\|10\|15**, resolution: 720p\|1080p, aspect_ratio: 16:9\|9:16\|4:3\|3:4\|1:1, shot_type: single\|multi |
| wan-2-5 | prompt, images, **duration: 5\|10**, resolution: 480p\|720p\|1080p, aspect_ratio: 16:9\|9:16\|4:3\|3:4\|1:1 |
| wan-2-2-flash | prompt, images, **duration: 5\|10**, resolution: 480p\|720p\|1080p, negative_prompt |
| wan-2-2 | prompt, images, **duration: 5\|10**, resolution: 480p\|1080p, aspect_ratio: 16:9\|9:16\|4:3\|3:4\|1:1, negative_prompt |

#### Kling
| Model | Parameters |
|-------|------------|
| kling-2-6 | prompt, images, **duration: 5\|10**, aspect_ratio: 1:1\|16:9\|9:16, **generate_audio: boolean** |
| kling-2-5 | prompt, images, **duration: 5\|10**, aspect_ratio: 1:1\|16:9\|9:16, negative_prompt |
| kling-v2-1-master | prompt, images, **duration: 5\|10**, aspect_ratio: 1:1\|16:9\|9:16, **strength: number**, negative_prompt |
| kling-v2-1 | prompt, images, **duration: 5\|10**, aspect_ratio: 1:1\|16:9\|9:16, **strength: number**, negative_prompt |
| kling-v2 | prompt, images, **duration: 5\|10**, aspect_ratio: 1:1\|16:9\|9:16, **strength: number**, negative_prompt |

#### Hailuo
| Model | Parameters |
|-------|------------|
| hailuo-2-3 | prompt, images, **duration: 6\|10**, resolution: 768p\|1080p |
| hailuo-2-3-fast | prompt, images, **duration: 6\|10**, resolution: 768p\|1080p |
| hailuo-02 | prompt, images, **duration: 6\|10**, resolution: 768p\|1080p |
| hailuo-01-live2d | prompt, images |
| hailuo-01 | prompt, images |

#### Doubao Seedance
| Model | Parameters |
|-------|------------|
| doubao-seedance-1-5-pro | prompt, images, **duration: number**, resolution: 480p\|720p, aspect_ratio: 1:1\|4:3\|16:9\|3:4\|9:16\|21:9, generate_audio |
| doubao-seedance-1-0-pro-fast | prompt, images, **duration: number**, resolution: 720p\|1080p, aspect_ratio: 1:1\|4:3\|16:9\|3:4\|9:16\|21:9 |
| doubao-seedance-1-0-pro | prompt, images, **duration: 5\|10**, resolution: 480p\|1080p, aspect_ratio: 1:1\|4:3\|16:9\|3:4\|9:16 |
| doubao-seedance-1-0-lite | prompt, images, **duration: 5\|10**, resolution: 480p\|720p\|1080p |

#### Special Features
| Model | Parameters |
|-------|------------|
| kling-motion-control | **prompt (required)**, **images (required)**, **videos (required)**, resolution: 720p\|1080p |
| runway-act-two | **images (required)**, **videos (required)**, aspect_ratio: 1:1\|4:3\|16:9\|3:4\|9:16\|21:9 |
| wan-animate-mix | **videos (required)**, **images (required)** |
| wan-animate-mix-pro | **videos (required)**, **images (required)** |
| wan-animate-move | **videos (required)**, **images (required)** |
| wan-animate-move-pro | **videos (required)**, **images (required)** |

### Image Generation

#### GPT (OpenAI)
| Model | Parameters |
|-------|------------|
| gpt-4o | prompt, images, aspect_ratio: 1:1\|4:3\|3:2\|16:9\|3:4\|2:3\|9:16, style |
| gpt-image-1-5 | prompt, **images (max 10)**, aspect_ratio: 1:1\|3:2\|2:3, quality: auto\|low\|medium\|high |

#### Nano Banana
| Model | Parameters |
|-------|------------|
| nano-banana-1 | prompt, **images (max 5)**, aspect_ratio: 1:1\|2:3\|3:2\|4:3\|3:4\|16:9\|9:16 |
| nano-banana-2 | prompt, **images (max 14)**, aspect_ratio: 1:1\|2:3\|3:2\|4:3\|3:4\|4:5\|5:4\|16:9\|9:16\|21:9, **resolution: 1K\|2K\|4K** |

#### Wan
| Model | Parameters |
|-------|------------|
| wan-i-2-6 | prompt, **images (max 4)**, aspect_ratio: 1:1\|4:3\|3:2\|16:9\|3:4\|2:3\|9:16\|21:9 |
| wan-2-5 | prompt, **images (max 2)**, aspect_ratio: 1:1\|4:3\|3:2\|16:9\|3:4\|2:3\|9:16\|21:9 |

#### Flux
| Model | Parameters |
|-------|------------|
| flux-2-dev | prompt, aspect_ratio: 1:1\|4:3\|3:2\|16:9\|3:4\|2:3\|9:16 |
| flux-kontext-pro | prompt, images, aspect_ratio: 1:1\|4:3\|3:2\|16:9\|3:4\|2:3\|9:16, style |
| flux-kontext-max | prompt, images, aspect_ratio: 1:1\|4:3\|3:2\|16:9\|3:4\|2:3\|9:16, style |
| flux-1-schnell | prompt |

#### Imagen (Google)
| Model | Parameters |
|-------|------------|
| imagen-3-0 | prompt, aspect_ratio: 1:1\|3:4\|4:3\|9:16\|16:9, style |
| imagen-4-0 | prompt, aspect_ratio: 1:1\|3:4\|4:3\|9:16\|16:9, style |

#### Ideogram
| Model | Parameters |
|-------|------------|
| ideogram-v2 | prompt, aspect_ratio: 1:1\|4:3\|3:2\|16:9\|3:4\|2:3\|9:16, style |
| ideogram-v3 | prompt, aspect_ratio: 1:1\|4:3\|3:2\|16:9\|3:4\|2:3\|9:16, style |

#### Others
| Model | Parameters |
|-------|------------|
| seedream-4-0 | prompt, **images (max 10)**, aspect_ratio: 1:1\|4:3\|3:2\|16:9\|3:4\|2:3\|9:16 |
| stability-1-0 | prompt, aspect_ratio: 1:1\|4:3\|3:2\|16:9\|3:4\|2:3\|9:16, style, negative_prompt |

### Music Generation

| Model | Parameters |
|-------|------------|
| suno-3.5 | prompt |
| udio-v1-6 | prompt |

## Input Parameters (Common)

### Video
```typescript
{
  model: "sora-2",           // Required
  prompt: "A cat running",   // Required
  duration?: 5 | 10 | 15,     // Optional (varies by model)
  aspectRatio?: "16:9",       // Optional
  images?: ["url"],           // Optional: reference images
  videos?: ["url"],           // Optional: reference videos
  resolution?: "720p",        // Optional (varies by model)
  negativePrompt?: "...",     // Optional
  generateAudio?: true,      // Optional (Kling 2.6, Doubao)
  shotType?: "single",       // Optional: single/multi (Wan 2.6)
  strength?: 0.8             // Optional: 0-1 (Kling V2)
}
```

### Image
```typescript
{
  model: "gpt-4o",          // Required
  prompt: "A cute cat",      // Required
  aspectRatio?: "16:9",      // Optional
  style?: "modern",          // Optional
  quality?: "high",          // Optional: auto|low|medium|high
  images?: ["url"],          // Optional: reference images (max varies)
  resolution?: "2K",          // Optional (Nano Banana 2 only)
  negativePrompt?: "..."     // Optional (Stability only)
}
```

### Music
```typescript
{
  model: "suno-3.5",        // Required
  prompt: "Upbeat pop song"  // Required
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
  // Common errors:
  // - "unauthorized": Invalid or missing API key
  // - "VALIDATION_ERROR": Invalid input parameters
  // - "not_found": Task not found
}
```

## TypeScript Support

```typescript
import { MonetAI, Task, TaskStatus } from "monet-ai";
```

## License

MIT

## curl Examples

### Create Video Task

```bash
curl -X POST https://monet.vision/api/v1/tasks/async \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer monet_xxx" \
  -d '{
    "type": "video",
    "input": {
      "model": "sora-2",
      "prompt": "A cat running in the park",
      "duration": 5,
      "aspectRatio": "16:9"
    }
  }'
```

### Create Image Task

```bash
curl -X POST https://monet.vision/api/v1/tasks/async \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer monet_xxx" \
  -d '{
    "type": "image",
    "input": {
      "model": "gpt-4o",
      "prompt": "A cute cat",
      "aspectRatio": "16:9"
    }
  }'
```

### Create Music Task

```bash
curl -X POST https://monet.vision/api/v1/tasks/async \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer monet_xxx" \
  -d '{
    "type": "music",
    "input": {
      "model": "suno-3.5",
      "prompt": "Upbeat pop song"
    }
  }'
```

### Get Task

```bash
curl https://monet.vision/api/v1/tasks/task_id \
  -H "Authorization: Bearer monet_xxx"
```

### List Tasks

```bash
curl "https://monet.vision/api/v1/tasks/list?page=1" \
  -H "Authorization: Bearer monet_xxx"
```
