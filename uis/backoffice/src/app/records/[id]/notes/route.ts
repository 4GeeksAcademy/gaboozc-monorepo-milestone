import { NextRequest, NextResponse } from "next/server";

import { addNote, listNotes, validateNotePayload } from "@/lib/mock-database";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const notes = listNotes(id);

  if (!notes) {
    return NextResponse.json({ detail: "Candidate not found." }, { status: 404 });
  }

  return NextResponse.json(notes);
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as { content?: unknown };
  const validationError = validateNotePayload(body.content);

  if (validationError) {
    return NextResponse.json({ detail: validationError }, { status: 400 });
  }

  const note = addNote(id, String(body.content).trim());

  if (!note) {
    return NextResponse.json({ detail: "Candidate not found." }, { status: 404 });
  }

  return NextResponse.json(note, { status: 201 });
}
