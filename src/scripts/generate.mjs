import { getConfig } from '../utils/getConfig.mjs';
import { writeEnvDotExample } from '../writeEnvDotExample.mjs';
import { writeEnvTypes } from '../writeEnvTypes.mjs';

(async () => {
    console.log('GENERATE');

    const config = await getConfig();

    await writeEnvDotExample();

    config.typescript && await writeEnvTypes();
})();