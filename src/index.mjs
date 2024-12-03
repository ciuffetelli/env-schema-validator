import { getConfig } from './utils/getConfig.mjs'

async function exec(configurations) {
    try {
        const config = await getConfig(configurations);

        const schema = config.schema;

        await schema.validate(process.env);

        return true;

    } catch (error) {
        if (!error.errors) {
            throw error
        }

        console.error('❌ Environment vars error:', error.errors);

        return false;
    }
}

export default exec