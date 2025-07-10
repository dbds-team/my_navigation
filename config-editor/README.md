# Config Editor Tool - 配置文件编辑工具

## 简介

这是一个专门用于JavaScript配置文件的YAML转换工具，可以将JS配置文件导出为YAML格式进行编辑，然后再导入回JS格式。

## 主要功能

- **导出（Export）**: 将JavaScript配置文件转换为YAML格式，便于编辑
- **导入（Import）**: 将编辑后的YAML文件转换回JavaScript格式
- **中文支持**: 完美支持中文字符，无乱码问题

## 使用方法

### 构建工具
```bash
go build -o config-editor main.go
```

### 导出JS配置为YAML
```bash
./config-editor export -input ../js/config.js -output config.yaml
```

### 导入YAML配置为JS
```bash
./config-editor import -input config.yaml -output ../js/config.js
```

## 工作流程

1. **编辑前准备**: 使用export命令将JS配置文件转换为YAML
2. **编辑配置**: 使用任何文本编辑器编辑YAML文件（支持中文）
3. **应用更改**: 使用import命令将编辑后的YAML转换回JS格式

## 已修复的问题

### 2024年中文字符乱码问题修复

**问题描述**: 在转换过程中，中文字符会变成乱码（如 `\u5b89\u5168\u77e5\u8bc6\u5e93\u5bfc\u822a`）

**根本原因**: 复杂的字符串处理函数在JS到JSON转换过程中破坏了UTF-8编码

**解决方案**:
- 实现了`simpleExtractJSConfig()`函数，使用简单的正则表达式和基础注释移除
- 避免了复杂的字符串操作，防止UTF-8编码损坏
- 添加了`ultraSimpleChineseFix()`处理Unicode转义序列

**修复效果**:
- YAML导出: `title: 安全知识库导航` ✅
- YAML编辑: 可以正常修改中文内容 ✅  
- JS导入: 中文字符在最终输出中完美保留 ✅

### 2024年变量引用问题修复

**问题描述**: 从YAML转换回JS后，出现 `Uncaught ReferenceError: config is not defined` 错误

**根本原因**: 
- 原始config.js文件定义的是 `const appConfig = {...}`
- 但script.js中期望使用 `config` 变量
- 生成的JS文件缺少变量别名

**解决方案**:
- 修改了`generateJSFile`函数，在生成的JS文件末尾添加：
  ```javascript
  // 为兼容性提供别名
  const config = appConfig;
  ```
- 确保既保持原有的`appConfig`变量，又提供`config`别名

**修复效果**:
- script.js可以正常访问`config`变量 ✅
- 保持向后兼容性，`appConfig`仍然可用 ✅
- 自动应用到所有新生成的JS文件 ✅

## 技术实现

- **语言**: Go 1.21+
- **YAML库**: gopkg.in/yaml.v3
- **编码**: UTF-8 (完美支持中文)
- **错误处理**: 完整的错误检查和用户友好的提示
- **备份机制**: 自动备份原始文件，防止数据丢失

## 项目结构

```
config-editor/
├── main.go          # 主程序文件
├── README.md        # 说明文档
└── config-editor    # 编译后的可执行文件
```

## 注意事项

1. **备份**: 工具会自动备份原始文件（.bak文件）
2. **编码**: 请确保所有文件使用UTF-8编码
3. **格式**: 生成的JS文件使用标准的JSON格式化，便于阅读
4. **兼容性**: 生成的JS文件同时提供`appConfig`和`config`两个变量名

## 开发历史

该工具经过多次迭代优化：
- 初版：基础JS到YAML转换功能
- v1.1：修复中文字符乱码问题  
- v1.2：添加变量别名，解决引用错误
- v1.3：完善错误处理和用户体验

完美解决了配置文件编辑中的中文支持和变量引用问题，现在可以安全地进行YAML编辑工作流程。 