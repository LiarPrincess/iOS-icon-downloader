import { promises as fs, createWriteStream as cws } from 'fs';

export async function exists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}

export const createWriteStream = cws;
