import { NextRequest, NextResponse } from "next/server";

import { deleteNote } from "@/lib/mock-database";

interface RouteContext {
  params: Promise<{ id: string; noteId: string }>;
}

export async function DELETE(_: NextRequest, context: RouteContext) {
  const { id, noteId } = await context.params;
  const wasDeleted = deleteNote(id, noteId);

  if (wasDeleted === null) {
    return NextResponse.json({ detail: "Candidate not found." }, { status: 404 });
  }

  if (!wasDeleted) {
    return NextResponse.json({ detail: "Note not found." }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
