// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  mapboxAccessToken: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: any }>
) {
  try {
    // get mabpox key from env
    const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
    if (!mapboxAccessToken) {
      throw new Error("MAPBOX_ACCESS_TOKEN not found");
    }
    // return mapbox key
    res.status(200).json({ mapboxAccessToken });
  } catch (error) {
    res.status(500).json({ error });
  }
}
