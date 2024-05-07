import {generateDocumentation} from '@deep-foundation/npm-automation'

main();

async function main() {
  await generateDocumentation({
    generateCliAppsHelpInReadmeOptions: null,
    generateUsageWaysOfNpmCliAppsInMarkdownFormatOptions: null,
  })
};