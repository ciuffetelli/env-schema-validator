# env-schema-validator

Validation of environmental variables in a simple way.


Avoid unknown errors in your application by ensuring that all environment variables are set correctly.

> The Module use Yup to create the validation schema

```
#env-schema-validator.config.mjs

export const config = {
    schema(yup) {
        return yup.object({
            NODE_ENV: yup.string().required(),
        })
    },
    typescript: true
}
```

## Usage

```
# next.config.ts

import type { NextConfig } from "next";
import validator from 'env-schema-validator';
import { config } from './env-schema-validator.config.mjs';

const nextConfig: NextConfig = {
  /* config options here */
};

const getNextConfig = async () => {
  if(await validator(config)){
    return nextConfig;
  }
  
  return null;
}

export default getNextConfig();
```

### Generating

```
npx env-schema-validator generate
```

This command will generate the .env.example file and the env.d.ts typescript file.
