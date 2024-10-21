# ts-alias-file-import

`ts-alias-file-import` is a utility for importing files using TypeScript's `paths` aliases defined in `tsconfig.json`. It resolves alias paths and reads the corresponding files, returning them as Buffers.

## Features
- Resolves file paths based on TypeScript `paths` and `baseUrl` configuration.
- Supports file imports using alias patterns (e.g. `@/components/*`).
- Reads the matched file as a Buffer.

## Installation

```bash
npm install ts-alias-file-import
```

## Usage

First, make sure you have path aliases configured in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Then, use `ts-alias-file-import` to load a file using its alias:

```ts
import { importFile } from 'ts-alias-file-import';

async function loadFile() {
  const fileBuffer = await importFile('@/components/MyComponent.tsx');

  if (fileBuffer) {
    console.log('File loaded successfully!');
  } else {
    console.log('File not found or an error occurred.');
  }
}

loadFile();
```

## API

### `importFile(aliasPath: string): Promise<Buffer | null>`

- **aliasPath**: The path using a TypeScript alias (e.g., `@/components/MyComponent`).
- **Returns**: A promise that resolves to the file content as a `Buffer`, or `null` if the file is not found.

## To-Do's

- **Support for prefixed `*.tsconfig.json` files**: Currently, the package looks for `tsconfig.json` by default. A future enhancement will allow it to handle files with custom prefixes, such as `dev.tsconfig.json` or `prod.tsconfig.json`, for more flexible development environments.
- **More features**: Additional capabilities may include file caching or improved error handling.

PRs are welcome! If you have ideas or want to help implement new features, feel free to contribute.

## License

MIT