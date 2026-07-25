import {
  Candidate,
  CandidateFormValues,
  CandidateNote,
  CandidateNoteApi,
  CandidateRecordApi,
} from "@/types/candidates";

import { apiRequest } from "@/services/api";

function toNumber(value: number | string | undefined): number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function toCandidate(record: CandidateRecordApi): Candidate {
  return {
    id: String(record.id ?? ""),
    name: record.name ?? record.full_name ?? record.fullName ?? "",
    email: record.email ?? "",
    phone: record.phone ?? "",
    position: record.position ?? record.role ?? "",
    linkedin: record.linkedin ?? record.linkedin_url ?? "",
    cvLink: record.cv_link ?? record.cv ?? "",
    yearsOfExperience: toNumber(record.years_of_experience ?? record.years_experience),
    status: record.status ?? "new",
    stage: record.stage ?? "applied",
    applicationDate: record.application_date ?? record.applied_at ?? "",
  };
}

function toNote(note: CandidateNoteApi): CandidateNote {
  return {
    id: String(note.id ?? ""),
    content: note.content ?? note.note ?? note.text ?? "",
    createdAt: note.created_at ?? note.createdAt ?? "",
  };
}

function toCandidatePayload(values: CandidateFormValues): Record<string, unknown> {
  return {
    name: values.name,
    email: values.email,
    phone: values.phone,
    position: values.position,
    linkedin: values.linkedin,
    cv_link: values.cvLink,
    years_of_experience: values.yearsOfExperience,
    years_experience: values.yearsOfExperience,
    status: values.status,
    stage: values.stage,
    application_date: values.applicationDate,
  };
}

export async function getCandidates(): Promise<Candidate[]> {
  const records = await apiRequest<CandidateRecordApi[]>("/records");
  return records.map(toCandidate);
}

export async function getCandidateById(id: string): Promise<Candidate> {
  const record = await apiRequest<CandidateRecordApi>(`/records/${id}`);
  return toCandidate(record);
}

export async function createCandidate(values: CandidateFormValues): Promise<Candidate> {
  const record = await apiRequest<CandidateRecordApi>("/records", {
    method: "POST",
    body: JSON.stringify(toCandidatePayload(values)),
  });

  return toCandidate(record);
}

export async function updateCandidate(id: string, values: CandidateFormValues): Promise<Candidate> {
  const record = await apiRequest<CandidateRecordApi>(`/records/${id}`, {
    method: "PUT",
    body: JSON.stringify(toCandidatePayload(values)),
  });

  return toCandidate(record);
}

export async function patchCandidateStatus(id: string, status: string): Promise<Candidate> {
  const record = await apiRequest<CandidateRecordApi>(`/records/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  return toCandidate(record);
}

export async function patchCandidateStage(id: string, stage: string): Promise<Candidate> {
  const record = await apiRequest<CandidateRecordApi>(`/records/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ stage }),
  });

  return toCandidate(record);
}

export async function getCandidateNotes(id: string): Promise<CandidateNote[]> {
  const notes = await apiRequest<CandidateNoteApi[]>(`/records/${id}/notes`);
  return notes.map(toNote);
}

export async function addCandidateNote(id: string, content: string): Promise<CandidateNote> {
  const note = await apiRequest<CandidateNoteApi>(`/records/${id}/notes`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });

  return toNote(note);
}

export async function deleteCandidateNote(id: string, noteId: string): Promise<void> {
  await apiRequest<void>(`/records/${id}/notes/${noteId}`, {
    method: "DELETE",
  });
}

export function emptyCandidateFormValues(): CandidateFormValues {
  return {
    name: "",
    email: "",
    phone: "",
    position: "",
    linkedin: "",
    cvLink: "",
    yearsOfExperience: 0,
    status: "new",
    stage: "applied",
    applicationDate: new Date().toISOString().slice(0, 10),
  };
}
