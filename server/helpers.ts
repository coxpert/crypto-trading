import { NextFunction, Response, Request } from 'express'

export function asyncWrapper(fn: any) {
  return function (req: Request, res: Response, next: NextFunction): void {
    fn(req, res, next).catch((e: any) => {
      res.send({ status: 500, error: e.message || e })
    })
  }
}
