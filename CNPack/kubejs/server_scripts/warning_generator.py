import re
import json

# 读取 secret.js 文件
with open('secret.js', 'r', encoding='utf-8') as file:
    content = file.read()

# 匹配 warnings 数组中的字符串
pattern = re.compile(r'["\']§.*?["\']', re.DOTALL)
matches = pattern.findall(content)

# 生成翻译键和值
translations = {}
for i, match in enumerate(matches):
    # 去掉字符串两端的引号
    stripped_match = match[1:-1]
    key = f"waring.secret.{i+1}"
    translations[key] = stripped_match

# 替换 warnings 数组中的字符串为翻译键
new_warnings = [f"'{key}'" for key in translations.keys()]
new_warnings_str = ',\n    '.join(new_warnings)
new_content = re.sub(r"const warnings = \[.*?\];", f"const warnings = [\n    {new_warnings_str}\n];", content, flags=re.DOTALL)

# 写入新的 secret_translated.js 文件
with open('secret_translated.js', 'w', encoding='utf-8') as file:
    file.write(new_content)

# 生成 Minecraft 语言文件 en_us.json
with open('en_us.json', 'w', encoding='utf-8') as file:
    json.dump(translations, file, ensure_ascii=False, indent=4)

print("文件已生成：secret_translated.js 和 en_us.json")