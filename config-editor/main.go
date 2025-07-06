package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"regexp"
	"strings"
	"time"

	"gopkg.in/yaml.v3"
	"encoding/json"
)

// 设置命令行参数
func main() {
	// 定义子命令
	exportCmd := flag.NewFlagSet("export", flag.ExitOnError)
	importCmd := flag.NewFlagSet("import", flag.ExitOnError)

	// export命令参数
	exportInput := exportCmd.String("input", "../js/config.js", "输入的JS配置文件路径")
	exportOutput := exportCmd.String("output", "config.yaml", "输出的YAML文件路径")

	// import命令参数
	importInput := importCmd.String("input", "config.yaml", "输入的YAML文件路径")
	importOutput := importCmd.String("output", "../js/config.js", "输出的JS配置文件路径")
	
	// 如果没有提供子命令，显示帮助信息
	if len(os.Args) < 2 {
		printUsage()
		os.Exit(1)
	}
	
	// 解析子命令
	switch os.Args[1] {
	case "export":
		exportCmd.Parse(os.Args[2:])
		exportConfig(*exportInput, *exportOutput)
	case "import":
		importCmd.Parse(os.Args[2:])
		importConfig(*importInput, *importOutput)
	case "help":
		printUsage()
	default:
		fmt.Printf("未知命令: %s\n", os.Args[1])
		printUsage()
		os.Exit(1)
	}
}

// 显示帮助信息
func printUsage() {
	fmt.Println("配置转换工具 - 在JS配置文件和YAML之间进行转换")
	fmt.Println("\n用法:")
	fmt.Println("  config-editor export [参数] - 将JS配置文件转换为YAML")
	fmt.Println("  config-editor import [参数] - 将YAML文件转换为JS配置")
	fmt.Println("  config-editor help         - 显示此帮助信息")
	
	fmt.Println("\nexport命令参数:")
	fmt.Println("  -input string   输入的JS配置文件路径 (默认: \"../js/config.js\")")
	fmt.Println("  -output string  输出的YAML文件路径 (默认: \"config.yaml\")")
	
	fmt.Println("\nimport命令参数:")
	fmt.Println("  -input string   输入的YAML文件路径 (默认: \"config.yaml\")")
	fmt.Println("  -output string  输出的JS配置文件路径 (默认: \"../js/config.js\")")
}

// 从JS文件导出配置到YAML
func exportConfig(jsFilePath, yamlFilePath string) {
	// 读取JS文件
	fmt.Printf("读取JS配置文件: %s\n", jsFilePath)
	jsData, err := os.ReadFile(jsFilePath)
	if err != nil {
		log.Fatalf("读取JS文件失败: %v", err)
	}
	
	// 提取JS对象
	jsString := string(jsData)
	re := regexp.MustCompile(`(?s)const\s+appConfig\s*=\s*({[\s\S]*?});`)
	matches := re.FindStringSubmatch(jsString)
	if len(matches) < 2 {
		log.Fatalf("无法在JS文件中找到appConfig对象")
	}
	
	// 处理JS对象
	jsonStr := matches[1]
	jsonStr = processJSObject(jsonStr)
	
	// 解析为JSON对象
	var jsonData map[string]interface{}
	if err := json.Unmarshal([]byte(jsonStr), &jsonData); err != nil {
		log.Fatalf("解析JSON失败: %v", err)
	}
	
	// 转换为YAML
	yamlData, err := yaml.Marshal(jsonData)
	if err != nil {
		log.Fatalf("转换为YAML失败: %v", err)
	}
	
	// 写入YAML文件
	if err := os.WriteFile(yamlFilePath, yamlData, 0644); err != nil {
		log.Fatalf("写入YAML文件失败: %v", err)
	}
	
	fmt.Printf("成功导出YAML到: %s\n", yamlFilePath)
}

// 从YAML导入配置到JS
func importConfig(yamlFilePath, jsFilePath string) {
	// 读取YAML文件
	fmt.Printf("读取YAML文件: %s\n", yamlFilePath)
	yamlData, err := os.ReadFile(yamlFilePath)
	if err != nil {
		log.Fatalf("读取YAML文件失败: %v", err)
	}
	
	// 解析YAML
	var jsonData map[string]interface{}
	if err := yaml.Unmarshal(yamlData, &jsonData); err != nil {
		log.Fatalf("解析YAML失败: %v", err)
	}
	
	// 转换为格式化的JSON
	jsonBytes, err := json.MarshalIndent(jsonData, "", "    ")
	if err != nil {
		log.Fatalf("转换为JSON失败: %v", err)
	}
	
	// 读取原始JS文件以保留格式
	jsData, err := os.ReadFile(jsFilePath)
	if err != nil {
		if !os.IsNotExist(err) {
			log.Fatalf("读取原始JS文件失败: %v", err)
		}
		// 如果文件不存在，创建新的文件内容
		jsData = []byte("// 统一配置对象 - 所有数据的中心配置\n// 注意: 这个文件可以被外部编辑器修改，请保持JSON格式有效\nconst appConfig = {};\n")
	}
	
	// 备份原始文件
	if _, err := os.Stat(jsFilePath); !os.IsNotExist(err) {
		backupPath := jsFilePath + ".bak." + time.Now().Format("20060102150405")
		if err := os.WriteFile(backupPath, jsData, 0644); err != nil {
			log.Fatalf("备份原始JS文件失败: %v", err)
		}
		fmt.Printf("原始JS文件已备份到: %s\n", backupPath)
	}
	
	// 替换配置对象
	jsString := string(jsData)
	re := regexp.MustCompile(`(?s)(const\s+appConfig\s*=\s*)({[\s\S]*?})(;)`)
	newJsString := re.ReplaceAllString(jsString, "${1}"+string(jsonBytes)+"${3}")
	
	// 如果没有匹配到，则追加到文件末尾
	if jsString == newJsString && !strings.Contains(jsString, "const appConfig = ") {
		newJsString = "// 统一配置对象 - 所有数据的中心配置\n// 注意: 这个文件可以被外部编辑器修改，请保持JSON格式有效\nconst appConfig = " + string(jsonBytes) + ";\n"
	}
	
	// 写入更新后的JS文件
	if err := os.WriteFile(jsFilePath, []byte(newJsString), 0644); err != nil {
		log.Fatalf("写入JS文件失败: %v", err)
	}
	
	fmt.Printf("成功导入配置到JS文件: %s\n", jsFilePath)
}

// 处理JS对象，转换为标准JSON
func processJSObject(jsObject string) string {
	// 删除注释
	jsObject = removeComments(jsObject)
	
	// 确保所有键都有双引号
	jsObject = regexp.MustCompile(`(['"])?([a-zA-Z0-9_]+)(['"])?:`).ReplaceAllString(jsObject, `"$2":`)
	
	// 单引号替换为双引号
	jsObject = regexp.MustCompile(`'([^']*)'`).ReplaceAllString(jsObject, `"$1"`)
	
	// 删除尾部逗号
	jsObject = regexp.MustCompile(`,(\s*[\]}])`).ReplaceAllString(jsObject, "$1")
	
	return jsObject
}

// 删除JS注释
func removeComments(input string) string {
	// 删除块注释 /* ... */
	input = regexp.MustCompile(`(?s)/\*.*?\*/`).ReplaceAllString(input, "")
	
	// 删除行注释 // ...
	var lines []string
	for _, line := range strings.Split(input, "\n") {
		if idx := strings.Index(line, "//"); idx >= 0 {
			line = line[:idx]
		}
		if strings.TrimSpace(line) != "" {
			lines = append(lines, line)
		}
	}
	
	return strings.Join(lines, "\n")
}



 