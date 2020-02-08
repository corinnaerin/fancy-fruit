import { Request, Response } from 'express';

export default class Healthcheck {
  public static get(req: Request, res: Response): void {
    res.status(200)
        .json({ success: true });
  }
}
