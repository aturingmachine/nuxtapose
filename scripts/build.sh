#!/usr/bin/env sh

###
# nuxtapose build script
# 
# compiles the typescript then injects the version
# number from the package.json
###

echo ">>> Compiling Typescript..."
npm run compile

echo ">>> Updating Version number..."

PACKAGE_VERSION_NUMBER=$(grep version package.json | awk '{print $2}' | sed 's/[\"|,]//g')

sed -i 's/NP_VERSION_NUMBER/'$PACKAGE_VERSION_NUMBER'/g' dist/index.js

echo ">>> Build complete."