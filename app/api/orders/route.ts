import { NextResponse } from "next/server";
import { appendFile, mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.customer?.phone || !body?.customer?.name || !Array.isArray(body?.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Commande invalide." }, { status: 400 });
    }

    const line = JSON.stringify({
      createdAt: new Date().toISOString(),
      ...body
    }) + "\n";

    const filePath = join(process.cwd(), "data", "orders.ndjson");
    await mkdir(dirname(filePath), { recursive: true });

    try {
      await appendFile(filePath, line, "utf8");
    } catch {
      await writeFile(filePath, line, "utf8");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Impossible d'enregistrer la commande." }, { status: 500 });
  }
}
