import Link from "next/link";

import { Candidate } from "@/types/candidates";

interface CandidatesTableProps {
  candidates: Candidate[];
}

export default function CandidatesTable({ candidates }: CandidatesTableProps) {
  if (candidates.length === 0) {
    return (
      <section className="panel">
        <p>No hay candidatos que coincidan con los filtros actuales.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Posición</th>
            <th>Estado</th>
            <th>Etapa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>{candidate.position}</td>
              <td>{candidate.status}</td>
              <td>{candidate.stage}</td>
              <td>
                <Link href={`/candidates/${candidate.id}`}>Ver perfil</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
