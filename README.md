# 六角學院 Vue 直播班 - 第六周作業
## 🚩第一次批改，修正建議
- [x] 若判斷購物車沒有產品，也可以將清空購物車按鈕做 disabled
- [x] 修改購物車中商品數量 API 會使用到兩種 id ，在 API 的網址會使用到 data.id，而戴上的參數資料會使用到 data.product_id 。這會導致相同品項分別出現在購物車列表，而不是累加數量。（如下圖所示）
  ![商品內容重覆](https://images.hexschool.com/qa/17537644344834527278_2024-02-23T07:15:02Z.png)
- [x] 表單驗證的提示訊息建議為中文唷
- [x] apiUrl、apiPath 不建議放在 data 唷
- [x] 單一產品細節函式如果要使用，也可以用在 openModal 的時候，或之後有獨立的單一細節頁面時（需做動態路由的配置）
- [X] 登入及登出的設置需為一致，避免登出再登入後，會產生兩個 token 欄位，而造成驗證上的 Bug，像是登出後還能進到後台，或者登入後出現驗證錯誤等。
```javascript
document.cookie = `token=${token};expired=${new Date(expired)};path=/`
document.cookie = 'token=; expires=; path=/'
```