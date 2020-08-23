## 手順

1. 下記リポジトリをFork  
https://github.com/mochan-tk/azure-static-web-apps-liff  
2. Azureストレージアカウントのコンテナを作成し（パブリックアクセスはコンテナを選択）、ストレージアカウント名とアクセスキーをメモする  
3. 下記URLを参考にAzure Static Web Appsを連携  
https://docs.microsoft.com/ja-jp/azure/static-web-apps/getting-started?tabs=angular#create-a-static-web-app  

ビルドは下記のように入力する  
- [App location](アプリの場所) ボックスに「 /front 」と入力します  
- [Api location](Api の場所) ボックスに「 api 」と入力します  
- [App artifact location](アプリ成果物の場所) ボックスに「build」と入力します  

4. 作成後、「概要」メニューにあるURLをメモする  
5. [2]でメモしたものを「構成」メニューにて追加して保存する  
- [AZURE_STORAGE_ACCOUNT_NAME]=ストレージアカウント名  
- [AZURE_STORAGE_ACCOUNT_ACCESS_KEY]=アクセスキー  

6. LIFFのエンドポイントに[4]でメモしたURLを入力する  
7. LIFF ID をメモする  
8. [5]に戻り[7]でメモしたものを「構成」メニューにて追加して保存する  
- [MY_LIFF_ID]=LIFF ID  

9. .github/workflows/azure-static-web-apps-xx-xx-xx.ymlの最後に下記を追加する  
```json
  e2e_test_job:		
    needs: build_and_deploy_job	
    runs-on: ubuntu-latest
    name: E2E Test Job
    steps:		
      - uses: actions/checkout@v2
        with:
          submodules: true      
      - uses: cypress-io/github-action@v2
        with:
          working-directory: front
          browser: chrome
          env: baseUrl=https://xx-xx-xx.azurestaticapps.net/
      - uses: actions/upload-artifact@v1
        if: failure()
        with:
          name: Cypress Screenshots
          path: front/cypress/screenshots
      - uses: actions/upload-artifact@v1
        if: always()
        with:
          name: Cypress Videos
          path: front/cypress/videos
```
10. リポジトリをpushする  
11. 作成したLIFFで動作確認する  
https://liff.line.me/[7でメモしたLIFF ID]
