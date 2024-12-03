import { read, write } from '../utils/fileSystem.mjs';
import paths from '../constants/paths.mjs';

const configContent = await read(paths.configFile);

const path = await write(paths.applicationConfigFile, configContent);

console.log('✅ Successfully generated config file:', path);