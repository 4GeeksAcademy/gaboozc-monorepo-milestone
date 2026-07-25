"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import CandidateFilters from "@/components/CandidateFilters";
import CandidateForm from "@/components/CandidateForm";
import CandidatesTable from "@/components/CandidatesTable";
import { createCandidate, getCandidates } from "@/services/candidates";
import { Candidate } from "@/types/candidates";

export default function HomePageClient() {
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCandidates = useCallback(async (showLoading = false) => {
    if (showLoading) {
      setIsLoading(true);
    }

    setError("");

    try {
      const records = await getCandidates();
      setCandidates(records);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "No se pudieron cargar los candidatos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadOnMount = async () => {
      await loadCandidates(false);
    };

    void loadOnMount();
  }, [loadCandidates]);

  const filteredCandidates = useMemo(() => {
    const selectedStatus = (searchParams.get("status") ?? "").toLowerCase();
    const selectedStage = (searchParams.get("stage") ?? "").toLowerCase();
    const query = searchTerm.trim().toLowerCase();

    return candidates.filter((candidate) => {
      const matchStatus = selectedStatus ? candidate.status.toLowerCase() === selectedStatus : true;
      const matchStage = selectedStage ? candidate.stage.toLowerCase() === selectedStage : true;
      const matchQuery = query
        ? candidate.name.toLowerCase().includes(query) || candidate.email.toLowerCase().includes(query)
        : true;

      return matchStatus && matchStage && matchQuery;
    });
  }, [candidates, searchParams, searchTerm]);

  return (
    <main className="app-shell">
      <header className="hero">
        <h1>AlphaDev Talent Pipeline Tracker</h1>
        <p>Control interno de reclutamiento para el equipo People & Talent Operations.</p>
      </header>

      <CandidateForm
        title="Registrar nuevo candidato"
        submitLabel="Registrar candidato"
        onSubmit={async (values) => {
          const newCandidate = await createCandidate(values);
          setCandidates((prev) => [newCandidate, ...prev]);
        }}
      />

      <CandidateFilters
        candidates={candidates}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />

      {isLoading && (
        <section className="panel">
          <p>Cargando candidatos...</p>
        </section>
      )}

      {!isLoading && error && (
        <section className="panel">
          <p className="feedback-error">Error: {error}</p>
          <button onClick={() => void loadCandidates(true)}>Reintentar</button>
        </section>
      )}

      {!isLoading && !error && <CandidatesTable candidates={filteredCandidates} />}
    </main>
  );
}
