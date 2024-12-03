# validate-env

Validation of environmental variables in a simple way.


Avoid unknown errors in your application by ensuring that all environment variables are set correctly.

> The Module use Yup to create the validation schema

```
#validate-env.config.mjs

export const config = {
    schema(yup) {
        return yup.object({
            NODE_ENV: yup.string().required(),
        })
    },
    typescript: true
}
```