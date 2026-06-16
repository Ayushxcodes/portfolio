import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const getDataPath = () => {
  return path.join(process.cwd(), "src/data/portfolio-data.json");
};

export async function GET() {
  try {
    const dataPath = getDataPath();
    const fileContent = await fs.readFile(dataPath, "utf8");
    const data = JSON.parse(fileContent);
    return Response.json(data);
  } catch (error) {
    console.error("Failed to read portfolio data:", error);
    return Response.json(
      { error: "Failed to read portfolio data from disk" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const dataPath = getDataPath();

    // Simple validation to ensure it has correct structure
    if (!data.landing || !data.aboutPage || !data.experiencePage || !data.projectPage || !data.contactPage) {
      return Response.json(
        { error: "Invalid data structure: missing main sections" },
        { status: 400 }
      );
    }

    // Write back to the local JSON file
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");

    return Response.json({ success: true, message: "Portfolio data saved successfully" });
  } catch (error) {
    console.error("Failed to save portfolio data:", error);
    return Response.json(
      { error: "Failed to save portfolio data to disk" },
      { status: 500 }
    );
  }
}
