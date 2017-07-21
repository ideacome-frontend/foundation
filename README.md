# 前端公共库
这个公共库包含与具体项目UI无关的代码。

## 安装与使用

1. 引入库
```bash
npm install -S git+ssh://git@192.168.1.7:amazing-f2e/ideacome-foundation.git
```

2. 在代码中使用
```javascript
import { validators } from '@ideacome/foundation';
if (validators.isValidPlate(plateNumber)) {
    //...
}
```
如果只需要特定的功能函数，则推荐更细致的导入：
```javascript
import { isValidID } from '@ideacome/foundation/validators/user-info';
if (isValidID(idNumber)) {
    //...
}
```

## 更新
当这个公共库有更新时，只需执行
```bash
npm update \@ideacome/foundation
```
就可以了。

## 贡献代码
这个库的源码采用 `typescript` 编写，在 `src` 目录下。
1. 安装依赖
```bash
cd /YOUR_PROJECTS_FOLDER/ideacome-foundation
npm install
```

2. 更改 `src` 下的代码，推荐使用 [Visual Studio Code](https://code.visualstudio.com) 编辑器。

3. 执行代码编译，然后提交
```bash
npm run build
git add .
git commit -m "<commit message>"
git push origin
```

## 功能列表
待完善
