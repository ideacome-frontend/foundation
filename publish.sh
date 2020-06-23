#! /bin/bash
npm run doc
# 将生成的文档发布到远程 访问地址：http://test.wxb.com.cn/supermarket/document/index.html
rsync -rtv doc/ root@192.168.1.190:/usr/local/nginx/wxbins-frontend/document/;

