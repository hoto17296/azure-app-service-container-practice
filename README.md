# Azure App Service (Container) Practice
単一コンテナの Web アプリを Azure App Service で動かしてみる練習

## 開発環境
開発環境では Frontend と Backend を別コンテナで動かして Reverse Proxy する。(詳しくは [compose.yml] を参照)

```
$ docker compose up
```

## 本番環境 (Azure App Service)
本番環境では Frontend コードをビルドして Backend コンテナの中から静的配信する。(詳しくは [Dockerfile] を参照)

### Setup
- 作業端末に Azure CLI をインストールしてログインする
  - `az login`
- Azure Container Registry でレジストリを作成する
  - 「アクセスキー」で「管理者ユーザー」を有効にする (しないと App Service からデプロイ出来ない)
  - リポジトリを作成しておく (下記 Deploy セクションの 1. を参照)
- App Service を作成する
  - ACR からデプロイするように設定しつつ作成する
  - 作成後、メニューの「認証」から Azure AD 認証の設定を行う
    - 未認証の場合は HTTP 302 を返すように設定する

### Deploy (with Azure CLI)
#### 1. イメージをビルドして ACR にプッシュ
``` console
$ az acr build --registry ${ACR_REGISTRY_NAME} --image ${ACR_IMAGE_NAME} .
```

#### 2. デプロイ
App Service 側の設定で「継続的デプロイ」が有効になっていれば、ACR に push した時点で自動でデプロイされるので特に操作は不要