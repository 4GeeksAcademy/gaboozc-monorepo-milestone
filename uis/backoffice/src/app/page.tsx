import { Suspense } from "react";

import HomePageClient from "@/components/HomePageClient";

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="app-shell">
          <section className="panel">
            <p>Cargando vista del pipeline...</p>
          </section>
        </main>
      }
    >
      <HomePageClient />
    </Suspense>
  );
}
