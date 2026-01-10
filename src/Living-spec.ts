// @ts-ignore
import express, { Request, Response } from "express";
import { runTurboStackValidationAndGetResults } from "./turboCore"; // you’d extract logic


interface TurboStackValidationResults {
  passedCount: number;
  failedCount: number;
  results: any; // Replace 'any' with a more specific type if known
}

const app = express();

app.get("/health/turbo", (_req: Request, res: Response) => {
  const { passedCount, failedCount, results }: TurboStackValidationResults = runTurboStackValidationAndGetResults();
  const status: number = failedCount === 0 ? 200 : 500;
  res.status(status).json({ passedCount, failedCount, results });
});

app.listen(3000, () => {
  console.log("Turbo health listening on :3000");
});
