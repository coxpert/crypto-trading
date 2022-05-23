import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'

const postOrder = async (req: Request, res: Response): Promise<void> => {
  res.send()
}

export default asyncWrapper(postOrder)
