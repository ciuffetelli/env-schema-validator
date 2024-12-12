import { writeFile } from 'fs/promises';
import { readFileSync } from 'fs';
import { resolve, join } from 'path';

export const root = resolve(process.cwd(), 'node_modules')
    .replace(join('/', 'node_modules'), '');

export const rootModule = join(root, 'node_modules', 'env-schema-validator');

export const read = async (path) => {
    const ref = resolve(root, path);
    return readFileSync(ref, 'utf8');
}

export const write = async (path, content) => {
    const ref = resolve(root, path);
    await writeFile(ref, content, 'utf-8');
    return ref;
}