import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const jobs = await prisma.job.findMany();
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }
  }

  if (req.method === "POST") {
    const { title, company, location, description, category } = req.body;
    const slug = slugify(`${title} ${company} ${location}`, { lower: true, strict: true });

    try {
      const job = await prisma.job.create({
        data: { title, slug, company, location, description, category },
      });
      return res.status(201).json(job);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create job" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}