"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Candidate } from "@/types/candidates";

interface CandidateFiltersProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  candidates: Candidate[];
}

function uniqueSortedValues(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.trim().length > 0))).sort((a, b) =>
    a.localeCompare(b),
  );
}

export default function CandidateFilters({
  searchTerm,
  onSearchTermChange,
  candidates,
}: CandidateFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const statuses = useMemo(
    () => uniqueSortedValues(candidates.map((candidate) => candidate.status)),
    [candidates],
  );

  const stages = useMemo(
    () => uniqueSortedValues(candidates.map((candidate) => candidate.stage)),
    [candidates],
  );

  const selectedStatus = searchParams.get("status") ?? "";
  const selectedStage = searchParams.get("stage") ?? "";

  function updateQueryParam(key: "status" | "stage", value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <section className="panel filters-grid">
      <label>
        Buscar por nombre o correo
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Ej. Ana o ana@empresa.com"
        />
      </label>

      <label>
        Filtrar por estado
        <select value={selectedStatus} onChange={(event) => updateQueryParam("status", event.target.value)}>
          <option value="">Todos</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label>
        Filtrar por etapa
        <select value={selectedStage} onChange={(event) => updateQueryParam("stage", event.target.value)}>
          <option value="">Todas</option>
          {stages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
