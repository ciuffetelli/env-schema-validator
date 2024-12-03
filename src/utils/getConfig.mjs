import paths from '../constants/paths.mjs';
import * as yup from 'yup';

export const getConfig = async () => {
    try {
        const { config } = await import(paths.applicationConfigFile);

        return {
            ...config,
            schema: config.schema(yup)
        };

    } catch (error) {
        throw new Error('❌ Configuration file is missing please run "env-schema-validator init"');
    }
};