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
		let type = '';

		// Determine appropriate example values and add comments based on schema type
		if (value instanceof StringSchema) {
			const describes = value.describe();

			if (describes.tests.some(test => test.name === 'url') || key.includes('URL')) {
				defaultValue = 'https://example.com';
			} else if (key.includes('PASSWORD') || key.includes('SECRET') || key.includes('KEY')) {
				defaultValue = '<your-secret-here>';
			} else if (key.includes('HOST')) {
				defaultValue = 'localhost';
			} else if (key.includes('EMAIL')) {
				defaultValue = 'user@example.com';
			} else if (key.includes('PATH')) {
				defaultValue = '/path/to/resource';
			} else {
				defaultValue = 'value';
			}

			type = 'string';
		} else if (value instanceof NumberSchema) {
			defaultValue = '0';
			type = 'number';
		} else if (value instanceof BooleanSchema) {
			defaultValue = 'false';
			type = 'boolean';
		} else {
			defaultValue = 'value';
			type = 'unknown type';
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
