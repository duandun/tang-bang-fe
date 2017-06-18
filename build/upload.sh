#!/bin/sh
echo "编译中....."
npm run build

echo "压缩打包中..."
mkdir -p output
tar zcvf tangbang-front.tar.gz dist/index.html dist/static
mv tangbang-front.tar.gz output
scp -P 26303 output/tangbang-front.tar.gz root@104.224.187.168:/home/tangbang-front
