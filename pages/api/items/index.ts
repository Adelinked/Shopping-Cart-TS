import { NextApiRequest, NextApiResponse } from "next";
import { data } from "../../../data";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(data)) {
      throw new Error("Cannot find user data");
    }

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
