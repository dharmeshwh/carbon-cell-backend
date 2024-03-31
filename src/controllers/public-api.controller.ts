import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import axios from "axios";

export class PublicApiController {
  async getPubliApiData(request: Request, response: Response) {
    try {
      const { category } = request.query;

      const apiUrl = `https://api.publicapis.org/entries?category=${
        category ?? ""
      }`;

      const { data } = await axios.get(apiUrl);

      return response.json({ status: true, data });
    } catch (error: any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }
}
