"use client";

import { FormEvent, useMemo, useState } from "react";

import { Candidate, CandidateFormValues } from "@/types/candidates";
import { emptyCandidateFormValues } from "@/services/candidates";

interface CandidateFormProps {
  title: string;
  submitLabel: string;
  initialValues?: CandidateFormValues;
  candidate?: Candidate;
  onSubmit: (values: CandidateFormValues) => Promise<void>;
}

function toInitialValues(candidate?: Candidate, initialValues?: CandidateFormValues): CandidateFormValues {
  if (initialValues) {
    return initialValues;
  }

  if (candidate) {
    return {
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.position,
      linkedin: candidate.linkedin,
      cvLink: candidate.cvLink,
      yearsOfExperience: candidate.yearsOfExperience,
      status: candidate.status,
      stage: candidate.stage,
      applicationDate: candidate.applicationDate?.slice(0, 10) ?? "",
    };
  }

  return emptyCandidateFormValues();
}

function isValidUrl(value: string): boolean {
  if (!value.trim()) {
    return true;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateForm(values: CandidateFormValues): string {
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const position = values.position.trim();
  const status = values.status.trim();
  const stage = values.stage.trim();

  if (!name) return "El nombre es obligatorio.";
  if (name.length < 3) return "El nombre debe tener al menos 3 caracteres.";

  if (!email) return "El correo es obligatorio.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Ingresa un correo válido.";

  if (!phone) return "El teléfono es obligatorio.";
  if (!/^\+?[0-9()\-\s]{8,20}$/.test(phone)) {
    return "El teléfono debe tener entre 8 y 20 caracteres válidos.";
  }

  if (!position) return "La posición es obligatoria.";
  if (!status) return "El estado es obligatorio.";
  if (!stage) return "La etapa es obligatoria.";

  if (!Number.isInteger(values.yearsOfExperience) || values.yearsOfExperience < 0) {
    return "Los años de experiencia deben ser un entero mayor o igual a 0.";
  }

  if (!isValidUrl(values.linkedin)) return "El enlace de LinkedIn no es válido.";
  if (!isValidUrl(values.cvLink)) return "El enlace del CV no es válido.";

  return "";
}

export default function CandidateForm({
  title,
  submitLabel,
  initialValues,
  candidate,
  onSubmit,
}: CandidateFormProps) {
  const [values, setValues] = useState<CandidateFormValues>(() =>
    toInitialValues(candidate, initialValues),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const validationError = useMemo(() => validateForm(values), [values]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (validationError) {
      setFeedback({ type: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      await onSubmit(values);
      setFeedback({ type: "success", message: "Datos guardados correctamente." });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "No se pudo guardar la información.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="panel">
      <h2>{title}</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Nombre completo
          <input
            type="text"
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
        </label>

        <label>
          Correo
          <input
            type="email"
            value={values.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
        </label>

        <label>
          Teléfono
          <input
            type="tel"
            value={values.phone}
            onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
            required
          />
        </label>

        <label>
          Posición aplicada
          <input
            type="text"
            value={values.position}
            onChange={(event) => setValues((prev) => ({ ...prev, position: event.target.value }))}
            required
          />
        </label>

        <label>
          LinkedIn
          <input
            type="url"
            value={values.linkedin}
            onChange={(event) => setValues((prev) => ({ ...prev, linkedin: event.target.value }))}
            placeholder="https://linkedin.com/in/..."
          />
        </label>

        <label>
          Enlace CV
          <input
            type="url"
            value={values.cvLink}
            onChange={(event) => setValues((prev) => ({ ...prev, cvLink: event.target.value }))}
            placeholder="https://..."
          />
        </label>

        <label>
          Años de experiencia
          <input
            type="number"
            min={0}
            value={values.yearsOfExperience}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, yearsOfExperience: Number(event.target.value) || 0 }))
            }
          />
        </label>

        <label>
          Estado actual
          <input
            type="text"
            value={values.status}
            onChange={(event) => setValues((prev) => ({ ...prev, status: event.target.value }))}
            required
          />
        </label>

        <label>
          Etapa actual
          <input
            type="text"
            value={values.stage}
            onChange={(event) => setValues((prev) => ({ ...prev, stage: event.target.value }))}
            required
          />
        </label>

        <label>
          Fecha de aplicación
          <input
            type="date"
            value={values.applicationDate?.slice(0, 10)}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, applicationDate: event.target.value }))
            }
          />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : submitLabel}
          </button>
        </div>
      </form>

      {feedback && (
        <p className={feedback.type === "success" ? "feedback-ok" : "feedback-error"}>{feedback.message}</p>
      )}
    </section>
  );
}
