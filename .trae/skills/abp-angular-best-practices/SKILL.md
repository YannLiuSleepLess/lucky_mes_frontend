---
name: "abp-angular-best-practices"
description: "Ensures Angular code follows ABP Framework best practices. Invoke when implementing features in ABP Angular projects."
---

# ABP Angular 最佳实践

## 核心规范

### 1. 服务注入
使用 ABP 提供的服务：
- `MessageService` - 确认对话框
- `ToasterService` - 通知提示

### 2. 表单验证
必须添加完整的表单验证

### 3. API 调用
使用 `abp generate-proxy -t ng` 生成的代理服务，不手动修改

### 4. 错误处理
优雅的错误处理和友好提示

### 5. 模块结构
遵循 ABP 模块约定

## 代码审查检查列表
- [ ] 使用 `MessageService`
- [ ] 使用 `ToasterService`
- [ ] 使用生成的代理服务
- [ ] 表单验证完整
- [ ] 错误处理完善
