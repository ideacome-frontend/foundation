# 前端公共库

## 安装与使用
假设前端项目的工作区是 `~/Workspace/`，包含项目 `some-awesome-project` 等其他子目录

1. 克隆这个仓库
```bash
cd ~/Workspace/
git clone git@192.168.1.7:amazing-f2e/ideacome-foundation.git
```
此时，`~/Workspace/`目录下会生成 `ideacome-foundation` 子目录。

2. 引入到其他项目中，以 `some-awesome-project` 为例
```bash
cd ~/Workspace/some-awesome-project
npm link ../ideacome-foundation
```
当然，如果有另一个 `another-awesome-project`，并且不在 `~/Workspace/` 下，那么，执行 `npm link` 后面的地址也作改变；可以使用绝对地址。

3. 在代码中使用
```javascript
import { validators } from '@ideacome/foundation';
if (validators.isValidPlate(plateNumber)) {
    //...
}
```
如果只需要特定的功能函数，则推荐更细致的导入：
```javascript
import isValidID from '@ideacome/foundation/validators/id-validator';
if (isValidID(idNumber)) {
    //...
}
```

## 更新
当这个公共库有更新时，只需执行
```bash
cd ~/Workspace/ideacome-foundation
git pull
```
就可以了，所有引用这个库的其他项目都能使用到最新代码。

## 贡献代码
这个库的源码采用 `typescript` 编写，在 `src` 目录下。
1. 安装依赖
```bash
cd ~/Workspace/some-awesome-project
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
