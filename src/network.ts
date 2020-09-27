import { default as axios } from 'axios';
import { promises as fs, createWriteStream } from 'fs';
import * as cache from './cache';

export async function getJSON(url: string): Promise<any> {
  const cacheKey = createCacheKey(url);
  const cachedResponse = await getFromCache(cacheKey);

  if (cachedResponse) {
    return JSON.parse(cachedResponse);
  }

  const response = await axios.get(url);
  const object = response.data;
  await cache.put(cacheKey, JSON.stringify(object));
  return object;
}

export async function getText(url: string): Promise<string> {
  const cacheKey = createCacheKey(url);
  const cachedResponse = await getFromCache(cacheKey);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await axios.get(url);
  const text = response.data;
  await cache.put(cacheKey, text);
  return text;
}

export async function downloadStream(url: string, path: string): Promise<void> {
  const stream = createWriteStream(path);
  const response = await axios.get(url, { responseType: 'stream' });

  response.data.pipe(stream);

  return new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

function createCacheKey(url: string): string {
  return url.replace(/[\/:]/g, '');
}

function getFromCache(key: string): Promise<string | undefined> {
  return cache.get(key);
}
