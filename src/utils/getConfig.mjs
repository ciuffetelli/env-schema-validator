import paths from '../constants/paths.mjs';
import * as yup from 'yup';

export const getConfig = async (configurations) => {
    try {
        const { config } = !configurations ? await import(paths.applicationConfigFile) : { config: configurations };

        return {
            ...config,
            schema: config.schema(yup)
        };

    } catch (error) {
        console.log('DANIEL');

        console.error(error);
        throw new Error('❌ Configuration file is missing please run "npx env-schema-validator init"');
    }
};