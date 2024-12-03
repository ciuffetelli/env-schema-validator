import validateEnv from 'env-schema-validator';

validateEnv(() => {
    console.log('SUCCESS');
})