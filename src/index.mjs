import { getConfig } from './utils/getConfig.mjs'

async function exec(callback) {
    try {
        const config = await getConfig();

        const schema = config.schema;

        await schema.validate(process.env);

        return callback?.();

    } catch (error) {
        if (!error.errors) {
            throw error
        }

        console.error('❌ Environment vars error:', error.errors);
    }
}

export default exec