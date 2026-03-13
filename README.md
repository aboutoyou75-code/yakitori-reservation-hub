# 炭焼やきとり一番 三条添川店 - 予約ハブ

このリポジトリは、「炭焼やきとり一番 三条添川店」向けの、スマートフォンに最適化された1ページ完結型の予約サイト（予約ハブ）です。

## 特徴

- **スマホ最適化設計**: 下部のSticky Navigationにより「予約」「電話」「地図」へ即座にアクセス。
- **仮予約システム**: フォーム送信内容はGoogleスプレッドシートに保存され、店舗とユーザー（メール入力時）に通知が飛びます。
- **データ計測**:
    - GA4連携（Cookie同意バナー付き）。
    - 各種クリックイベント、フォーム送信、UTMパラメータの自動計測。
- **セキュリティ**:
    - Honeypotによるスパム対策。
    - IPアドレスのハッシュ化（匿名化）によるプライバシー配慮。
- **プライバシーポリシー**: `/privacy` ページを完備。

## 売り込み・デモ時のポイント

このサイトを店舗様に提案する際は、以下の点に触れると効果的です：
1. **「予約の取りこぼし」を防ぐ**: 電話をかけるほどではないが予約したい層（深夜や隙間時間）を、スマホに最適化されたフォームで確実にキャッチします。
2. **「SNSとの連携」**: InstagramやGoogleマップからの導線を本サイトに集約することで、どこから予約が入ったか一目で分かるようになります（UTM計測機能）。
3. **「導入の軽さ」**: 既存のGoogleスプレッドシートにデータが溜まるため、大掛かりな予約システムの導入コストを抑えられます。

> [!TIP]
> **ダミーモード（デモ用）**:
> 環境変数（APIキー等）を設定していない状態でも、予約フォームは動作し、送信完了画面まで進むことができます。まずはこの状態で店舗様にタブレット等で操作感を確認してもらうことが可能です。

## 技術スタック

- **Next.js 15 (App Router)**
- **Tailwind CSS**
- **TypeScript**
- **Lucide React** (アイコン)
- **React Hook Form + Zod** (フォームバリデーション)
- **Google Spreadsheet API** (データ保存)
- **Resend** (メール送信)

## 環境変数の設定 (.env.local)

Vercelのプロジェクト設定、またはローカルの `.env.local` に以下の変数を設定してください。

```text
# Google Sheets (サービスアカウント)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@...
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyContentHere\n-----END PRIVATE KEY-----"
GOOGLE_SHEET_ID=your-spreadsheet-id-from-url

# Resend
RESEND_API_KEY=re_your_api_key

# Admin
ADMIN_EMAIL=store-notification-email@example.com

# GA4 (Measurement ID)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> [!IMPORTANT]
> `GOOGLE_PRIVATE_KEY` の改行コード（`\n`）は、Vercelの環境変数設定画面でダブルクォーテーションで囲んで入力するか、ソースコード内での置換処理が正しく行われるようにしてください（本実装では `.replace(/\\n/g, '\n')` で対応済み）。

## Google Sheets / サービスアカウント設定手順

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成。
2. **Google Sheets API** を有効化。
3. **サービスアカウント**を作成し、`JSON` 形式の鍵を発行。
4. 発行された `client_email` と `private_key` を環境変数に設定。
5. 保存先のGoogleスプレッドシートを開き、**サービスアカウントのメールアドレスを「編集者」として共有**。
6. スプレッドシートの1行目に以下のカラム名を作成：
   `created_at`, `store_name`, `date`, `time`, `party_size`, `customer_name`, `phone`, `email`, `note`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `user_agent`, `ip_hash`

## メールプロバイダ（Resend）設定手順

1. [Resend](https://resend.com/) でアカウントを作成。
2. API Keyを取得し設定。
3. (本番運用時) 独自のドメインを認証させ、`from` アドレスを店舗ドメインに合わせることを推奨。

---

## 運用ガイド：導線統一の手順

公開後、以下の設定を行うことで計測と予約獲得を最大化できます。

### 1. Google ビジネスプロフィール
- 「ウェブサイト」項目に本サイトのURLを設定。
- 「予約」リンクにも本サイトのURLを設定。
- 推奨URL末尾: `?utm_source=google&utm_medium=organic&utm_campaign=gbp_website`

### 2. Instagram
- プロフィールリンク（bio）を本サイトのURLに統一。
- 推奨URL末尾: `?utm_source=instagram&utm_medium=social&utm_campaign=bio`

### 3. その他媒体（食べログ・ぐるなび等）
- 外部リンクが貼れる場合は、以下のUTMパラメータを付与してリンク。
- 例（食べログ）: `?utm_source=tabelog&utm_medium=referral&utm_campaign=profile`

## 開発・起動

```bash
npm install
npm run dev
```

## デプロイ

VercelへGitHub連携してデプロイすることを推奨します。環境変数の忘れに注意してください。
