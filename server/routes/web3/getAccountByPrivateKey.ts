import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'
import Web3 from 'web3'

const getAccountByPrivateKey = async (
  req: Request,
  res: Response
): Promise<void> => {
  const web3 = new Web3()
  const data = await web3.eth.accounts.privateKeyToAccount(
    '9dad3f06813a4677039620e459280c1dc2c826d267c3ffbbc213ef1f50fa17d57'
  )

  res.send({
    status: 200,
    valid: true,
    data: data
  })
}

export default asyncWrapper(getAccountByPrivateKey)
