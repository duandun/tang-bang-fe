#!/bin/sh
echo "编译中....."
npm run build

echo "压缩打包中..."
mkdir -p output
tar cvf risk-front.tar.gz dist/index.html dist/static
mv risk-front.tar.gz output
scp output/risk-front.tar.gz root@10.95.118.68:/usr/share/nginx/html
