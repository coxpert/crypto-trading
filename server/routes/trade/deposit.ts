import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'

const deposit = async (req: Request, res: Response): Promise<void> => {
  res.send()
}

export default asyncWrapper(deposit)
