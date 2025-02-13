import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { city } = req.query;
    try {
      const jobs = await prisma.job.findMany({
        where: city && city !== "All Cities" ? { city: String(city) } : {},
      });
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }
  }

  if (req.method === "POST") {
    const { title, company, location, city, description, category } = req.body;
    try {
      const job = await prisma.job.create({
        data: { title, company, location, city, description, category },
      });
      return res.status(201).json(job);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create job" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}