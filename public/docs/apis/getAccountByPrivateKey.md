# Get Account By Private Key

Returns account address of the private ky re

### _GET_

```bash
/web3/get-account-by-private-key
```

---

### Request Headers

| Key | Value | Description |
| --- | ----- | ----------- |

---

### Body

| Key        | Required | Type   | Description                          |
| ---------- | -------- | ------ | ------------------------------------ |
| privateKey | Yes      | String | Private key from your wallet account |

---

#### Sample Request

```json
{
  "privateKey": "9dad3f06813a4677039620e459280c1dc2c826d267c3fbbc213ef1f50fa17d57"
}
```

### Response

```json
{
  "status": 200,
  "data": {
    "valid": true,
    "account": "0x1c477D7c0B83C1848545CDcb5BE706f3a07E2e55",
    "privateKey": "9dad3f06813a4677039620e459280c1dc2c826d267c3fbbc213ef1f50fa17d57"
  }
}
```
