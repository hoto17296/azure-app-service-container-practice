# Azure App Service (Python) Practice

## Setup
0. Azure Portal から App Service を作成する
  - ランタイムは Python 3.11
0. 「構成」>「全般設定」>「スタートアップコマンド」を設定する
  - `./startup.sh` と入力して保存
0. 「デプロイセンター」>「設定」>「ソース」を設定する
  - `ローカル Git` に設定する

## Deploy (with Visual Studio Code)
0. 拡張機能 Azure Tool を入れると左側に出てくるサイドバーから Azure メニューを開く
0. サブスクリプションと App Service リソースを選択する
0. 右クリック →「Deplot to Web App...」