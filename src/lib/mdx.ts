// Shared helpers used across routes and components.

import path from 'node:path';
import matter from 'gray-matter';
import { createElement, type ComponentProps } from 'react';
import type { ReactNode } from 'react';
import type { z } from 'zod';
import { readFileUtf8Safe } from './fs-safe';
import { withBasePath } from './paths';

const contentDir = path.join(process.cwd(), 'content');
let mdxCompilerPromise: Promise<typeof import('next-mdx-remote/rsc')> | null = null;
let mdxCompilerUnavailable = false;
// Runtime guard values for mdx timeout ms behavior.
const MDX_TIMEOUT_MS = 3000;

// Lazy-load and cache the MDX compiler module.
function getMdxCompiler() {
  if (!mdxCompilerPromise) {
    mdxCompilerPromise = import('next-mdx-remote/rsc');
  }
  return mdxCompilerPromise;
}

// Starts this heavy dependency early so later requests feel faster.
export function warmMdxCompiler() {
  void getMdxCompiler();
}

// Small sleep helper used by timeout and retry logic.
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Race an async operation against a timeout error.
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return Promise.race([
    promise,
    wait(timeoutMs).then(() => {
      throw new Error('MDX_TIMEOUT');
    })
  ]);
}

// Detect the MDX timeout sentinel so we can fall back safely.
function isMdxTimeoutError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    (error as { message?: string }).message === 'MDX_TIMEOUT'
  );
}

// Keep fallback markdown markup in a helper so this file stays easy to scan.
function renderFallbackMarkdown(markdown: string): ReactNode {
  const blocks = markdown
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return createElement(
    'div',
    { className: 'space-y-4' },
    ...blocks.map((block, index) => {
      if (block.startsWith('### ')) {
        return createElement('h3', { key: `${index}-h3` }, block.slice(4));
      }
      if (block.startsWith('## ')) {
        return createElement('h2', { key: `${index}-h2` }, block.slice(3));
      }
      if (block.startsWith('# ')) {
        return createElement('h1', { key: `${index}-h1` }, block.slice(2));
      }
      if (block.startsWith('- ')) {
        const items = block
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.startsWith('- '))
          .map((line) => line.slice(2));
        return createElement(
          'ul',
          { key: `${index}-ul`, className: 'list-disc pl-5' },
          ...items.map((item, itemIndex) =>
            createElement('li', { key: `${index}-${itemIndex}` }, item)
          )
        );
      }
      return createElement('p', { key: `${index}-p` }, block);
    })
  );
}

// Resolves content path used later in the render flow.
export const resolveContentPath = (...segments: string[]) =>
  path.join(contentDir, ...segments);

// Compile MDX content with a safe fallback path when compilation is unavailable.
export async function loadMDXComponent<T>(filePath: string, schema: z.ZodType<T>) {
  const source = await readFileUtf8Safe(filePath);
  const components = {
    img: (props: ComponentProps<'img'>) =>
      createElement('img', {
        ...props,
        src: typeof props.src === 'string' ? withBasePath(props.src) : props.src
      })
  };

  if (mdxCompilerUnavailable) {
    const parsed = matter(source);
    return {
      content: renderFallbackMarkdown(parsed.content),
      frontmatter: schema.parse(parsed.data)
    };
  }

  try {
    // Keep route rendering responsive if the MDX toolchain stalls in cloud-backed folders.
    const { compileMDX } = await withTimeout(getMdxCompiler(), MDX_TIMEOUT_MS);
    const { content, frontmatter } = await withTimeout(
      compileMDX({
        source,
        components,
        options: { parseFrontmatter: true }
      }),
      MDX_TIMEOUT_MS
    );
    return { content, frontmatter: schema.parse(frontmatter) };
  } catch (error) {
    if (isMdxTimeoutError(error)) {
      mdxCompilerUnavailable = true;
    }
    const parsed = matter(source);
    return {
      content: renderFallbackMarkdown(parsed.content),
      frontmatter: schema.parse(parsed.data)
    };
  }
}

// Parse just the frontmatter when full MDX compilation is not needed.
export async function readFrontmatter<T>(filePath: string, schema: z.ZodType<T>) {
  const source = await readFileUtf8Safe(filePath);
  const { data } = matter(source);
  return schema.parse(data);
}
