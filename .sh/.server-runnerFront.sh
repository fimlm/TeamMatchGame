#!/bin/sh

# Create a folder
mkdir actions-runner && cd actions-runner
# Download the latest runner package
curl -o actions-runner-linux-x64-2.306.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.306.0/actions-runner-linux-x64-2.306.0.tar.gz
# Optional: Validate the hash
echo "b0a090336f0d0a439dac7505475a1fb822f61bbb36420c7b3b3fe6b1bdc4dbaa  actions-runner-linux-x64-2.306.0.tar.gz" | shasum -a 256 -c
# Extract the installer
tar xzf ./actions-runner-linux-x64-2.306.0.tar.gz
rm actions-runner-linux-x64-2.306.0.tar.gz

# Create the runner and start the configuration experience
./config.sh --url https://github.com/fimlm/TeamMatchGame --token AM5CZJSS7TZGJPLWAWJMUBLEWJG2S
# Last step, run it!
./run.sh

./svc.sh install
./svc.sh status
./svc.sh start
