#! /bin/bash

set -e

pushd _build > /dev/null
touch .nojekyll
git init
git add .
git commit -m "Deploy to GitHub Pages."
git config user.name "Travis CI User"
git push --force --quiet "https://${GH_TOKEN}@github.com/myyasuda/sphinx_materialdesign_theme.git" master:gh-pages > /dev/null 2>&1
popd > /dev/null
