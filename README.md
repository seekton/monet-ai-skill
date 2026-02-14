# Monet AI

AI content generation API for video, image, music and lip-sync.

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

## API Reference

### Configuration

```typescript
const monet = new MonetAI({
  apiKey: "monet_xxx",        // Required: Your API key
  baseUrl: "https://monet.vision"  // Optional: Custom base URL
});
```

### Create Task (Async)

```typescript
const task = await monet.createTask({
  type: "video",
  input: {
    model: "sora-2",
    prompt: "Your prompt here"
  },
  idempotencyKey: "unique-key"  // Optional
});
```

### Create Task (Sync/Stream)

```typescript
const stream = await monet.createTaskStream({
  type: "video",
  input: {
    model: "sora-2",
    prompt: "Your prompt here"
  }
});

for await (const chunk of stream) {
  console.log(chunk);
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

### Video
- sora-2
- wan-2-6
- wan-2-turbo
- hailuo-2.3
- kling-motion-control
- kling-1-6

### Image
- gpt-4o
- gpt-image-1-5
- nano-banana-1
- nano-banana-2
- wan-i-2-6
- wan-2-5
- seedream-4-0

### Music
- suno-3.5
- udio-v1-6

### Lip-Sync
- heygen
- f5-tts

## Error Handling

```typescript
try {
  const task = await monet.createTask({...});
} catch (error) {
  if (error.code === "VALIDATION_ERROR") {
    console.log("Invalid input:", error.message);
  } else if (error.code === "unauthorized") {
    console.log("Invalid API key");
  }
}
```

## License

MIT
