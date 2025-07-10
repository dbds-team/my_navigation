# Config Editor - 配置转换工具

一个强大的命令行工具，用于在JavaScript配置文件和YAML格式之间进行转换。

## 功能特点

- 🔄 **双向转换**：支持JS配置文件转YAML和YAML转JS配置文件
- 🛡️ **健壮解析**：智能处理JavaScript注释、单引号、尾部逗号等格式问题
- 🎨 **彩色输出**：友好的命令行界面，支持彩色状态提示
- 💾 **自动备份**：导入时自动备份原始文件，避免数据丢失
- ✅ **格式验证**：内置配置文件格式验证功能
- 📝 **详细日志**：清晰的操作步骤和错误提示
- 🌏 **完美中文支持**：彻底解决中文字符乱码问题，现已输出JSON格式确保编码正确

## 快速开始

### 构建工具

```bash
# 进入config-editor目录
cd config-editor

# 构建可执行文件
go build -o config-editor main.go

# 或者在Windows下
go build -o config-editor.exe main.go
```

### 基本用法

#### 1. 导出配置（JS → YAML）

将JavaScript配置文件转换为YAML格式，方便编辑：

```bash
# 使用默认路径
./config-editor export

# 指定输入输出文件
./config-editor export -input ../js/config.js -output my-config.yaml
```

#### 2. 导入配置（YAML → JS）

将编辑后的YAML文件转换回JavaScript配置：

```bash
# 使用默认路径（自动备份原文件）
./config-editor import

# 指定文件路径
./config-editor import -input my-config.yaml -output ../js/config.js

# 禁用自动备份
./config-editor import -backup=false
```

#### 3. 验证配置文件

检查配置文件格式是否正确：

```bash
# 验证默认配置文件
./config-editor validate

# 验证指定文件
./config-editor validate -file ../js/config.js
```

## 命令详解

### export 命令

将JS配置文件转换为YAML格式。

**参数：**
- `-input string` - 输入的JS配置文件路径（默认：`../js/config.js`）
- `-output string` - 输出的YAML文件路径（默认：`config.yaml`）
- `-pretty bool` - 是否美化输出格式（默认：`true`）

**示例：**
```bash
./config-editor export -input ../js/config.js -output backup-config.yaml
```

### import 命令

将YAML文件转换为JS配置文件。

**参数：**
- `-input string` - 输入的YAML文件路径（默认：`config.yaml`）
- `-output string` - 输出的JS配置文件路径（默认：`../js/config.js`）
- `-backup bool` - 是否自动备份原文件（默认：`true`）

**示例：**
```bash
./config-editor import -input edited-config.yaml -output ../js/config.js
```

### validate 命令

验证配置文件格式的正确性。

**参数：**
- `-file string` - 要验证的文件路径（默认：`../js/config.js`）

**示例：**
```bash
./config-editor validate -file ../js/config.js
```

## 工作流程建议

1. **导出配置用于编辑**
   ```bash
   ./config-editor export -output my-config.yaml
   ```

2. **编辑YAML文件**
   使用您喜欢的文本编辑器编辑 `my-config.yaml`

3. **验证修改后的配置**
   ```bash
   ./config-editor validate -file ../js/config.js
   ```

4. **导入修改后的配置**
   ```bash
   ./config-editor import -input my-config.yaml
   ```

5. **清理临时文件**
   ```bash
   rm my-config.yaml
   ```

## 注意事项

- 工具会自动处理JavaScript的注释、单引号、尾部逗号等格式问题
- 导入时默认会创建带时间戳的备份文件（如：`config.js.bak.20240315143022`）
- YAML文件中的注释会在转换回JS时丢失
- 确保YAML文件格式正确，避免转换失败
- 建议在修改重要配置前先进行备份
- 🎯 **中文字符完美支持**：自动修复YAML中的Unicode转义序列，确保中文正常显示和编辑

## 故障排除

### 常见错误

1. **"无法找到appConfig对象定义"**
   - 检查JS文件是否包含 `const appConfig = {...}` 定义
   - 确保语法格式正确

2. **"解析YAML失败"**
   - 检查YAML文件的缩进格式
   - 确保特殊字符正确转义

3. **"文件不存在"**
   - 检查输入文件路径是否正确
   - 确保有足够的文件访问权限

### 获取帮助

```bash
./config-editor help
```

## 技术实现

- **语言**: Go 1.21+
- **输出格式**: JSON（避免YAML库的Unicode编码问题）
- **正则表达式**: 支持复杂的JavaScript语法解析  
- **错误处理**: 详细的错误信息和状态码

## 更新日志

### v2.1.0 - 2025-07-10

🎯 **重大修复：彻底解决中文字符乱码问题**

**问题分析：**
- 发现中文乱码的根本原因是复杂的字符串处理函数（如`cleanJSObject`, `normalizeKeys`等）破坏了UTF-8编码
- 原始JS文件和JSON解析过程中的中文字符完全正常

**解决方案：**
- ✅ 实现了简化的`simpleExtractJSConfig`函数，避免复杂字符串处理
- ✅ 使用`simpleRemoveComments`替代复杂的注释清理逻辑
- ✅ 改为输出JSON格式，完全避开YAML库的Unicode处理问题
- ✅ 所有中文字符现在完美显示：`"安全知识库导航"`, `"专注于安全技术的知识库导航系统"`

**修复验证：**
- 原始JS文件中文正常 ✅
- JSON解析后中文正常 ✅  
- 最终输出中文正常 ✅

---

如果您遇到问题或有改进建议，请参考项目主README文件或提交Issue。 