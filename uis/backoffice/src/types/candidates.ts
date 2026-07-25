export type CandidateStatus =
  | "new"
  | "screening"
  | "interview"
  | "offer"
  | "hired"
  | "rejected"
  | string;

export type CandidateStage =
  | "applied"
  | "review"
  | "technical"
  | "final"
  | "decision"
  | string;

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  linkedin: string;
  cvLink: string;
  yearsOfExperience: number;
  status: CandidateStatus;
  stage: CandidateStage;
  applicationDate: string;
}

export interface CandidateNote {
  id: string;
  content: string;
  createdAt: string;
}

export interface CandidateFormValues {
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

export interface CandidateRecordApi {
  id?: string | number;
  name?: string;
  full_name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  position?: string;
  role?: string;
  linkedin?: string;
  linkedin_url?: string;
  cv_link?: string;
  cv?: string;
  years_of_experience?: number | string;
  years_experience?: number | string;
  status?: string;
  stage?: string;
  application_date?: string;
  applied_at?: string;
}

export interface CandidateNoteApi {
  id?: string | number;
  note?: string;
  content?: string;
  text?: string;
  created_at?: string;
  createdAt?: string;
}
