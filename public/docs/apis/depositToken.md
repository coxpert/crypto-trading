# Deposit Token

### _POST_

```bash
/trade/deposit-token
```

---

### Request Headers

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json |             |

---

### Parameters

| Key         | Required | Type   | Default | Description |
| ----------- | -------- | ------ | ------- | ----------- |
| Private Key | YES      | String |         |             |
| Token       | YES      | String |         |             |
| Amount      | YES      | Number |         |             |

---

#### Sample Request

```json
{
  "privateKey": "9dad3f06813a4677039620e459280c1dc2c826d267c3fbbc213ef1f50fa17d57",
  "token": "",
  "amount": 10
}
```

### Response

```json
{
  "status": 200,
  "data": {}
}
```
