---
name: monet-ai
description: Monet AI - AI content generation API for video, image, music and lip-sync. Use when you need to generate videos, images, music, or lip-sync content via API.
metadata:
  openclaw:
    requires:
      bins: []
    install: []
---

# Monet AI

AI content generation API for AI agents.

## Installation

```bash
npm install monet-ai
```

## Quick Start

```typescript
import { MonetAI } from "monet-ai";

const monet = new MonetAI({ 
  apiKey: process.env.MONET_AI_API_KEY! 
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
```

## Supported Models

- **Video**: sora-2, wan-2-6, wan-2-turbo, hailuo-2.3, kling-motion-control, kling-1-6
- **Image**: gpt-4o, gpt-image-1-5, nano-banana-1, nano-banana-2, wan-i-2-6, wan-2-5, seedream-4-0
- **Music**: suno-3.5, udio-v1-6
- **Lip-Sync**: heygen, f5-tts

## API

- `createTask(options)` - Create async task (returns immediately)
- `createTaskStream(options)` - Create sync task (SSE streaming)
- `getTask(taskId)` - Get task by ID
- `listTasks({page, pageSize})` - List tasks
