---
name: monet-ai
description: |
  Monet AI - AI content generation API SDK. Use when you need to generate videos, images, music, 
  or lip-sync content via API. Supports Sora, Wan, Hailuo, Kling, GPT-4o, Suno, Udio, HeyGen and more.
  Ideal for AI agents that need to create multimedia content.
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

AI content generation API skill for AI agents.

## When to Use

Use this skill when:
- You need to generate video content (Sora, Wan, Hailuo, Kling)
- You need to generate images (GPT-4o, Stable Diffusion, etc.)
- You need to generate music (Suno, Udio)
- You need to create lip-sync videos (HeyGen, F5-TTS)
- You want to integrate AI generation capabilities into your agent workflow

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

// Poll for result
while (task.status === "pending" || task.status === "processing") {
  await new Promise(r => setTimeout(r, 3000));
  task = await monet.getTask(task.id);
}

console.log("Result:", task.outputs);
```

## Supported Models

### Video
- **sora-2** - OpenAI Sora 2
- **wan-2-6** - Wan 2.6
- **wan-2-turbo** - Wan 2.6 Turbo
- **hailuo-2.3** - Hailuo 2.3
- **kling-motion-control** - Kling Motion Control
- **kling-1-6** - Kling 1.6

### Image
- **gpt-4o** - OpenAI GPT-4o
- **gpt-image-1-5** - OpenAI GPT Image 1.5
- **nano-banana-1/2** - Nano Banana series
- **wan-i-2-6** - Wan I2.6
- **wan-2-5** - Wan 2.5
- **seedream-4-0** - Seedream 4.0

### Music
- **suno-3.5** - Suno 3.5
- **udio-v1-6** - Udio v1.6

### Lip Sync
- **heygen** - HeyGen
- **f5-tts** - F5-TTS

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
  apiKey: "monet_xxx",           // Required: API key from monet.vision
  baseUrl: "https://monet.vision", // Optional: custom base URL
  timeout: 60000                  // Optional: timeout in ms
});
```

## Environment Variables

```bash
MONET_API_KEY=monet_xxx
```

## cURL Examples

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
