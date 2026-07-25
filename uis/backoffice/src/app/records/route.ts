import { NextRequest, NextResponse } from "next/server";

import {
  createCandidate,
  listCandidates,
  validateCandidatePayload,
} from "@/lib/mock-database";
import { CandidateRecordApi } from "@/types/candidates";

export async function GET() {
  return NextResponse.json(listCandidates());
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<CandidateRecordApi>;
  const validationError = validateCandidatePayload(body);

  if (validationError) {
    return NextResponse.json({ detail: validationError }, { status: 400 });
  }

  return NextResponse.json(createCandidate(body), { status: 201 });
}
