
git pull
lerna bootstrap
lerna run build
cd ./packages/server
npm run stop
npm run start
