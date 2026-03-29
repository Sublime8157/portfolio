List to consider upon prisma setup

- Version 7 prisma has a big changes
- Must use the default provider "provider = "prisma-client-js"
- npx prisma generate to generate the files to setup
- url should only be presented at prisma.config.ts

Notes:

- env should load on top level specifically at server.js
