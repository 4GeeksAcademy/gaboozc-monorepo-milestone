import { NextRequest, NextResponse } from "next/server";

import {
  getCandidate,
  patchCandidate,
  updateCandidate,
  validateCandidatePayload,
} from "@/lib/mock-database";
import { CandidateRecordApi } from "@/types/candidates";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const candidate = getCandidate(id);

  if (!candidate) {
    return NextResponse.json({ detail: "Candidate not found." }, { status: 404 });
  }

  return NextResponse.json(candidate);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as Partial<CandidateRecordApi>;
  const validationError = validateCandidatePayload(body);

  if (validationError) {
    return NextResponse.json({ detail: validationError }, { status: 400 });
  }

  const candidate = updateCandidate(id, body);

  if (!candidate) {
    return NextResponse.json({ detail: "Candidate not found." }, { status: 404 });
  }

  return NextResponse.json(candidate);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as Partial<CandidateRecordApi>;
  const candidate = patchCandidate(id, body);

  if (!candidate) {
    return NextResponse.json({ detail: "Candidate not found." }, { status: 404 });
  }

  return NextResponse.json(candidate);
}
