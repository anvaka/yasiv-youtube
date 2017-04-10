#!/bin/sh
npm run build &&
cd ./dist &&
git init &&
git add . &&
git commit -m 'push to gh-pages' &&
git push --force git@github.com:anvaka/yasiv-youtube.git master:gh-pages
