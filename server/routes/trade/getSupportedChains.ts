import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'

const getSupportedChains = async (req: Request, res: Response): Promise<void> => {
  res.send()
}

export default asyncWrapper(getSupportedChains)
