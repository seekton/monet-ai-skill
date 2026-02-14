---
name: monet-ai
description: |
  Monet AI - AI content generation API for video, image and music. 
  Use when you need to generate videos, images, or music via API.
  Supports Sora, Wan, Hailuo, Kling, GPT-4o, Flux, Suno and more.
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
- You need to generate video content (Sora, Wan, Hailuo, Kling)
- You need to generate images (GPT-4o, Flux, Imagen)
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

### Video
- sora-2 - OpenAI Sora 2
- wan-2-6 - Wan 2.6
- hailuo-2.3 - Hailuo 2.3
- kling-2-5 - Kling 2.5
- *and more*

### Image
- gpt-4o - OpenAI GPT-4o
- gpt-image-1-5 - OpenAI GPT Image 1.5
- flux-2-dev - Flux 2 Dev
- *and more*

### Music
- suno-3.5 - Suno 3.5
- *and more*

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
  timeout: 60000           // Optional: timeout in ms
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
