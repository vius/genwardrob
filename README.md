## 项目部署在vercel.com上

### 修改后端地址

```
VITE_API_URL=https://c639-2406-3003-2001-311d-99b9-12e0-dddd-f101.ngrok-free.app
```

1、分支切换到main上
2、拉去最新代码
3、修改.env.production文件中的VITE_API_URL为后端地址
4、修改完成之后代码push到github上
5、vercel.com上重新部署项目（main分支代码变更会自动打包上线），此步骤可忽略
