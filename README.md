# Prefectures Population Chart

都道府県別の総人口推移グラフを表示するSPA

## 仕様

- RESAS APIの [都道府県一覧](https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html) を取得してチェックボックスを動的に生成する
- 都道府県にチェックを入れると、RESAS APIから選択された都道府県の  [人口構成](https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html) を取得し、X軸:年、Y軸:人口数の折れ線グラフを Chartjsで 動的に生成して表示する

### 起動方法
- RESAS API の HP にログインして、API キーを取得する
- ルートディレクトリに以下のような`.env`ファイルを作成し、`<RESAS API Key>`に先ほど取得した API キーを入力する

```
NODE_ENV=production
API_KEY=<RESAS API Key>
BASE_URL=https://opendata.resas-portal.go.jp/
```

- 以下のコマンドを実行して起動できる

```bash
$ npm install
$ npm run dev
```

- 以下のコマンドを実行すると、`/test`にある単体テストを実行できる

```bash
$ npm run test
```

## 開発技術

### フレームワーク
- [Nuxt.js](https://nuxtjs.org/)
- [nuxt-property-decorator](https://github.com/nuxt-community/nuxt-property-decorator)

### 開発言語

- [TypeScript](https://www.typescriptlang.org/)

### テストフレームワーク

- [jest](https://jestjs.io/ja/)

### グラフ

- [vue-chartjs](https://github.com/apertureless/vue-chartjs)

### API

- [RESAS API](https://opendata.resas-portal.go.jp/)

### その他

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
