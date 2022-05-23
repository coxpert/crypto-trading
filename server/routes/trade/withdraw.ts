import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'

const withdraw = async (req: Request, res: Response): Promise<void> => {
  res.send()
}

export default asyncWrapper(withdraw)
