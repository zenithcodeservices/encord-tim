// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  throw new Error('API_URL environment variable not set');
}

type Bbox = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

type Prediction = {
  bbox: Bbox;
  label: string;
  score: string;
}

type Predictions = {
  description: string;
  predictions: Prediction[];
}


export default async function predictHandler(
  req: NextApiRequest,
  res: NextApiResponse<Predictions>
) {
  try {
    const predictRes = await fetch(`${apiUrl}/predict`);
    console.log("predictRes", predictRes)
    if (!predictRes.ok) {
      throw new Error(`Error! status: ${predictRes.status}`);
    }
    const data = await predictRes.json();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }

}
