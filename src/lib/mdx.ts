import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { z } from 'zod';

const contentDir = path.join(process.cwd(), 'content');

export const resolveContentPath = (...segments: string[]) =>
  path.join(contentDir, ...segments);

export async function loadMDXComponent<T>(filePath: string, schema: z.ZodType<T>) {
  const source = await fs.readFile(filePath, 'utf8');
  const { content, frontmatter } = await compileMDX({
    source,
    options: { parseFrontmatter: true }
  });
  return { content, frontmatter: schema.parse(frontmatter) };
}

export async function readFrontmatter<T>(filePath: string, schema: z.ZodType<T>) {
  const source = await fs.readFile(filePath, 'utf8');
  const { data } = matter(source);
  return schema.parse(data);
}

export async function readDirectory(dir: string) {
  const fullPath = path.join(contentDir, dir);
  return fs.readdir(fullPath);
}
