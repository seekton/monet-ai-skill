Make idempotency_key a required field in the monet-ai SDK.

Changes needed:

1. **src/client.ts** - In the `CreateTaskOptions` interface, change:
   - `idempotency_key?: string;` 
   - To: `idempotency_key: string;`
   
   Also add validation in the `createTask` method to throw an error if idempotency_key is missing.

2. **src/types.ts** - In the `Task` interface, change:
   - `idempotency_key?: string;`
   - To: `idempotency_key: string;`

3. **SKILL.md** - Update the documentation:
   - Change `idempotency_key: "unique-key"  // Optional but RECOMMENDED`
   - To: `idempotency_key: "unique-key"  // Required - use a unique value (e.g., UUID) to prevent duplicate task creation`
   - Update the note from "optional but highly recommended" to "required"

4. **README.md** - Same changes as SKILL.md

Make these changes and then run `npm run build` to rebuild the dist folder.