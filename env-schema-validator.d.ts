declare module 'env-schema-validator' {
    export interface ConfigOptions {
        schema: (yup: typeof import('yup')) => any;
        typescript?: boolean
    }
    
    type ConfigFunction = (_config?: ConfigOptions) => Promise<boolean>;
    
    const validator: ConfigFunction;
    export default validator;
}