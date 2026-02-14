---
name: monet-ai
description: |
  Monet AI - AI content generation API for video, image and music.
  Supports Sora, Wan, Hailuo, Kling, Veo, GPT-4o, Flux, Imagen, Suno and more.
metadata:
  openclaw:
    requires:
      bins: []
    install:
      - id: node
        kind: npm
        package: monet-ai
        label: Install monet-ai SDK (npm)
---

# Monet AI Skill

AI content generation API for AI agents.

## When to Use

Use this skill when:
- You need to generate video content (Sora, Wan, Hailuo, Kling, Veo)
- You need to generate images (GPT-4o, Flux, Imagen, Ideogram)
- You need to generate music (Suno, Udio)
- You want to integrate AI generation capabilities into your agent workflow

## Installation

```bash
npm install monet-ai
```

## Getting API Key

1. Visit https://monet.vision to register an account
2. After login, go to https://monet.vision/skills/keys to create an API Key
3. Configure the API Key in environment variables or code

If you don't have an API Key, ask your owner to apply at monet.vision.

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

// Poll for result
while (task.status === "pending" || task.status === "processing") {
  await new Promise(r => setTimeout(r, 3000));
  task = await monet.getTask(task.id);
}

console.log("Result:", task.outputs);
```

## Supported Models

### Video Generation

#### Sora (OpenAI)
| Model | Parameters |
|-------|------------|
| sora-2 | prompt, images, duration: 10\|15, aspect_ratio: 16:9\|9:16 |
| sora-2-pro | prompt, images, duration: 15\|25, aspect_ratio: 16:9\|9:16 |

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
| wan-2-6 | prompt, images, duration: 5\|10\|15, resolution: 720p\|1080p, aspect_ratio, shot_type |
| wan-2-5 | prompt, images, duration: 5\|10, resolution, aspect_ratio |
| wan-2-2-flash | prompt, images, duration: 5\|10, resolution, negative_prompt |
| wan-2-2 | prompt, images, duration: 5\|10, resolution, aspect_ratio, negative_prompt |

#### Kling
| Model | Parameters |
|-------|------------|
| kling-2-6 | prompt, images, duration: 5\|10, aspect_ratio, generate_audio |
| kling-2-5 | prompt, images, duration: 5\|10, aspect_ratio, negative_prompt |
| kling-v2-1-master | prompt, images, duration: 5\|10, aspect_ratio, strength, negative_prompt |
| kling-v2-1 | prompt, images, duration: 5\|10, aspect_ratio, strength, negative_prompt |
| kling-v2 | prompt, images, duration: 5\|10, aspect_ratio, strength, negative_prompt |

#### Hailuo
| Model | Parameters |
|-------|------------|
| hailuo-2-3 | prompt, images, duration: 6\|10, resolution: 768p\|1080p |
| hailuo-2-3-fast | prompt, images, duration: 6\|10, resolution |
| hailuo-02 | prompt, images, duration: 6\|10, resolution |
| hailuo-01-live2d | prompt, images |
| hailuo-01 | prompt, images |

#### Doubao Seedance
| Model | Parameters |
|-------|------------|
| doubao-seedance-1-5-pro | prompt, images, duration, resolution, aspect_ratio, generate_audio |
| doubao-seedance-1-0-pro-fast | prompt, images, duration, resolution, aspect_ratio |
| doubao-seedance-1-0-pro | prompt, images, duration: 5\|10, resolution, aspect_ratio |
| doubao-seedance-1-0-lite | prompt, images, duration: 5\|10, resolution |

#### Special Features
| Model | Parameters |
|-------|------------|
| kling-motion-control | prompt (required), images (required), videos (required), resolution |
| runway-act-two | images (required), videos (required), aspect_ratio |
| wan-animate-mix | videos (required), images (required) |
| wan-animate-mix-pro | videos (required), images (required) |
| wan-animate-move | videos (required), images (required) |
| wan-animate-move-pro | videos (required), images (required) |

### Image Generation

#### GPT (OpenAI)
| Model | Parameters |
|-------|------------|
| gpt-4o | prompt, images, aspect_ratio, style |
| gpt-image-1-5 | prompt, images (max 10), aspect_ratio, quality |

#### Nano Banana
| Model | Parameters |
|-------|------------|
| nano-banana-1 | prompt, images (max 5), aspect_ratio |
| nano-banana-2 | prompt, images (max 14), aspect_ratio, resolution: 1K\|2K\|4K |

#### Wan
| Model | Parameters |
|-------|------------|
| wan-i-2-6 | prompt, images (max 4), aspect_ratio |
| wan-2-5 | prompt, images (max 2), aspect_ratio |

#### Flux
| Model | Parameters |
|-------|------------|
| flux-2-dev | prompt, aspect_ratio |
| flux-kontext-pro | prompt, images, aspect_ratio, style |
| flux-kontext-max | prompt, images, aspect_ratio, style |
| flux-1-schnell | prompt |

#### Imagen (Google)
| Model | Parameters |
|-------|------------|
| imagen-3-0 | prompt, aspect_ratio, style |
| imagen-4-0 | prompt, aspect_ratio, style |

#### Ideogram
| Model | Parameters |
|-------|------------|
| ideogram-v2 | prompt, aspect_ratio, style |
| ideogram-v3 | prompt, aspect_ratio, style |

#### Others
| Model | Parameters |
|-------|------------|
| seedream-4-0 | prompt, images (max 10), aspect_ratio |
| stability-1-0 | prompt, aspect_ratio, style, negative_prompt |

### Music Generation

| Model | Parameters |
|-------|------------|
| suno-3.5 | prompt |
| udio-v1-6 | prompt |

## API Methods

### createTask(options)
Create an async task. Returns immediately with task ID.

```typescript
const task = await monet.createTask({
  type: "video",
  input: { model: "sora-2", prompt: "A cat" },
  idempotencyKey: "unique-key"
});
```

### createTaskStream(options)
Create a task with SSE streaming. Returns ReadableStream.

```typescript
const stream = await monet.createTaskStream({
  type: "video", 
  input: { model: "sora-2", prompt: "A cat" }
});
```

### getTask(taskId)
Get task status and result.

```typescript
const task = await monet.getTask("task_id");
```

### listTasks(options)
List tasks with pagination.

```typescript
const list = await monet.listTasks({ page: 1, pageSize: 20 });
```

## Configuration

```typescript
const monet = new MonetAI({
  apiKey: "monet_xxx",    // Required: API key from monet.vision
  timeout: 60000          // Optional: timeout in ms
});
```

## Environment Variables

```bash
MONET_API_KEY=monet_xxx
```

## curl Examples

### Create Task

```bash
curl -X POST https://monet.vision/api/v1/tasks/async \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer monet_xxx" \
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
curl https://monet.vision/api/v1/tasks/task_id \
  -H "Authorization: Bearer monet_xxx"
```

### List Tasks

```bash
curl "https://monet.vision/api/v1/tasks/list?page=1" \
  -H "Authorization: Bearer monet_xxx"
```
