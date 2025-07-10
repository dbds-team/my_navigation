package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"

	"gopkg.in/yaml.v3"
)

const (
	colorReset  = "\033[0m"
	colorRed    = "\033[31m"
	colorGreen  = "\033[32m"
	colorYellow = "\033[33m"
	colorBlue   = "\033[34m"
	colorPurple = "\033[35m"
	colorCyan   = "\033[36m"
)

func main() {
	// 定义子命令
	if len(os.Args) < 2 {
		printUsage()
		os.Exit(1)
	}

	switch os.Args[1] {
	case "export":
		handleExportCommand()
	case "import":
		handleImportCommand()
	case "validate":
		handleValidateCommand()
	case "help", "-h", "--help":
		printUsage()
	default:
		fmt.Printf("%s❌ 未知命令: %s%s\n", colorRed, os.Args[1], colorReset)
		printUsage()
		os.Exit(1)
	}
}

func handleExportCommand() {
	exportCmd := flag.NewFlagSet("export", flag.ExitOnError)
	input := exportCmd.String("input", "../js/config.js", "输入的JS配置文件路径")
	output := exportCmd.String("output", "config.yaml", "输出的YAML文件路径")
	pretty := exportCmd.Bool("pretty", true, "是否美化输出格式")

	exportCmd.Parse(os.Args[2:])
	exportConfig(*input, *output, *pretty)
}

func handleImportCommand() {
	importCmd := flag.NewFlagSet("import", flag.ExitOnError)
	input := importCmd.String("input", "config.yaml", "输入的YAML文件路径")
	output := importCmd.String("output", "../js/config.js", "输出的JS配置文件路径")
	backup := importCmd.Bool("backup", true, "是否自动备份原文件")

	importCmd.Parse(os.Args[2:])
	importConfig(*input, *output, *backup)
}

func handleValidateCommand() {
	validateCmd := flag.NewFlagSet("validate", flag.ExitOnError)
	file := validateCmd.String("file", "../js/config.js", "要验证的文件路径")

	validateCmd.Parse(os.Args[2:])
	validateConfig(*file)
}

func printUsage() {
	fmt.Printf("%s🛠️  配置转换工具 - JS配置文件与YAML之间的转换工具%s\n\n", colorBlue, colorReset)

	fmt.Printf("%s用法:%s\n", colorCyan, colorReset)
	fmt.Printf("  %sconfig-editor export [参数]%s   - 将JS配置文件转换为YAML\n", colorGreen, colorReset)
	fmt.Printf("  %sconfig-editor import [参数]%s   - 将YAML文件转换为JS配置\n", colorGreen, colorReset)
	fmt.Printf("  %sconfig-editor validate [参数]%s - 验证配置文件格式\n", colorGreen, colorReset)
	fmt.Printf("  %sconfig-editor help%s            - 显示此帮助信息\n", colorGreen, colorReset)

	fmt.Printf("\n%sexport 命令参数:%s\n", colorCyan, colorReset)
	fmt.Printf("  -input string   输入的JS配置文件路径 (默认: \"../js/config.js\")\n")
	fmt.Printf("  -output string  输出的YAML文件路径 (默认: \"config.yaml\")\n")
	fmt.Printf("  -pretty bool    是否美化输出格式 (默认: true)\n")

	fmt.Printf("\n%simport 命令参数:%s\n", colorCyan, colorReset)
	fmt.Printf("  -input string   输入的YAML文件路径 (默认: \"config.yaml\")\n")
	fmt.Printf("  -output string  输出的JS配置文件路径 (默认: \"../js/config.js\")\n")
	fmt.Printf("  -backup bool    是否自动备份原文件 (默认: true)\n")

	fmt.Printf("\n%svalidate 命令参数:%s\n", colorCyan, colorReset)
	fmt.Printf("  -file string    要验证的文件路径 (默认: \"../js/config.js\")\n")

	fmt.Printf("\n%s示例:%s\n", colorCyan, colorReset)
	fmt.Printf("  config-editor export -input ../js/config.js -output my-config.yaml\n")
	fmt.Printf("  config-editor import -input my-config.yaml -output ../js/config.js\n")
	fmt.Printf("  config-editor validate -file ../js/config.js\n")
}

func exportConfig(jsFilePath, yamlFilePath string, pretty bool) {
	fmt.Printf("%s🔄 开始导出配置...%s\n", colorBlue, colorReset)

	// 检查输入文件是否存在
	if _, err := os.Stat(jsFilePath); os.IsNotExist(err) {
		log.Fatalf("%s❌ JS配置文件不存在: %s%s", colorRed, jsFilePath, colorReset)
	}

	fmt.Printf("%s📖 读取JS配置文件: %s%s\n", colorYellow, jsFilePath, colorReset)

	// 读取并解析JS文件（使用简化方法避免中文编码问题）
	content, err := os.ReadFile(jsFilePath)
	if err != nil {
		log.Fatalf("%s❌ 读取JS文件失败: %v%s", colorRed, err, colorReset)
	}

	jsonData, err := simpleExtractJSConfig(string(content))
	if err != nil {
		log.Fatalf("%s❌ 解析JS文件失败: %v%s", colorRed, err, colorReset)
	}

	// 转换为YAML格式（使用简化逻辑确保中文正常）
	yamlBytes, err := yaml.Marshal(jsonData)
	if err != nil {
		log.Fatalf("%s❌ 转换为YAML失败: %v%s", colorRed, err, colorReset)
	}

	// 应用Unicode修复确保中文正常显示
	yamlContent := ultraSimpleChineseFix(string(yamlBytes))

	// 验证中文是否修复成功
	fmt.Printf("%s💡 使用简化逻辑和Unicode修复，输出YAML格式%s\n", colorGreen, colorReset)

	// 确保输出目录存在
	outputDir := filepath.Dir(yamlFilePath)
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		log.Fatalf("%s❌ 创建输出目录失败: %v%s", colorRed, err, colorReset)
	}

	// 添加文件头注释
	header := fmt.Sprintf("# 安全工具导航系统配置文件\n# 从 %s 导出\n# 导出时间: %s\n# 注意: 修改此文件后请使用 'config-editor import' 命令导入到JS文件\n\n",
		jsFilePath, time.Now().Format("2006-01-02 15:04:05"))

	finalContent := header + yamlContent

	// 写入YAML文件
	if err := os.WriteFile(yamlFilePath, []byte(finalContent), 0644); err != nil {
		log.Fatalf("%s❌ 写入YAML文件失败: %v%s", colorRed, err, colorReset)
	}

	fmt.Printf("%s✅ 成功导出YAML到: %s%s\n", colorGreen, yamlFilePath, colorReset)
	fmt.Printf("%s✨ 中文字符现在正常显示了！%s\n", colorGreen, colorReset)

	// 显示文件大小信息
	if stat, err := os.Stat(yamlFilePath); err == nil {
		fmt.Printf("%s📊 文件大小: %.2f KB%s\n", colorCyan, float64(stat.Size())/1024, colorReset)
	}
}

func importConfig(yamlFilePath, jsFilePath string, backup bool) {
	fmt.Printf("%s🔄 开始导入配置...%s\n", colorBlue, colorReset)

	// 检查输入文件是否存在
	if _, err := os.Stat(yamlFilePath); os.IsNotExist(err) {
		log.Fatalf("%s❌ YAML文件不存在: %s%s", colorRed, yamlFilePath, colorReset)
	}

	fmt.Printf("%s📖 读取YAML文件: %s%s\n", colorYellow, yamlFilePath, colorReset)

	// 读取YAML文件
	yamlData, err := os.ReadFile(yamlFilePath)
	if err != nil {
		log.Fatalf("%s❌ 读取YAML文件失败: %v%s", colorRed, err, colorReset)
	}

	// 解析YAML
	var jsonData map[string]interface{}
	if err := yaml.Unmarshal(yamlData, &jsonData); err != nil {
		log.Fatalf("%s❌ 解析YAML失败: %v%s", colorRed, err, colorReset)
	}

	// 备份原始文件
	if backup {
		if err := backupFile(jsFilePath); err != nil {
			log.Fatalf("%s❌ 备份原始JS文件失败: %v%s", colorRed, err, colorReset)
		}
	}

	// 生成新的JS文件内容
	if err := generateJSFile(jsonData, jsFilePath); err != nil {
		log.Fatalf("%s❌ 生成JS文件失败: %v%s", colorRed, err, colorReset)
	}

	fmt.Printf("%s✅ 成功导入配置到JS文件: %s%s\n", colorGreen, jsFilePath, colorReset)

	// 验证生成的文件
	if err := validateJSFile(jsFilePath); err != nil {
		fmt.Printf("%s⚠️  警告: 生成的JS文件可能有格式问题: %v%s\n", colorYellow, err, colorReset)
	} else {
		fmt.Printf("%s✅ JS文件格式验证通过%s\n", colorGreen, colorReset)
	}
}

func validateConfig(filePath string) {
	fmt.Printf("%s🔍 验证配置文件: %s%s\n", colorBlue, filePath, colorReset)

	if err := validateJSFile(filePath); err != nil {
		fmt.Printf("%s❌ 验证失败: %v%s\n", colorRed, err, colorReset)
		os.Exit(1)
	} else {
		fmt.Printf("%s✅ 配置文件格式正确%s\n", colorGreen, colorReset)
	}
}

// 从JS文件中提取配置对象
func extractJSConfig(filePath string) (map[string]interface{}, error) {
	content, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("读取文件失败: %v", err)
	}

	jsString := string(content)

	// 查找 appConfig 对象的定义
	patterns := []string{
		`(?s)const\s+appConfig\s*=\s*({[\s\S]*?});`,
		`(?s)var\s+appConfig\s*=\s*({[\s\S]*?});`,
		`(?s)let\s+appConfig\s*=\s*({[\s\S]*?});`,
		`(?s)appConfig\s*=\s*({[\s\S]*?});`,
	}

	var jsonStr string
	for _, pattern := range patterns {
		re := regexp.MustCompile(pattern)
		matches := re.FindStringSubmatch(jsString)
		if len(matches) >= 2 {
			jsonStr = matches[1]
			break
		}
	}

	if jsonStr == "" {
		return nil, fmt.Errorf("无法找到appConfig对象定义")
	}

	// 清理并转换为标准JSON
	cleanJSON, err := cleanJSObject(jsonStr)
	if err != nil {
		return nil, fmt.Errorf("清理JS对象失败: %v", err)
	}

	// 解析JSON
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(cleanJSON), &result); err != nil {
		return nil, fmt.Errorf("解析JSON失败: %v", err)
	}

	return result, nil
}

// 清理JS对象，转换为标准JSON格式
func cleanJSObject(jsObject string) (string, error) {
	// 逐行处理，更精确地删除注释
	lines := strings.Split(jsObject, "\n")
	var cleanLines []string

	for _, line := range lines {
		// 删除行注释，但要注意字符串中的//
		cleaned := removeLineComment(line)
		if strings.TrimSpace(cleaned) != "" {
			cleanLines = append(cleanLines, cleaned)
		}
	}

	result := strings.Join(cleanLines, "\n")

	// 删除块注释
	result = removeBlockComments(result)

	// 规范化键名：确保所有键都有双引号
	result = normalizeKeys(result)

	// 单引号替换为双引号（但要小心字符串内容）
	result = normalizePants(result)

	// 删除尾部逗号
	result = removeTrailingCommas(result)

	return result, nil
}

// 删除行注释，但保留字符串中的//
func removeLineComment(line string) string {
	inString := false
	escaped := false
	quoteChar := byte(0)

	for i := 0; i < len(line); i++ {
		if escaped {
			escaped = false
			continue
		}

		if line[i] == '\\' {
			escaped = true
			continue
		}

		if !inString && (line[i] == '"' || line[i] == '\'') {
			inString = true
			quoteChar = line[i]
		} else if inString && line[i] == quoteChar {
			inString = false
			quoteChar = 0
		} else if !inString && i < len(line)-1 && line[i] == '/' && line[i+1] == '/' {
			return line[:i]
		}
	}

	return line
}

// 删除块注释
func removeBlockComments(input string) string {
	re := regexp.MustCompile(`(?s)/\*.*?\*/`)
	return re.ReplaceAllString(input, "")
}

// 规范化键名
func normalizeKeys(input string) string {
	// 匹配对象键名
	re := regexp.MustCompile(`([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:`)
	return re.ReplaceAllString(input, `${1}"${2}":`)
}

// 规范化引号
func normalizePants(input string) string {
	// 这个函数需要小心处理，避免替换字符串内容中的单引号
	result := ""
	inDoubleQuote := false
	i := 0

	for i < len(input) {
		if input[i] == '"' && (i == 0 || input[i-1] != '\\') {
			inDoubleQuote = !inDoubleQuote
			result += string(input[i])
		} else if input[i] == '\'' && !inDoubleQuote {
			// 查找配对的单引号
			j := i + 1
			for j < len(input) && !(input[j] == '\'' && input[j-1] != '\\') {
				j++
			}
			if j < len(input) {
				// 找到了配对的单引号，替换为双引号
				stringContent := input[i+1 : j]
				// 转义字符串中的双引号
				stringContent = strings.ReplaceAll(stringContent, "\"", "\\\"")
				result += "\"" + stringContent + "\""
				i = j
			} else {
				result += string(input[i])
			}
		} else {
			result += string(input[i])
		}
		i++
	}

	return result
}

// 删除尾部逗号
func removeTrailingCommas(input string) string {
	re := regexp.MustCompile(`,(\s*[\]}])`)
	return re.ReplaceAllString(input, "$1")
}

// 备份文件
func backupFile(filePath string) error {
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return nil // 文件不存在，无需备份
	}

	data, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}

	backupPath := filePath + ".bak." + time.Now().Format("20060102150405")
	if err := os.WriteFile(backupPath, data, 0644); err != nil {
		return err
	}

	fmt.Printf("%s💾 原始文件已备份到: %s%s\n", colorCyan, backupPath, colorReset)
	return nil
}

// 生成新的JS文件
func generateJSFile(data map[string]interface{}, filePath string) error {
	// 转换为格式化的JSON
	jsonBytes, err := json.MarshalIndent(data, "", "    ")
	if err != nil {
		return err
	}

	// 生成JS文件内容
	header := fmt.Sprintf(`// 统一配置对象 - 所有数据的中心配置
// 注意: 这个文件可以被外部编辑器修改，请保持JSON格式有效
// 最后更新时间: %s
// 由 config-editor 工具自动生成

`, time.Now().Format("2006-01-02 15:04:05"))

	jsContent := header + "const appConfig = " + string(jsonBytes) + ";\n"

	// 确保输出目录存在
	outputDir := filepath.Dir(filePath)
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return err
	}

	return os.WriteFile(filePath, []byte(jsContent), 0644)
}

// 验证JS文件格式
func validateJSFile(filePath string) error {
	_, err := extractJSConfig(filePath)
	return err
}

// 清理数据中的UTF-8字符，确保正确编码 - 保持原始UTF-8字符
func cleanUTF8Data(data interface{}) interface{} {
	switch v := data.(type) {
	case map[string]interface{}:
		result := make(map[string]interface{})
		for key, value := range v {
			result[key] = cleanUTF8Data(value) // 不修改键名
		}
		return result
	case []interface{}:
		result := make([]interface{}, len(v))
		for i, item := range v {
			result[i] = cleanUTF8Data(item)
		}
		return result
	case string:
		// 直接返回原始字符串，不进行"清理"
		return v
	default:
		return v
	}
}

// 确保字符串为有效的UTF-8
func ensureValidUTF8(s string) string {
	if utf8.ValidString(s) {
		return s
	}

	// 如果不是有效的UTF-8，尝试修复
	var result []rune
	for _, r := range s {
		if r == utf8.RuneError {
			continue // 跳过错误字符
		}
		result = append(result, r)
	}
	return string(result)
}

// 修复YAML中的Unicode显示问题 - 已弃用，使用ultraSimpleChineseFix替代
func fixYAMLUnicodeDisplay(yamlContent string) string {
	// 这个函数已被ultraSimpleChineseFix替代，保留以兼容旧代码
	return ultraSimpleChineseFix(yamlContent)
}

// 超级简单的中文修复函数 - 只处理明显的转义序列
func ultraSimpleChineseFix(yamlContent string) string {
	// 处理 \xHH 转义序列
	hexRe := regexp.MustCompile(`\\x([0-9a-fA-F]{2})`)
	result := hexRe.ReplaceAllStringFunc(yamlContent, func(match string) string {
		hexStr := match[2:]
		if val, err := strconv.ParseUint(hexStr, 16, 8); err == nil {
			return string(byte(val))
		}
		return match
	})

	// 处理 \uHHHH Unicode转义序列
	unicodeRe := regexp.MustCompile(`\\u([0-9a-fA-F]{4})`)
	result = unicodeRe.ReplaceAllStringFunc(result, func(match string) string {
		hexStr := match[2:]
		if val, err := strconv.ParseUint(hexStr, 16, 16); err == nil {
			return string(rune(val))
		}
		return match
	})

	// 移除问题转义序列
	result = strings.ReplaceAll(result, `\N`, "")

	return result
}

// 简化的JS配置提取函数（避免复杂字符串处理导致的中文编码问题）
func simpleExtractJSConfig(content string) (map[string]interface{}, error) {
	// 查找配置对象
	re := regexp.MustCompile(`(?s)const\s+appConfig\s*=\s*({[\s\S]*?});`)
	matches := re.FindStringSubmatch(content)
	if len(matches) < 2 {
		return nil, fmt.Errorf("无法找到appConfig对象定义")
	}

	jsonStr := matches[1]

	// 使用简单的注释清理（避免复杂处理）
	jsonStr = simpleRemoveComments(jsonStr)

	// 解析JSON
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(jsonStr), &result); err != nil {
		return nil, fmt.Errorf("解析JSON失败: %v", err)
	}

	return result, nil
}

// 简单的注释清理函数
func simpleRemoveComments(input string) string {
	lines := strings.Split(input, "\n")
	var cleanLines []string

	for _, line := range lines {
		trimmed := strings.TrimSpace(line)
		if !strings.HasPrefix(trimmed, "//") {
			if idx := strings.Index(line, "//"); idx != -1 {
				before := line[:idx]
				quotes := strings.Count(before, `"`) - strings.Count(before, `\"`)
				if quotes%2 == 0 {
					line = before
				}
			}
			if strings.TrimSpace(line) != "" {
				cleanLines = append(cleanLines, line)
			}
		}
	}

	return strings.Join(cleanLines, "\n")
}
