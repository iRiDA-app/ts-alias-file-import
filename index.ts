import { promises as fs } from 'fs';
import path from 'path';

export async function importFile(aliasPath: string): Promise<Buffer | null> {
  // Step 1: Read the tsconfig.json file
  const tsconfigPath = path.resolve('tsconfig.json');
  const tsconfigContent = await fs.readFile(tsconfigPath, 'utf-8');
  const tsconfig = JSON.parse(tsconfigContent);
  
  const { baseUrl = ".", paths = {} } = tsconfig.compilerOptions;

  // Step 2: Find the matching alias path
  for (const [aliasPattern, aliasTargets] of Object.entries(paths)) {
    // Convert the TypeScript path alias syntax (@/*) to a regex
    const aliasRegex = new RegExp(`^${aliasPattern.replace(/\*/g, '(.*)')}$`);
    const match = aliasPath.match(aliasRegex);

    if (match) {
      // Extract the path after the alias and replace '*' with that part
      const matchedPathSuffix = match[1];
      for (const aliasTarget of aliasTargets as any) {
        const relativePath = aliasTarget.replace(/\*/, matchedPathSuffix);
        // Resolve the final absolute path
        const absolutePath = path.resolve(baseUrl, relativePath);

        // Step 3: Read the file as a Buffer and return it
        try {
          const fileBuffer = await fs.readFile(absolutePath);
          return fileBuffer;
        } catch (error) {
          console.error(`Error reading file at ${absolutePath}:`, error);
          return null;
        }
      }
    }
  }

  // No match found
  return null;
}
