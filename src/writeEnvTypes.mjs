import { write } from './utils/fileSystem.mjs';
import { StringSchema, BooleanSchema, NumberSchema } from 'yup';
import { getConfig } from './utils/getConfig.mjs';
import paths from './constants/paths.mjs';

export async function writeEnvTypes() {

	const config = await getConfig();

	const types = Object.entries(config.schema.fields).reduce((acc, [key, value]) => {

		let line = '';

		if (value instanceof StringSchema) {
			line = `${key}: string`;
		} else if (value instanceof NumberSchema) {
			line = `${key}: number`;
		} else if (value instanceof BooleanSchema) {
			line = `${key}: boolean`;
		} else {
			line = `${key}: unknown`;
		}

		return `${acc}
		${line}`;

	}, '');

	const header = `/**
 * This file is auto-generated.
 * DO NOT EDIT IT MANUALLY!
 *
 * To change the environment var please do it at environment.schema.mjs
 */`;

	const typeContent = `
${header}

declare global {

  namespace NodeJS {
    interface ProcessEnv extends EnvSchema {${types}
	}
  }
}

export {};
`;

	try {
		// Write the type definition file
		await write(paths.dotEnvType, typeContent, 'utf-8');

		console.log('✅ Successfully generated environment type definitions at:', paths.dotEnvType);
	} catch (error) {
		console.error('❌ Failed to generate environment type definitions:', error);
		process.exit(1);
	}
}
