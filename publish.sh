#! /bin/bash
npm run doc
# 将生成的文档发布到远程 访问地址：http://f7test.wxb.com.cn/ideacome-foundation/index.html
rsync -rtv doc/ root@121.40.92.166:/usr/local/nginx/html/ideacome-foundation/;

