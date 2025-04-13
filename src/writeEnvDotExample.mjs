import { write } from './utils/fileSystem.mjs';
import { StringSchema, BooleanSchema, NumberSchema } from 'yup';
import { getConfig } from './utils/getConfig.mjs';
import paths from './constants/paths.mjs';

export async function writeEnvDotExample() {

	const config = await getConfig();

	const header = `# This file is auto-generated.
	# DO NOT EDIT IT MANUALLY!
	#
	# This is an example file for environment variables.
	# Copy this file to .env and fill in your values.
	#
	# For Keys
	# "openssl rand -hex 32" or go to https://generate-secret.now.sh/32
	#`;

	const groups = Object.entries(config.schema.fields).reduce((acc, [key, value]) => {

		const prefix = key.split('_')[0];

		if (!acc[prefix]) {
			acc[prefix] = [];
		}

		let defaultValue = '';
		let type = getSchemaType(value);

		// Determine appropriate example values and add comments based on schema type
		if (value.spec.default) {
			defaultValue = value.spec.default;
		} else {
			defaultValue = getSchemaExampleValue(key, value);
		}

		// Get any meta description from the schema if available
		const description = value.describe().meta?.description;

		acc[prefix].push({
			key,
			defaultValue,
			description,
			type
		});

		return acc;
	}, {});

	const sortedGroups = Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));

	const content = sortedGroups.reduce((acc, [prefix, vars]) => {

		const groupHeader = `#
		# ${prefix} Configuration
		#`;

		const sortedVars = vars.sort((a, b) => a.key.localeCompare(b.key));

		const groupContent = sortedVars.reduce((acc, { key, defaultValue, type }) => {

			const content = `${key}=${defaultValue}\n`;

			return `${acc}${content}`;
		}, '');

		return `${acc}
		${groupHeader}
		${groupContent}`;
	}, '');

	const envExampleContent = `${header}
	${content}`.replaceAll('	', '');

	try {
		await write(paths.dotEnvExample, envExampleContent, 'utf-8');
		console.log('✅ Successfully generated .env.example file at:', paths.dotEnvExample);
	} catch (error) {
		console.error('❌ Failed to generate .env.example file:', error);
		process.exit(1);
	}
}

function getSchemaType(schema) {
	if (schema instanceof StringSchema) {
		return 'string';
	} else if (schema instanceof NumberSchema) {
		return 'number';
	} else if (schema instanceof BooleanSchema) {
		return 'boolean';
	} else {
		return 'unknown';
	}
}

function getSchemaExampleValue(key, schema) {

	if (schema instanceof StringSchema) {

		const describes = schema.describe();

		if (describes.tests.some(test => test.name === 'url') || key.includes('URL')) {
			return 'https://example.com';
		} else if (key.includes('PASSWORD') || key.includes('SECRET') || key.includes('KEY')) {
			return '<your-secret-here>';
		} else if (key.includes('HOST')) {
			return 'localhost';
		} else if (key.includes('EMAIL')) {
			return 'user@example.com';
		} else if (key.includes('PATH')) {
			return '/path/to/resource';
		}
	} else if (schema instanceof NumberSchema) {
		return 0;
	} else if (schema instanceof BooleanSchema) {
		return false;
	}

	return 'value';
}