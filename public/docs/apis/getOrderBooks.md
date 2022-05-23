# Get Order Books

### _GET_

```bash
/trade/get-order-books
```

---

### Request Headers

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json |             |

---

### Body

| Key       | Required | Type   |
| --------- | -------- | ------ |
| tokenPair | YES      | Number |
| ChainId   | YES      | String |

---

### Response

```json
{
  "status": 200,
  "data": {}
}
```
