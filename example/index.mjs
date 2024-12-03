import validateEnv from 'env-schema-validator';

await validateEnv();
console.log('SUCCESS');