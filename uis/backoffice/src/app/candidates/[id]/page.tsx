"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

import CandidateForm from "@/components/CandidateForm";
import {
  addCandidateNote,
  deleteCandidateNote,
  getCandidateById,
  getCandidateNotes,
  patchCandidateStage,
  patchCandidateStatus,
  updateCandidate,
} from "@/services/candidates";
import { Candidate, CandidateNote } from "@/types/candidates";

export default function CandidateDetailPage() {
  const params = useParams<{ id: string }>();
  const candidateId = params.id;

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [notes, setNotes] = useState<CandidateNote[]>([]);

  const [isLoadingCandidate, setIsLoadingCandidate] = useState(true);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);

  const [candidateError, setCandidateError] = useState("");
  const [notesError, setNotesError] = useState("");

  const [patchStatusFeedback, setPatchStatusFeedback] = useState("");
  const [patchStageFeedback, setPatchStageFeedback] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingStage, setIsUpdatingStage] = useState(false);

  const [newNote, setNewNote] = useState("");
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [noteFeedback, setNoteFeedback] = useState("");

  const loadCandidate = useCallback(async (showLoading = false) => {
    if (showLoading) {
      setIsLoadingCandidate(true);
    }

    setCandidateError("");

    try {
      const result = await getCandidateById(candidateId);
      setCandidate(result);
    } catch (error) {
      setCandidateError(error instanceof Error ? error.message : "No se pudo cargar el candidato.");
    } finally {
      setIsLoadingCandidate(false);
    }
  }, [candidateId]);

  const loadNotes = useCallback(async (showLoading = false) => {
    if (showLoading) {
      setIsLoadingNotes(true);
    }

    setNotesError("");

    try {
      const result = await getCandidateNotes(candidateId);
      setNotes(result);
    } catch (error) {
      setNotesError(error instanceof Error ? error.message : "No se pudieron cargar las notas.");
    } finally {
      setIsLoadingNotes(false);
    }
  }, [candidateId]);

  useEffect(() => {
    const loadOnMount = async () => {
      await Promise.all([loadCandidate(false), loadNotes(false)]);
    };

    void loadOnMount();
  }, [loadCandidate, loadNotes]);

  async function handleStatusUpdate(status: string) {
    setPatchStatusFeedback("");
    setIsUpdatingStatus(true);

    try {
      const updated = await patchCandidateStatus(candidateId, status);
      setCandidate(updated);
      setPatchStatusFeedback("Estado actualizado correctamente.");
    } catch (error) {
      setPatchStatusFeedback(error instanceof Error ? error.message : "No se pudo actualizar el estado.");
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  async function handleStageUpdate(stage: string) {
    setPatchStageFeedback("");
    setIsUpdatingStage(true);

    try {
      const updated = await patchCandidateStage(candidateId, stage);
      setCandidate(updated);
      setPatchStageFeedback("Etapa actualizada correctamente.");
    } catch (error) {
      setPatchStageFeedback(error instanceof Error ? error.message : "No se pudo actualizar la etapa.");
    } finally {
      setIsUpdatingStage(false);
    }
  }

  async function handleAddNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = newNote.trim();
    if (!content) {
      setNoteFeedback("La nota no puede estar vacía.");
      return;
    }

    setIsCreatingNote(true);
    setNoteFeedback("");

    try {
      const created = await addCandidateNote(candidateId, content);
      setNotes((prev) => [created, ...prev]);
      setNewNote("");
      setNoteFeedback("Nota agregada correctamente.");
    } catch (error) {
      setNoteFeedback(error instanceof Error ? error.message : "No se pudo crear la nota.");
    } finally {
      setIsCreatingNote(false);
    }
  }

  async function handleDeleteNote(noteId: string) {
    setNoteFeedback("");

    try {
      await deleteCandidateNote(candidateId, noteId);
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
      setNoteFeedback("Nota eliminada correctamente.");
    } catch (error) {
      setNoteFeedback(error instanceof Error ? error.message : "No se pudo eliminar la nota.");
    }
  }

  return (
    <main className="app-shell">
      <header className="hero hero-compact">
        <h1>Perfil de candidato</h1>
        <p>Seguimiento detallado de talento para operaciones internas de AlphaDev.</p>
        <Link href="/">Volver al pipeline</Link>
      </header>

      {isLoadingCandidate && (
        <section className="panel">
          <p>Cargando perfil del candidato...</p>
        </section>
      )}

      {!isLoadingCandidate && candidateError && (
        <section className="panel">
          <p className="feedback-error">Error: {candidateError}</p>
          <button onClick={() => void loadCandidate(true)}>Reintentar</button>
        </section>
      )}

      {!isLoadingCandidate && !candidateError && candidate && (
        <>
          <section className="panel detail-grid">
            <h2>{candidate.name}</h2>
            <p>
              <strong>Correo:</strong> {candidate.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {candidate.phone}
            </p>
            <p>
              <strong>Posición:</strong> {candidate.position}
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              {candidate.linkedin ? (
                <a href={candidate.linkedin} target="_blank" rel="noreferrer">
                  Ver perfil
                </a>
              ) : (
                "No disponible"
              )}
            </p>
            <p>
              <strong>CV:</strong>{" "}
              {candidate.cvLink ? (
                <a href={candidate.cvLink} target="_blank" rel="noreferrer">
                  Ver CV
                </a>
              ) : (
                "No disponible"
              )}
            </p>
            <p>
              <strong>Años de experiencia:</strong> {candidate.yearsOfExperience}
            </p>
            <p>
              <strong>Estado actual:</strong> {candidate.status}
            </p>
            <p>
              <strong>Etapa actual:</strong> {candidate.stage}
            </p>
            <p>
              <strong>Fecha de aplicación:</strong> {candidate.applicationDate || "No disponible"}
            </p>
          </section>

          <section className="panel controls-grid">
            <div>
              <h3>Actualizar estado</h3>
              <select
                defaultValue={candidate.status}
                onChange={(event) => void handleStatusUpdate(event.target.value)}
                disabled={isUpdatingStatus}
              >
                <option value={candidate.status}>{candidate.status}</option>
                <option value="new">new</option>
                <option value="screening">screening</option>
                <option value="interview">interview</option>
                <option value="offer">offer</option>
                <option value="hired">hired</option>
                <option value="rejected">rejected</option>
              </select>
              {patchStatusFeedback && <p>{patchStatusFeedback}</p>}
            </div>

            <div>
              <h3>Actualizar etapa</h3>
              <select
                defaultValue={candidate.stage}
                onChange={(event) => void handleStageUpdate(event.target.value)}
                disabled={isUpdatingStage}
              >
                <option value={candidate.stage}>{candidate.stage}</option>
                <option value="applied">applied</option>
                <option value="review">review</option>
                <option value="technical">technical</option>
                <option value="final">final</option>
                <option value="decision">decision</option>
              </select>
              {patchStageFeedback && <p>{patchStageFeedback}</p>}
            </div>
          </section>

          <CandidateForm
            title="Editar datos del candidato"
            submitLabel="Guardar cambios"
            candidate={candidate}
            onSubmit={async (values) => {
              const updated = await updateCandidate(candidateId, values);
              setCandidate(updated);
            }}
          />

          <section className="panel">
            <h2>Notas del proceso</h2>

            <form className="inline-form" onSubmit={handleAddNote}>
              <input
                type="text"
                value={newNote}
                onChange={(event) => setNewNote(event.target.value)}
                placeholder="Agregar una nota de seguimiento"
              />
              <button type="submit" disabled={isCreatingNote}>
                {isCreatingNote ? "Guardando..." : "Agregar nota"}
              </button>
            </form>

            {noteFeedback && <p>{noteFeedback}</p>}

            {isLoadingNotes && <p>Cargando notas...</p>}
            {!isLoadingNotes && notesError && <p className="feedback-error">Error: {notesError}</p>}

            {!isLoadingNotes && !notesError && notes.length === 0 && (
              <p>No hay notas registradas para este candidato.</p>
            )}

            {!isLoadingNotes && !notesError && notes.length > 0 && (
              <ul className="notes-list">
                {notes.map((note) => (
                  <li key={note.id}>
                    <div>
                      <p>{note.content}</p>
                      <small>{note.createdAt || "Sin fecha"}</small>
                    </div>
                    <button onClick={() => void handleDeleteNote(note.id)}>Eliminar</button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}
