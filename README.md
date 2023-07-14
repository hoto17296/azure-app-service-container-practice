# Azure App Service (Container) Practice
単一コンテナの Web アプリを Azure App Service で動かしてみる練習

## 開発環境
```
$ docker compose up
```

## 本番環境 (Azure App Service)
### Setup
- 作業端末に Azure CLI をインストールしてログインする
  - `az login`
- Azure Container Registry でレジストリを作成する
  - 「アクセスキー」で「管理者ユーザー」を有効にする (しないと App Service からデプロイ出来ない)
  - リポジトリを作成しておく (下記 Deploy セクションの 1. を参照)
- App Service を作成する
  - ACR からデプロイするように設定しつつ作成する
  - 「継続的デプロイ」を有効にする

### Deploy (with Azure CLI)
#### 1. イメージをビルドして ACR にプッシュ
``` console
$ az acr build --registry ${ACR_REGISTRY_NAME} --image ${ACR_IMAGE_NAME} .
```

#### 2. デプロイ
App Service の設定が正しくできていれば、push した時点で自動でデプロイされるっぽい...？