# env-schema-validator

## Development

To developer this project, please use the example project.
Follow the steps below to get started.

- Clone the repository
```
git clone git@github.com:ciuffetelli/env-schema-validator.git
```

- Access the example folder
From the root of the project, run:
```
cd example
```

## Usage

- Run example project
```
yarn dev
```
> ‼️ Should throw an error because config files are missing

- Initialize env-schema-validator
```
npx env-schema-validator init
```
This command will create the env-schema-validator.config.mjs file, this is the schema file.

- Run example project again
```
yarn dev
```
> ‼️ Should throw an error because NODE_ENV is not set

  - Test the example project with NODE_ENV=development
  ```
  NODE_ENV=development yarn dev && unset NODE_ENV
  ```
  > 👌 Should display an message SUCCESS: Environment variables are valid

## Workflow

Once you have understood the usage of the example project, you can start developing.

- Edit the relative files on the source (<root>/src) of the project

## Test execution
- Run the example project - on example project folder (<root>/example)
```
yarn dev
```

## Test generation functionality
- Run the example project - on example project folder (<root>/example)
```
yarn generate
```