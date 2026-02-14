# Monet AI SDK

AI content generation API for video, image and music.

## Features

- 🚀 **Async Task Creation** - Create tasks and poll for results
- 📡 **Streaming Support** - SSE-based streaming for real-time updates
- 🎬 **Video Generation** - Sora, Wan, Hailuo, Kling and more
- 🖼️ **Image Generation** - GPT-4o, Flux, Imagen and more
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
  timeout: 60000           // Optional: Request timeout in ms
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

| Model | Description |
|-------|-------------|
| sora-2 | OpenAI Sora 2 |
| wan-2-6 | Wan 2.6 |
| hailuo-2.3 | Hailuo 2.3 |
| kling-2-5 | Kling 2.5 |

*And more: wan-2-5, wan-2-2, kling-2-6, kling-v2-1, hailuo-02, doubao-seedance-1-5-pro, and more*

### Image Generation

| Model | Description |
|-------|-------------|
| gpt-4o | OpenAI GPT-4o |
| gpt-image-1-5 | OpenAI GPT Image 1.5 |
| flux-2-dev | Flux 2 Dev |

*And more: nano-banana-1/2, wan-i-2-6, imagen-3-0, imagen-4-0, ideogram-v2/v3, stability-1-0, and more*

### Music Generation

| Model | Description |
|-------|-------------|
| suno-3.5 | Suno 3.5 |

*And more: udio-v1-6*

## Input Parameters

### Video Input

```typescript
{
  model: "sora-2",           // Required
  prompt: "A cat running",   // Required
  duration?: 5,               // Optional: duration in seconds
  aspectRatio?: "16:9",      // Optional: "16:9" | "9:16" | "1:1"
  images?: ["url"],           // Optional: reference images
  videos?: ["url"]           // Optional: reference videos
}
```

### Image Input

```typescript
{
  model: "gpt-4o",          // Required
  prompt: "A cute cat",       // Required
  aspectRatio?: "16:9",      // Optional
  style?: "modern",          // Optional
  images?: ["url"]          // Optional: reference images
}
```

### Music Input

```typescript
{
  model: "suno-3.5",         // Required
  prompt: "Upbeat pop song"   // Required
}
```

## Error Handling

```typescript
try {
  const task = await monet.createTask({
    type: "video",
    input: { model: "sano-2", prompt: "test" }
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
