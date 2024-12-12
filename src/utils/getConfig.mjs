import paths from '../constants/paths.mjs';
import * as yup from 'yup';
import { pathToFileURL } from 'url';

export const getConfig = async (configurations) => {
    try {
        const { config } = !configurations ? await import(pathToFileURL(paths.applicationConfigFile)) : { config: configurations };

        return {
            ...config,
            schema: config.schema(yup)
        };

    } catch (error) {
        console.error(error);
        throw new Error('❌ Configuration file is missing please run "npx env-schema-validator init"');
    }
};