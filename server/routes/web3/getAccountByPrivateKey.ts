import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'
import Web3 from 'web3'

const getAccountByPrivateKey = async (
  req: Request,
  res: Response
): Promise<void> => {
  const privateKey = req.query.privateKey as string
  if (!privateKey) {
    res.boom.badData('Missing private key')
  }
  const web3 = new Web3()
  try {
    const data = await web3.eth.accounts.privateKeyToAccount(privateKey)
    res.send({
      valid: true,
      ...data
    })
  } catch (error: any) {
    res.send({
      valid: false,
      error: error.message || error
    })
  }
}

export default asyncWrapper(getAccountByPrivateKey)
