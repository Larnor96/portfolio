import { useEffect, useMemo, useState } from "react";
import "./App.css";
import heroHeaderImage from "./assets/portfolioHeader.png";
import { Button, Card, CardBody, Chip, Link } from "@heroui/react";

const courses = [
  {
    id: "grunnleggende-programmering-1",
    title: "Grunnleggende programmering 1",
    tag: "Programming",
    semester: "Tidlig studiegrunnlag",
    summary:
      "Grunnleggende innføring i programmering med fokus på variabler, kontrollstrukturer, funksjoner og logisk problemlosning.",
    focus: [
      "Grunnleggende logikk og algoritmisk tenkning",
      "Strukturering av kode steg for steg",
      "Forstaelse for hvordan programmer kjores",
    ],
  },
  {
    id: "database-1",
    title: "Database 1",
    tag: "Data",
    semester: "Kjernesystemer",
    summary:
      "Introduksjon til relasjonsdatabaser, datamodellering og SQL for lagring, strukturering og uthenting av data.",
    focus: [
      "Relasjonsmodellering",
      "Grunnleggende SQL",
      "Tabeller, nokler og koblinger",
    ],
  },
  {
    id: "webutvikling-og-hci",
    title: "Webutvikling og HCI",
    tag: "Web",
    semester: "Interaksjon og UX",
    summary:
      "Kombinerte webutvikling med prinsipper fra human-computer interaction for a bygge brukervennlige digitale losninger.",
    focus: [
      "HTML, CSS og interaksjonsmonstre",
      "Brukervennlighet og tilgjengelighet",
      "Brukersentrert design",
    ],
  },
  {
    id: "digital-forretningsforstaelse",
    title: "Digital forretningsforstaelse",
    tag: "Business",
    semester: "Forretningskontekst",
    summary:
      "Handlet om hvordan teknologi skaper verdi, hvordan virksomheter bruker digitale losninger, og hvordan IT henger sammen med strategi.",
    focus: [
      "Digitale forretningsmodeller",
      "Verdiskaping med teknologi",
      "Strategisk forstaelse av IT",
    ],
  },
  {
    id: "praktisk-prosjektarbeid",
    title: "Praktisk prosjektarbeid",
    tag: "Project",
    semester: "Samarbeid",
    summary:
      "Arbeid i mer realistiske prosjektformer med planlegging, samarbeid, leveranser og iterativ gjennomforing.",
    focus: [
      "Teamsamarbeid",
      "Planlegging og leveransestruktur",
      "Fra krav til resultat",
    ],
  },
  {
    id: "systemutvikling",
    title: "Systemutvikling",
    tag: "Systems",
    semester: "Analyse og design",
    summary:
      "Dekket hvordan systemer planlegges, spesifiseres, designes og utvikles gjennom strukturerte utviklingsprosesser.",
    focus: [
      "Krav og modellering",
      "Utviklingslivslop",
      "Systemarkitektur",
    ],
  },
  {
    id: "grunnleggende-programmering-2",
    title: "Grunnleggende programmering 2",
    tag: "Programming",
    semester: "Videre coding",
    summary:
      "Videreutvikling av programmeringsgrunnlaget med mer avansert logikk, storre oppgaver og sterkere kodestruktur.",
    focus: [
      "Oppdeling av problemer",
      "Bedre programstruktur",
      "Feilsoking og iterasjon",
    ],
  },
  {
    id: "organisering-og-ledelse",
    title: "Organisering og ledelse",
    tag: "Leadership",
    semester: "Organisasjonsperspektiv",
    summary:
      "Utforsket hvordan team og organisasjoner er bygget opp, ledes og koordineres i arbeidslivet.",
    focus: [
      "Ledelse og roller",
      "Organisasjonsstruktur",
      "Gruppedynamikk",
    ],
  },
  {
    id: "applikasjonsutvikling-for-web",
    title: "Applikasjonsutvikling for web",
    tag: "Web app",
    semester: "Applikasjonsbygging",
    summary:
      "Arbeid med utvikling av komplette webapplikasjoner med fokus pa front-end, struktur og brukerinteraksjon.",
    focus: [
      "Dynamiske webapplikasjoner",
      "Side- og komponentstruktur",
      "Front-end implementasjon",
    ],
  },
  {
    id: "database-2",
    title: "Database 2",
    tag: "Data",
    semester: "Videre datagrunnlag",
    summary:
      "Utvidet databasekunnskap med mer avansert SQL, normalisering, ytelse og videre datamodellering.",
    focus: [
      "Avansert sporring",
      "Forbedret datamodellering",
      "Ytelsesbevisst databasearbeid",
    ],
  },
  {
    id: "objektorientert-programmering-1",
    title: "Objektorientert programmering 1",
    tag: "OOP",
    semester: "OOP-grunnlag",
    summary:
      "Introduksjon til klasser, objekter, innkapsling, arv og hvordan objektorientert design gir bedre struktur i kode.",
    focus: [
      "Klasser og objekter",
      "Innkapsling",
      "Grunnlag for objektorientert design",
    ],
  },
  {
    id: "etikk-og-samfunnsansvar",
    title: "Etikk og samfunnsansvar",
    tag: "Ethics",
    semester: "Profesjonelt ansvar",
    summary:
      "Handlet om etisk ansvar i teknologi, blant annet personvern, rettferdighet, baerekraft og samfunnskonsekvenser av systemer.",
    focus: [
      "Ansvarlig teknologibruk",
      "Etisk refleksjon",
      "Samfunnspavirkning fra IT",
    ],
  },
  {
    id: "objektorientert-programmering-2",
    title: "Objektorientert programmering 2",
    tag: "OOP",
    semester: "Videre programstruktur",
    summary:
      "Bygget videre pa objektorientert programmering med sterkere abstraksjon, design og storre kodebaser.",
    focus: [
      "Abstraksjon og design",
      "Storre kodebaser",
      "Gjenbrukbar struktur",
    ],
  },
  {
    id: "samfunnsvitenskapelig-metode",
    title: "Samfunnsvitenskapelig metode",
    tag: "Method",
    semester: "Metodeforstaelse",
    summary:
      "Fokuserte pa forskningsmetoder, datainnsamling, kildekvalitet og systematisk analyse.",
    focus: [
      "Kvalitative og kvantitative metoder",
      "Akademisk struktur",
      "Kritisk kildebruk",
    ],
  },
  {
    id: "informasjonssikkerhet",
    title: "Informasjonssikkerhet",
    tag: "Security",
    semester: "Risiko og beskyttelse",
    summary:
      "Dekket sentrale sikkerhetsprinsipper som konfidensialitet, integritet, tilgjengelighet og sikker systemtenkning.",
    focus: [
      "Sikkerhetsprinsipper",
      "Trusler og risiko",
      "Sikker handtering av informasjon",
    ],
  },
  {
    id: "selvstudie-it-og-informasjonssystemer",
    title: "Selvstudie IT og informasjonssystemer",
    tag: "Self-study",
    semester: "Selvstendig arbeid",
    summary:
      "Trente evnen til a jobbe selvstendig med IT- og informasjonssystemtemaer, tilegne seg nytt stoff og dokumentere laering.",
    focus: [
      "Selvstendig laering",
      "Systemforstaelse",
      "Egen progresjon",
    ],
  },
  {
    id: "business-intelligence-og-datavarehus",
    title: "Business Intelligence og datavarehus",
    tag: "BI",
    semester: "Analysefordypning",
    summary:
      "Arbeid med datavarehus, ETL, forretningsanalyse og rapporteringsflyt for beslutningsstotte. Olist-prosjektet passer naturlig inn her.",
    focus: [
      "Datavarehusdesign",
      "ETL og rapportering",
      "Forretningsrettet analyse",
    ],
  },
  {
    id: "artificial-intelligence-for-business-applications",
    title: "Artificial Intelligence for Business Applications",
    tag: "AI",
    semester: "Anvendt intelligens",
    summary:
      "Fokuserte pa bruk av AI i forretningssammenheng, fra prediksjon og automatisering til beslutningsstotte.",
    focus: [
      "AI i forretningskontekst",
      "Prediksjon og beslutningsstotte",
      "Modellbasert problemlosning",
    ],
  },
  {
    id: "applikasjonsutvikling-for-mobile-enheter",
    title: "Applikasjonsutvikling for mobile enheter",
    tag: "Mobile",
    semester: "Mobil utvikling",
    summary:
      "Arbeid med utvikling for mobile enheter, interfacebegrensninger og responsiv interaksjon for mindre skjermer.",
    focus: [
      "Mobil-forst design",
      "Flyt pa sma skjermer",
      "Touch-baserte monstre",
    ],
  },
  {
    id: "iot-teknologi-og-mikrokontrollere",
    title: "IoT-teknologi og Mikrokontrollere i Smarte Systemer",
    tag: "IoT",
    semester: "Innebygde systemer",
    summary:
      "Introduksjon til smarte systemer, sensorer, oppkoblede enheter og mikrokontrollere i praktiske IoT-losninger.",
    focus: [
      "Mikrokontrollere og hardwarelogikk",
      "Sensorer og oppkoblede systemer",
      "Praktisk IoT-tenkning",
    ],
  },
  {
    id: "operativsystemer",
    title: "Operativsystemer",
    tag: "Systems",
    semester: "Lavt nivaa",
    summary:
      "Ga innsikt i operativsystemer, prosesser, minne, filsystemer og hvordan programvare kjores tettere pa maskinen.",
    focus: [
      "Prosesser og ressurser",
      "Minne og systematferd",
      "Kjernen i OS-forstaelse",
    ],
  },
];

const featureMap = {
  "business-intelligence-og-datavarehus": {
    label: "Relevant prosjekt",
    title: "Olist E-commerce Analytics",
    text: "Dette faget henger direkte sammen med prosjektet i repoet: PostgreSQL-datavarehus, Pentaho ETL, SQL-analyse, Python-forecasting og Power BI.",
    chips: ["PostgreSQL", "Pentaho", "Python", "Power BI"],
  },
  "applikasjonsutvikling-for-web": {
    label: "Relevant prosjekt",
    title: "Selve portfolien",
    text: "Denne React-portfolien kan brukes som en del av webapplikasjonsfaget fordi den viser struktur, UI-komposisjon og presentasjon av arbeid.",
    chips: ["React", "Hero UI", "Frontend"],
  },
  "artificial-intelligence-for-business-applications": {
    label: "Relevant prosjekt",
    title: "Forecasting og analyse",
    text: "Prediksjonsdelen i Olist-prosjektet passer ogsa naturlig her, siden den bruker modellbasert analyse for beslutningsstotte.",
    chips: ["Machine learning", "Forecasting", "Business analytics"],
  },
};

function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, "");

  if (!hash || hash === "/") {
    return { page: "home", courseId: null };
  }

  const match = hash.match(/^\/course\/(.+)$/);

  if (match) {
    return { page: "course", courseId: decodeURIComponent(match[1]) };
  }

  return { page: "home", courseId: null };
}

function navigateToCourse(courseId) {
  window.location.hash = `/course/${courseId}`;
}

function navigateHome() {
  window.location.hash = "/";
}

function CourseCard({ course }) {
  return (
    <button
      key={course.id}
      className="course-card"
      onClick={() => navigateToCourse(course.id)}
      type="button"
    >
      <span className="course-card__tag">{course.tag}</span>
      <h3>{course.title}</h3>
      <p>{course.semester}</p>
    </button>
  );
}

function HomePage() {
  return (
    <>
      <section className="portfolio-hero">
        <div
          className="portfolio-hero__copy"
          style={{ "--hero-image": `url(${heroHeaderImage})` }}
        >
          <Chip
            className="border-white/10 bg-white/10 text-white"
            radius="sm"
            variant="flat"
          >
            Study portfolio
          </Chip>
          <h1>Velkommen til min portfolio</h1>
          <p>
            Her finner du en oversikt over fagene jeg har hatt og prosjektene
            jeg har jobbet med gjennom studiet.
          </p>
          <div className="portfolio-hero__actions">
            <Button
              as={Link}
              className="bg-white font-semibold text-slate-950"
              href="#subjects"
              radius="sm"
              size="lg"
            >
              Se fag
            </Button>
          </div>
        </div>
      </section>

      <section className="portfolio-section" id="subjects">
        <div className="portfolio-section__intro">
          <p className="portfolio-kicker">Fag</p>
          <h2>Trykk pa et kort for a apne en egen side.</h2>
          <p>
            Hvert fag har na sin egen side, slik at du senere kan fylle inn
            oppgaver, prosjekter og annet relevant innhold per emne.
          </p>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </>
  );
}

function CoursePage({ course }) {
  const selectedFeature = featureMap[course.id];

  return (
    <>
      <section className="portfolio-section portfolio-section--tight">
        <div className="course-page-back">
          <Button
            className="border-white/15 bg-white/5 text-white"
            onPress={navigateHome}
            radius="sm"
            variant="bordered"
          >
            Tilbake til oversikten
          </Button>
        </div>

        <div className="portfolio-section__intro">
          <p className="portfolio-kicker">{course.tag}</p>
          <h1 className="course-page-title">{course.title}</h1>
          <p>{course.summary}</p>
        </div>

        <div className="subject-layout">
          <Card className="border border-white/10 bg-white/10 shadow-glow">
            <CardBody className="gap-6 p-6 md:p-8">
              <div className="subject-detail__header">
                <div>
                  <p className="portfolio-kicker">Fokusomrader</p>
                  <h3>Hva faget dekker</h3>
                </div>
                <Chip
                  className="border-white/10 bg-white/5 text-white"
                  radius="sm"
                  variant="flat"
                >
                  {course.semester}
                </Chip>
              </div>

              <div className="subject-focus">
                {course.focus.map((item) => (
                  <div key={item} className="subject-focus__item">
                    <span className="portfolio-strength__dot" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="border border-white/10 bg-slate-950/50">
            <CardBody className="gap-5 p-6 md:p-8">
              <p className="portfolio-kicker">
                {selectedFeature ? selectedFeature.label : "Kobling"}
              </p>
              <h3>
                {selectedFeature
                  ? selectedFeature.title
                  : "Plass til prosjekter og fagspesifikt innhold"}
              </h3>
              <p>
                {selectedFeature
                  ? selectedFeature.text
                  : "Denne siden er satt opp slik at du senere kan legge inn konkrete prosjekter, innleveringer, kodeeksempler eller refleksjoner som horer til dette faget."}
              </p>
              <div className="portfolio-card__chips">
                {(selectedFeature?.chips ?? [course.tag, "Oppgaver", "Prosjekter"]).map(
                  (item) => (
                    <Chip
                      key={item}
                      className="border-white/10 bg-white/5 text-white"
                      radius="sm"
                      size="sm"
                      variant="flat"
                    >
                      {item}
                    </Chip>
                  )
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-section__intro">
          <p className="portfolio-kicker">Innhold for faget</p>
          <h2>Her kan du legge inn oppgaver og prosjekter.</h2>
          <p>
            Seksjonene under er klare til a fylles med arbeid som horer til
            dette faget.
          </p>
        </div>

        <div className="course-content-grid">
          <Card className="border border-white/10 bg-white/10">
            <CardBody className="gap-4 p-6">
              <p className="portfolio-kicker">Oppgaver</p>
              <h3>Plass for innleveringer og oppgavesett</h3>
              <p>
                Legg inn korte beskrivelser av oppgaver, hva du gjorde, hvilke
                teknologier du brukte, og hva du larte.
              </p>
            </CardBody>
          </Card>

          <Card className="border border-white/10 bg-slate-950/50">
            <CardBody className="gap-4 p-6">
              <p className="portfolio-kicker">Prosjekter</p>
              <h3>Plass for prosjektarbeid knyttet til faget</h3>
              <p>
                Her kan du senere legge inn prosjektkort, lenker, skjermbilder
                eller beskrivelser av relevant arbeid.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="portfolio-section portfolio-section--tight">
      <div className="portfolio-section__intro">
        <p className="portfolio-kicker">Fant ikke fag</p>
        <h2>Denne fagsiden finnes ikke.</h2>
        <p>Gaa tilbake til oversikten og velg et fag fra listen.</p>
      </div>
      <Button
        className="w-fit bg-[#f59e0b] font-semibold text-slate-950"
        onPress={navigateHome}
        radius="sm"
      >
        Tilbake til forsiden
      </Button>
    </section>
  );
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === route.courseId),
    [route.courseId]
  );

  return (
    <main className="portfolio-shell">
      {route.page === "course" ? (
        selectedCourse ? (
          <CoursePage course={selectedCourse} />
        ) : (
          <NotFoundPage />
        )
      ) : (
        <HomePage />
      )}
    </main>
  );
}

export default App;
