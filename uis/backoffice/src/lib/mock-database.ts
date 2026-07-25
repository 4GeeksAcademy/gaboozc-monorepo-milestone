import { CandidateNoteApi, CandidateRecordApi } from "@/types/candidates";

interface StoredNote {
  id: string;
  content: string;
  createdAt: string;
}

interface StoredCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  linkedin: string;
  cvLink: string;
  yearsOfExperience: number;
  status: string;
  stage: string;
  applicationDate: string;
}

interface MockDatabase {
  candidates: StoredCandidate[];
  notesByCandidateId: Record<string, StoredNote[]>;
}

const GLOBAL_KEY = "__alphadevTalentMockDb__";

const seedCandidates: StoredCandidate[] = [
  {
    id: "cand-001",
    name: "Ana Martinez",
    email: "ana.martinez@alphadev.app",
    phone: "+52 55 1234 5678",
    position: "Frontend Engineer",
    linkedin: "https://linkedin.com/in/ana-martinez",
    cvLink: "https://example.com/cv/ana-martinez.pdf",
    yearsOfExperience: 5,
    status: "screening",
    stage: "review",
    applicationDate: "2026-07-18",
  },
  {
    id: "cand-002",
    name: "Carlos Perez",
    email: "carlos.perez@startupmail.com",
    phone: "+1 (305) 444-7788",
    position: "Automation Specialist",
    linkedin: "https://linkedin.com/in/carlos-perez-ops",
    cvLink: "https://example.com/cv/carlos-perez.pdf",
    yearsOfExperience: 7,
    status: "interview",
    stage: "technical",
    applicationDate: "2026-07-12",
  },
  {
    id: "cand-003",
    name: "Daniela Rojas",
    email: "daniela.rojas@uxlab.co",
    phone: "+58 414 888 9922",
    position: "Product Designer",
    linkedin: "https://linkedin.com/in/daniela-rojas-product",
    cvLink: "https://example.com/cv/daniela-rojas.pdf",
    yearsOfExperience: 4,
    status: "new",
    stage: "applied",
    applicationDate: "2026-07-21",
  },
];

const seedNotes: Record<string, StoredNote[]> = {
  "cand-001": [
    {
      id: "note-001",
      content: "Buen fit para producto B2B; revisar experiencia en dashboards complejos.",
      createdAt: "2026-07-19T10:00:00.000Z",
    },
  ],
  "cand-002": [
    {
      id: "note-002",
      content: "Completó reto técnico con foco en automatización de procesos internos.",
      createdAt: "2026-07-20T14:30:00.000Z",
    },
  ],
  "cand-003": [],
};

function cloneDatabase(): MockDatabase {
  return {
    candidates: seedCandidates.map((candidate) => ({ ...candidate })),
    notesByCandidateId: Object.fromEntries(
      Object.entries(seedNotes).map(([candidateId, notes]) => [
        candidateId,
        notes.map((note) => ({ ...note })),
      ]),
    ),
  };
}

function getDatabase(): MockDatabase {
  const globalState = globalThis as typeof globalThis & {
    [GLOBAL_KEY]?: MockDatabase;
  };

  if (!globalState[GLOBAL_KEY]) {
    globalState[GLOBAL_KEY] = cloneDatabase();
  }

  return globalState[GLOBAL_KEY];
}

export function listCandidates(): CandidateRecordApi[] {
  return getDatabase().candidates.map(toCandidateApi);
}

export function getCandidate(id: string): CandidateRecordApi | null {
  const candidate = getDatabase().candidates.find((item) => item.id === id);
  return candidate ? toCandidateApi(candidate) : null;
}

export function createCandidate(input: Partial<CandidateRecordApi>): CandidateRecordApi {
  const database = getDatabase();
  const id = `cand-${crypto.randomUUID().slice(0, 8)}`;
  const candidate = normalizeCandidate(input, id);

  database.candidates.unshift(candidate);
  database.notesByCandidateId[id] = [];

  return toCandidateApi(candidate);
}

export function updateCandidate(id: string, input: Partial<CandidateRecordApi>): CandidateRecordApi | null {
  const database = getDatabase();
  const index = database.candidates.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const current = database.candidates[index];
  const updated = normalizeCandidate(
    {
      ...toCandidateApi(current),
      ...input,
    },
    id,
  );

  database.candidates[index] = updated;
  return toCandidateApi(updated);
}

export function patchCandidate(id: string, input: Partial<CandidateRecordApi>): CandidateRecordApi | null {
  const database = getDatabase();
  const candidate = database.candidates.find((item) => item.id === id);

  if (!candidate) {
    return null;
  }

  if (typeof input.status === "string") {
    candidate.status = input.status;
  }

  if (typeof input.stage === "string") {
    candidate.stage = input.stage;
  }

  return toCandidateApi(candidate);
}

export function listNotes(candidateId: string): CandidateNoteApi[] | null {
  const database = getDatabase();
  const notes = database.notesByCandidateId[candidateId];

  if (!database.candidates.some((candidate) => candidate.id === candidateId)) {
    return null;
  }

  return notes.map(toNoteApi);
}

export function addNote(candidateId: string, content: string): CandidateNoteApi | null {
  const database = getDatabase();
  const notes = database.notesByCandidateId[candidateId];

  if (!database.candidates.some((candidate) => candidate.id === candidateId) || !notes) {
    return null;
  }

  const note: StoredNote = {
    id: `note-${crypto.randomUUID().slice(0, 8)}`,
    content,
    createdAt: new Date().toISOString(),
  };

  notes.unshift(note);
  return toNoteApi(note);
}

export function deleteNote(candidateId: string, noteId: string): boolean | null {
  const database = getDatabase();
  const notes = database.notesByCandidateId[candidateId];

  if (!database.candidates.some((candidate) => candidate.id === candidateId) || !notes) {
    return null;
  }

  const nextNotes = notes.filter((note) => note.id !== noteId);
  const wasDeleted = nextNotes.length !== notes.length;
  database.notesByCandidateId[candidateId] = nextNotes;

  return wasDeleted;
}

export function validateCandidatePayload(input: Partial<CandidateRecordApi>): string | null {
  const name = String(input.name ?? input.full_name ?? input.fullName ?? "").trim();
  const email = String(input.email ?? "").trim();
  const phone = String(input.phone ?? "").trim();
  const position = String(input.position ?? input.role ?? "").trim();
  const status = String(input.status ?? "").trim();
  const stage = String(input.stage ?? "").trim();
  const years = Number(input.years_of_experience ?? input.years_experience ?? 0);

  if (name.length < 3) return "Name must contain at least 3 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email is invalid.";
  if (!/^\+?[0-9()\-\s]{8,20}$/.test(phone)) return "Phone number is invalid.";
  if (position.length < 2) return "Position is required.";
  if (!status) return "Status is required.";
  if (!stage) return "Stage is required.";
  if (!Number.isFinite(years) || years < 0) return "Years of experience must be 0 or greater.";

  return null;
}

export function validateNotePayload(content: unknown): string | null {
  if (typeof content !== "string" || content.trim().length === 0) {
    return "Note content is required.";
  }

  return null;
}

function normalizeCandidate(input: Partial<CandidateRecordApi>, id: string): StoredCandidate {
  return {
    id,
    name: String(input.name ?? input.full_name ?? input.fullName ?? "").trim(),
    email: String(input.email ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    position: String(input.position ?? input.role ?? "").trim(),
    linkedin: String(input.linkedin ?? input.linkedin_url ?? "").trim(),
    cvLink: String(input.cv_link ?? input.cv ?? "").trim(),
    yearsOfExperience: Number(input.years_of_experience ?? input.years_experience ?? 0),
    status: String(input.status ?? "new").trim() || "new",
    stage: String(input.stage ?? "applied").trim() || "applied",
    applicationDate: String(input.application_date ?? input.applied_at ?? new Date().toISOString().slice(0, 10)),
  };
}

function toCandidateApi(candidate: StoredCandidate): CandidateRecordApi {
  return {
    id: candidate.id,
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    position: candidate.position,
    linkedin: candidate.linkedin,
    cv_link: candidate.cvLink,
    years_of_experience: candidate.yearsOfExperience,
    status: candidate.status,
    stage: candidate.stage,
    application_date: candidate.applicationDate,
  };
}

function toNoteApi(note: StoredNote): CandidateNoteApi {
  return {
    id: note.id,
    content: note.content,
    createdAt: note.createdAt,
  };
}
