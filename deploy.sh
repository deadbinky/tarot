#!/bin/sh

npm run build
rsync -avz --progress -e 'ssh -p2222' dist/* deadbinky@shittybum.com:~/web/