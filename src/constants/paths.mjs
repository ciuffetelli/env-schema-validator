import { root, rootModule } from '../utils/fileSystem.mjs';
import { join } from 'path';

const src = join(rootModule, 'src');

const scriptInit = join(src, 'scripts', 'init.mjs');

const scriptGenerate = join(src, 'scripts', 'generate.mjs');

const configFile = join(src, 'constants', 'config.mjs');

const applicationConfigFile = join(root, 'validate-env.config.mjs');

const dotEnvExample = join(root, '.env.example');

const dotEnvType = join(root, 'env.d.ts');

export default Object.freeze({
    src,
    scriptInit,
    scriptGenerate,
    configFile,
    applicationConfigFile,
    dotEnvExample,
    dotEnvType
})