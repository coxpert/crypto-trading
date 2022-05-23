# Get Latest Price

### _GET_

```bash
/trade/latest-price
```

---

### Request Headers

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json |             |

---

### Body

| Key       | Required | Type   | Default |
| --------- | -------- | ------ | ------- |
| chainId   | YES      | Number |         |
| tokenPair | YES      | String |         |
| orderType | YES      |        |         |
| decimals  | YES      |        |         |

#### Sample Request

```json
{
  "chainId": 1088,
  "tokenPair": "",
  "orderType": "",
  "decimals": ""
}
```

---

### Response

#### Sample response

```json
{
  "status": 200,
  "data": {}
}
```
