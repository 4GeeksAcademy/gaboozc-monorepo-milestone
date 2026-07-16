import {
  LeadApplication,
  binarySearch,
  buildSegmentReports,
  countInterestedServices,
  filterBy,
  filterByField,
  filterByRange,
  linearSearch,
  sortByField,
  validateLeadApplication
} from "./index";

const leads: LeadApplication[] = [
  {
    fullName: "Ana Torres",
    email: "ana@tiendaviva.mx",
    phone: "+52 55 1234 5678",
    role: "Founder",
    companyName: "Tienda Viva",
    businessNiche: "Ecommerce",
    marketSegment: "pyme_latam",
    teamSize: 12,
    services: ["template_website", "automation"],
    budget: 65000,
    timelineWeeks: 8,
    painPoints: "Perdemos ventas por seguimiento manual y poca analitica.",
    projectVision: "Automatizar ventas y operaciones para crecer en 90 dias con menos friccion.",
    terms: true
  },
  {
    fullName: "Carlos Mendez",
    email: "carlos@finpilot.io",
    phone: "+1 (786) 222-9898",
    role: "CTO",
    companyName: "FinPilot",
    businessNiche: "Fintech",
    marketSegment: "startup_usd",
    teamSize: 35,
    services: ["admin_dashboard", "alphadev_360"],
    budget: 42000,
    timelineWeeks: 10,
    painPoints: "No tenemos visibilidad centralizada de operaciones ni alertas.",
    projectVision: "Construir un stack unificado para decisiones rapidas y ejecucion confiable.",
    terms: true
  },
  {
    fullName: "Luisa Perez",
    email: "luisa@creceve.com",
    phone: "+58 412 888 1122",
    role: "Operations",
    companyName: "Crece VE",
    businessNiche: "Educacion",
    marketSegment: "venezuela",
    teamSize: 8,
    services: ["template_website"],
    budget: 9000,
    timelineWeeks: 6,
    painPoints: "Los procesos son lentos y hay errores por carga manual de datos.",
    projectVision: "Digitalizar flujo comercial y operativo para mejorar conversion y retencion.",
    terms: true
  }
];

const invalidLead: LeadApplication = {
  fullName: "A",
  email: "ana@gmail.com",
  phone: "123",
  role: "A",
  companyName: "X",
  businessNiche: "AI",
  marketSegment: "startup_usd",
  teamSize: 0,
  services: [],
  budget: 100,
  timelineWeeks: 1,
  painPoints: "Muy corto",
  projectVision: "Muy corto tambien",
  terms: false
};

function runDemo(): void {
  console.log("=== DEMO ALPHADEV MILESTONE 2 ===\n");

  const startupLeads = filterByField(leads, "marketSegment", "startup_usd");
  console.log("1) Leads startup_usd:", startupLeads.map((lead) => lead.companyName));

  const midsizeTeams = filterByRange(leads, (lead) => lead.teamSize, 10, 40);
  console.log("2) Team size entre 10 y 40:", midsizeTeams.map((lead) => lead.companyName));

  const automationInterested = filterBy(leads, (lead) => lead.services.includes("automation"));
  console.log("3) Interesados en automation:", automationInterested.map((lead) => lead.companyName));

  const byBudgetAsc = sortByField(leads, "budget", "asc");
  console.log("4) Orden por budget asc:", byBudgetAsc.map((lead) => `${lead.companyName}:${lead.budget}`));

  const linearTarget = leads[2];
  const linearIndex = linearSearch(leads, linearTarget, (a, b) => a.email === b.email);
  console.log("5) Linear search por email (unsorted):", linearIndex);

  const sortedByEmail = [...leads].sort((a, b) => a.email.localeCompare(b.email));
  const binaryTarget = sortedByEmail[1];
  const binaryIndex = binarySearch(
    sortedByEmail,
    binaryTarget,
    (item, target) => item.email.localeCompare(target.email)
  );
  console.log("6) Binary search por email (sorted):", binaryIndex);

  const segmentReport = buildSegmentReports(leads);
  console.log("7) Reporte por segmento:", segmentReport);

  const serviceCounts = countInterestedServices(leads);
  console.log("8) Conteo de servicios:", serviceCounts);

  const validResult = validateLeadApplication(leads[0]);
  const invalidResult = validateLeadApplication(invalidLead);
  console.log("9) Validacion lead valido:", validResult);
  console.log("10) Validacion lead invalido:", invalidResult);
}

runDemo();
