export const config = {
    schema(yup) {
        return yup.object({
            NODE_ENV: yup.string().required(),
        })
    },
    typescript: true
}