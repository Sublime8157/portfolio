List to consider upon prisma setup

- Version 7 prisma has a big changes
- Must use the default provider "provider = "prisma-client-js"
- npx prisma generate to generate the files to setup
- url should only be presented at prisma.config.ts

Notes:

- env should load on top level specifically at server.js

PUT vs PATCH METHODS

- PUT updated all the row, so when you pass only single column the rest rows will become null
- PATCH pass only the column to be updated
