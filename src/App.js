import { useEffect, useMemo, useState } from "react";
import "./App.css";
import heroHeaderImage from "./assets/portfolioHeader.png";
import descriptiveAnalyticsImage from "./assets/bi/descriptive_analytics_sales.png";
import predictiveAnalyticsImage from "./assets/bi/predictive_model_next_month.png";
import biHeaderImage from "./assets/BIDheaderbilde.png";
import finalReportPdf from "./assets/bi/BID3000_FINAL_REPORT.pdf";
import erdPdf from "./assets/bi/ERD.pdf";
import dashboardDocumentationPdf from "./assets/bi/Dashboard_Documentation.pdf";
import deliveryDashboardOverview from "./assets/bi/dashboard-pages/delivery-dashboard-overview.png";
import deliveryDashboardRegionalMap from "./assets/bi/dashboard-pages/delivery-dashboard-regional-map.png";
import deliveryDashboardMonthlyTrends from "./assets/bi/dashboard-pages/delivery-dashboard-monthly-trends.png";
import deliveryDashboardLateByRegion from "./assets/bi/dashboard-pages/delivery-dashboard-late-by-region.png";
import mainDashboard from "./assets/bi/dashboard-pages/main-dashboard.png";
import detailedAnalysis from "./assets/bi/dashboard-pages/detailed-analysis.png";
import drillThrough from "./assets/bi/dashboard-pages/drill-through.png";
import aiCardImage from "./assets/AIBilde.png";
import golfStoreHeroImage from "./assets/golfstore/homepage.png";
import golfStoreLogoImage from "./assets/golfstore/kollegutta.png";
import garbageMlmDemoImage from "./assets/garbagemlm-demo.png";
import { Button, Card, CardBody, Chip, Link, Tab, Tabs } from "@heroui/react";

const courses = [
  {
    id: "grunnleggende-programmering-1",
    title: "Grunnleggende programmering 1",
    tag: "Programming",
    semester: "Tidlig studiegrunnlag",
    summary:
      "Grunnleggende innføring i programmering med fokus på variabler, kontrollstrukturer, funksjoner og logisk problemløsning.",
    focus: [
      "Grunnleggende logikk og algoritmisk tenkning",
      "Strukturering av kode steg for steg",
      "Forståelse for hvordan programmer kjøres",
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
      "Tabeller, nøkler og koblinger",
    ],
  },
  {
    id: "webutvikling-og-hci",
    title: "Webutvikling og HCI",
    tag: "Web",
    semester: "Interaksjon og UX",
    summary:
      "Kombinerte webutvikling med prinsipper fra human-computer interaction for å bygge brukervennlige digitale løsninger.",
    focus: [
      "HTML, CSS og interaksjonsmønstre",
      "Brukervennlighet og tilgjengelighet",
      "Brukersentrert design",
    ],
  },
  {
    id: "digital-forretningsforstaelse",
    title: "Digital forretningsforståelse",
    tag: "Business",
    semester: "Forretningskontekst",
    summary:
      "Handlet om hvordan teknologi skaper verdi, hvordan virksomheter bruker digitale løsninger, og hvordan IT henger sammen med strategi.",
    focus: [
      "Digitale forretningsmodeller",
      "Verdiskaping med teknologi",
      "Strategisk forståelse av IT",
    ],
  },
  {
    id: "praktisk-prosjektarbeid",
    title: "Praktisk prosjektarbeid",
    tag: "Project",
    semester: "Samarbeid",
    summary:
      "Arbeid i mer realistiske prosjektformer med planlegging, samarbeid, leveranser og iterativ gjennomføring.",
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
      "Videreutvikling av programmeringsgrunnlaget med mer avansert logikk, større oppgaver og sterkere kodestruktur.",
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
      "Arbeid med utvikling av komplette webapplikasjoner med fokus på front-end, struktur og brukerinteraksjon.",
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
      "Avansert spørring",
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
      "Handlet om etisk ansvar i teknologi, blant annet personvern, rettferdighet, bærekraft og samfunnskonsekvenser av systemer.",
    focus: [
      "Ansvarlig teknologibruk",
      "Etisk refleksjon",
      "Samfunnspåvirkning fra IT",
    ],
  },
  {
    id: "objektorientert-programmering-2",
    title: "Objektorientert programmering 2",
    tag: "OOP",
    semester: "Videre programstruktur",
    summary:
      "Bygget videre på objektorientert programmering med sterkere abstraksjon, design og større kodebaser.",
    focus: [
      "Abstraksjon og design",
      "Større kodebaser",
      "Gjenbrukbar struktur",
    ],
  },
  {
    id: "samfunnsvitenskapelig-metode",
    title: "Samfunnsvitenskapelig metode",
    tag: "Method",
    semester: "Metodeforståelse",
    summary:
      "Fokuserte på forskningsmetoder, datainnsamling, kildekvalitet og systematisk analyse.",
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
      "Sikker håndtering av informasjon",
    ],
  },
  {
    id: "selvstudie-it-og-informasjonssystemer",
    title: "Selvstudie IT og informasjonssystemer",
    tag: "Self-study",
    semester: "Selvstendig arbeid",
    summary:
      "Trente evnen til å jobbe selvstendig med IT- og informasjonssystemtemaer, tilegne seg nytt stoff og dokumentere læring.",
    focus: [
      "Selvstendig læring",
      "Systemforståelse",
      "Egen progresjon",
    ],
  },
  {
    id: "app2000-golfstore",
    title: "APP2000 GolfStore",
    tag: "Fullstack",
    semester: "Applikasjonsprosjekt",
    summary:
      "Et fullstack gruppeprosjekt for en golfbutikk med Next.js frontend, Spring Boot backend, PostgreSQL, Docker og Keycloak for autentisering.",
    focus: [
      "Frontend i Next.js og React",
      "REST API med Spring Boot",
      "Sikker autentisering med Keycloak",
    ],
  },
  {
    id: "business-intelligence-og-datavarehus",
    title: "Business Intelligence og datavarehus (USN)",
    tag: "BI",
    semester: "Analysefordypning",
    summary:
      "Arbeid med datavarehus, ETL, forretningsanalyse og rapporteringsflyt for beslutningsstøtte.",
    focus: [
      "Datavarehusdesign",
      "ETL og rapportering",
      "Forretningsrettet analyse",
    ],
  },
  {
    id: "artificial-intelligence-for-business-applications",
    title: "Artificial Intelligence for Business Applications (USN)",
    tag: "AI",
    semester: "Anvendt intelligens",
    summary:
      "Fokuserte på bruk av AI i forretningssammenheng, fra prediksjon og automatisering til beslutningsstøtte.",
    focus: [
      "AI i forretningskontekst",
      "Prediksjon og beslutningsstøtte",
      "Modellbasert problemløsning",
    ],
  },
  {
    id: "applikasjonsutvikling-for-mobile-enheter",
    title: "Applikasjonsutvikling for mobile enheter (USN)",
    tag: "Mobile",
    semester: "Mobil utvikling",
    summary:
      "Arbeid med utvikling for mobile enheter, interfacebegrensninger og responsiv interaksjon for mindre skjermer.",
    focus: [
      "Mobil-først design",
      "Flyt på små skjermer",
      "Touch-baserte mønstre",
    ],
  },
  {
    id: "iot-teknologi-og-mikrokontrollere",
    title: "IoT-teknologi og Mikrokontrollere i Smarte Systemer (USN)",
    tag: "IoT",
    semester: "Innebygde systemer",
    summary:
      "Introduksjon til smarte systemer, sensorer, oppkoblede enheter og mikrokontrollere i praktiske IoT-løsninger.",
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
    semester: "Lavt nivå",
    summary:
      "Ga innsikt i operativsystemer, prosesser, minne, filsystemer og hvordan programvare kjøres tettere på maskinen.",
    focus: [
      "Prosesser og ressurser",
      "Minne og systematferd",
      "Kjernen i OS-forståelse",
    ],
  },
];

const featureMap = {
  "app2000-golfstore": {
    label: "Prosjekt",
    title: "GolfStore",
    text: "Et fullstack e-commerce prosjekt bygget som gruppeoppgave, der jeg bidro både på frontend og backend og hadde særskilt ansvar for søkefunksjonalitet og API-integrasjon.",
    chips: ["Next.js", "Spring Boot", "PostgreSQL", "Keycloak", "Docker"],
  },
  "business-intelligence-og-datavarehus": {
    label: "Prosjekt",
    title: "Olist E-commerce Analytics",
    text: "Dette faget henger direkte sammen med prosjektet i repoet: PostgreSQL-datavarehus, Pentaho ETL, SQL-analyse, Python-forecasting og Power BI.",
    chips: ["PostgreSQL", "Pentaho", "Python", "Power BI"],
  },
  "applikasjonsutvikling-for-web": {
    label: "Prosjekt",
    title: "Selve portfolien",
    text: "Denne React-portfolien kan brukes som en del av webapplikasjonsfaget fordi den viser struktur, UI-komposisjon og presentasjon av arbeid.",
    chips: ["React", "Hero UI", "Frontend"],
  },
  "artificial-intelligence-for-business-applications": {
    label: "Prosjekt",
    title: "Forecasting og analyse",
    text: "Prediksjonsdelen i Olist-prosjektet passer også naturlig her, siden den bruker modellbasert analyse for beslutningsstøtte.",
    chips: ["Machine learning", "Forecasting", "Business analytics"],
  },
};

const golfStoreProjectShowcase = {
  title: "GolfStore",
  intro:
    "Prosjektet består av en frontend for nettbutikk og en backend med API, database og autentisering. Begge repositoriene er lagt inn i denne portfolio-mappen.",
  sections: [
    {
      title: "Frontend repository",
      description:
        "Next.js-applikasjon med React, UI-komponenter, søkefunksjonalitet og integrasjon mot backend-API-et.",
      items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Keycloak JS"],
    },
    {
      title: "Backend repository",
      description:
        "Spring Boot-applikasjon med REST-endepunkter, PostgreSQL, JWT-beskyttelse, Docker Compose og Swagger/OpenAPI.",
      items: ["Java 17", "Spring Boot 3", "Spring Security", "PostgreSQL", "Docker Compose"],
    },
    {
      title: "Mine bidrag",
      description:
        "Jeg jobbet med frontend, deler av backend og tok ledelsen på søkefunksjonalitet og integrasjon mellom klient og API.",
      items: [
        "UI-komponenter og featureutvikling",
        "API-kobling mellom frontend og backend",
        "Autentisering og brukerflyt med Keycloak",
        "Søkefunksjonalitet og backend search-endepunkter",
      ],
    },
    {
      title: "Lokal kjøring",
      description:
        "Backend startes med Docker Compose og frontend kjøres som egen Next.js-app med miljøvariabler mot lokal API og Keycloak.",
      items: ["Backend: localhost:8080", "Frontend: localhost:3000", "Keycloak: localhost:8180", "Swagger UI tilgjengelig på backend"],
    },
  ],
};

const golfStoreRepoLinks = [
  {
    title: "Frontend repo",
    href: "https://github.com/Larnor96/golfstore",
    description: "Fork av frontend-repoet som viser mitt arbeid med Next.js-klienten.",
  },
  {
    title: "Backend repo",
    href: "https://github.com/Larnor96/GolfStoreBackend",
    description: "Fork av backend-repoet med Spring Boot, PostgreSQL, Keycloak og Docker-oppsett.",
  },
];

const golfStoreArchitecture = [
  "Frontend: Next.js 15, React 19, TypeScript og Tailwind-baserte UI-komponenter",
  "Backend: Spring Boot 3.4, Spring Security, Spring Data JPA og OpenAPI",
  "Database: PostgreSQL med seed-data og lokal oppstart via Docker Compose",
  "Auth: Keycloak med JWT-baserte roller og beskyttede endepunkter",
];

const golfStorePresentation = {
  title: "GolfStore",
  intro:
    "GolfStore er et fullstack nettbutikkprosjekt for golfutstyr, bygget som en gruppeoppgave med tydelig delt frontend- og backend-arkitektur.",
  highlights: [
    { value: "2", label: "separate repoer" },
    { value: "5+", label: "sentrale teknologier" },
    { value: "3", label: "kjørende lokale tjenester" },
  ],
  gallery: [
    {
      title: "Landing page og visuell profil",
      src: golfStoreHeroImage,
      description:
        "Forsiden bruker en tydelig hero-seksjon med golfprofil, produktfokus og en egen butikkidentitet.",
    },
    {
      title: "Logo og merkevare",
      src: golfStoreLogoImage,
      description:
        "Prosjektet fikk en egen visuell identitet med Kolleggutta Golf Butikken som merkevare i frontend-opplevelsen.",
    },
  ],
  rolePoints: [
    "Utviklet UI-komponenter og flyt i frontend med Next.js og React",
    "Koblet frontend mot Spring Boot-endepunkter for produkter og brukerfunksjoner",
    "Arbeidet med autentisering og sesjonshåndtering via Keycloak",
    "Tok ledelsen på søkefunksjonalitet og integrasjonen mot backend-søk",
  ],
  userFlows: [
    {
      title: "Produktutforskning",
      description:
        "Brukeren kan bla i produkter, kategorier og enkel produktvisning hentet fra REST API-et.",
    },
    {
      title: "Søk og filtrering",
      description:
        "Søkefunksjonen var en sentral del av mitt bidrag og koblet frontend-opplevelsen til backendens produktsøk.",
    },
    {
      title: "Innlogging og handlekurv",
      description:
        "Beskyttede brukerfunksjoner bruker Keycloak og tokenbasert tilgang til shopping cart og brukerdata.",
    },
  ],
  runSteps: [
    "Start backendstakken med `docker-compose up --build -d` i `GolfStoreBackend`.",
    "Start frontenden med `npm install` og `npm run dev -- --port 3001` i `golfstore`.",
    "Bruk `http://localhost:3001` for frontend, `http://localhost:8080` for API og `http://localhost:8180` for Keycloak.",
  ],
};

const garbageMlmProject = {
  title: "GarbageMLM",
  intro:
    "Et maskinlæringsprosjekt for bildegjenkjenning av avfall, der en trent Keras-modell klassifiserer bilder i fem avfallskategorier via et enkelt Gradio-grensesnitt.",
  sections: [
    {
      title: "Modell og kategorier",
      description:
        "Prosjektet klassifiserer bilder i fem klasser: glass, metall, matavfall, papp/papir/kartong og plastikk.",
      items: ["5 avfallskategorier", "CNN-basert bildeklassifisering", "Softmax sannsynlighetsfordeling"],
    },
    {
      title: "Teknologi",
      description:
        "Løsningen er bygget med TensorFlow/Keras for trening og inferens, og Gradio for et lett webgrensesnitt for demo.",
      items: ["TensorFlow", "Keras", "NumPy", "Pillow", "Gradio"],
    },
    {
      title: "Prosjektfiler",
      description:
        "Repoet inneholder både treningsskript, demoapp, requirements og en ferdigtrent modellfil klar for lokal bruk.",
      items: ["train_model.py", "app.py", "requirements.txt", "waste_management_ai.keras"],
    },
  ],
};

const garbageMlmHighlights = [
  "Bildeklassifisering med konvolusjonelt nevralt nettverk",
  "Datapreprosessering og enkel data augmentation under trening",
  "Tidlig stopp, læringsratejustering og model checkpoint i treningsløpet",
  "Lokal demo via Gradio for opplasting og klassifisering av bilder",
];

const garbageMlmRunSteps = [
  "Installer avhengigheter med `pip install -r requirements.txt` i `GarbageMLM`.",
  "Start demoen med `python app.py`.",
  "Last opp et bilde av avfall i Gradio-grensesnittet for å få predikert klasse og sannsynligheter.",
];

const garbageMlmRepo = {
  title: "GarbageMLM repository",
  href: "https://github.com/Larnor96/GarbageMLM",
  description:
    "Repoet viser både treningsløpet og den kjørbare demoappen for avfallsklassifisering.",
};

const biProjectShowcase = {
  title: "GroupAABLM_BID3000_2025",
  intro:
    "Denne mappen inneholder et komplett BI-prosjekt med datavarehus, ETL-flyt, analyse, rapport og dashboard-filer.",
  sections: [
    {
      title: "Database",
      description:
        "SQL-filer for schemaoppsett og spørringer mot datavarehuset.",
      items: ["Schema_creation.sql", "queries.sql"],
    },
    {
      title: "ETL",
      description:
        "Pentaho-transformasjoner for dimensjoner, fakta og datarensing.",
      items: [
        "dim_date.ktr",
        "fact_order_items.ktr",
        "fact_delivery.ktr",
        "transform_customer_05112025.ktr",
        "transform_product.ktr",
        "transform_seller_06112025.ktr",
      ],
    },
    {
      title: "Analytics",
      description:
        "Python-basert analyse med visualisering, forecasting og business insights.",
      items: [
        "python_analytic_integration.py",
        "requirements.txt",
        "business_insights.txt",
        "descriptive_analytics_sales.png",
        "predictive_model_next_month.png",
      ],
    },
    {
      title: "Rapport og dokumentasjon",
      description:
        "ERD, sluttrapport og dokumentasjon fra dashboard-arbeidet.",
      items: [
        "BID3000_FINAL_REPORT.pdf",
        "ERD.pdf",
        "Dashboard Documentation.pdf",
      ],
    },
  ],
};

const biDatasetFiles = [
  "olist_customers_dataset.csv",
  "olist_geolocation_dataset.csv",
  "olist_orders_dataset.csv",
  "olist_order_items_dataset.csv",
  "olist_order_payments_dataset.csv",
  "olist_order_reviews_dataset.csv",
  "olist_products_dataset.csv",
  "olist_sellers_dataset.csv",
  "product_category_name_translation.csv",
];

const biCodeSamples = {
  python: `def connect_to_warehouse():
    DB_CONFIG = {
        'host': 'localhost',
        'port': 5432,
        'database': 'olist',
        'user': 'postgres',
        'password': '123456'
    }

    connection = (
        f"postgresql://{DB_CONFIG['user']}:{DB_CONFIG['password']}"
        f"@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['database']}"
    )
    engine = create_engine(connection)
    return engine

def extract_sales_data(engine):
    sales_query = """
    SELECT
        foi.order_id,
        foi.total_price,
        dc.customer_state,
        dp.product_category_name,
        dd.full_date,
        dd.year,
        dd.month,
        dd.month_name
    FROM dwh.fact_order_items foi
    JOIN dwh.dim_customer dc ON foi.customer_key = dc.customer_key
    JOIN dwh.dim_product dp ON foi.product_key = dp.product_key
    JOIN dwh.dim_date dd ON foi.date_key = dd.date_key
    ORDER BY dd.full_date
    """
    return pd.read_sql(sales_query, engine)`,
  sql: `CREATE TABLE IF NOT EXISTS dwh.fact_order_items
(
    order_id text,
    customer_key integer,
    seller_key integer,
    product_key integer,
    date_key integer,
    order_item_id integer,
    item_price numeric,
    freight_price numeric,
    total_price numeric,
    CONSTRAINT fk_customer FOREIGN KEY (customer_key)
        REFERENCES dwh.dim_customer (customer_key),
    CONSTRAINT fk_date FOREIGN KEY (date_key)
        REFERENCES dwh.dim_date (date_key),
    CONSTRAINT fk_product FOREIGN KEY (product_key)
        REFERENCES dwh.dim_product (product_key),
    CONSTRAINT fk_seller FOREIGN KEY (seller_key)
        REFERENCES dwh.dim_seller (seller_key)
);`,
  query: `SELECT
    dp.product_category_name,
    SUM(foi.total_price) AS total_revenue,
    RANK() OVER (ORDER BY SUM(foi.total_price) DESC) AS revenue_rank
FROM dwh.fact_order_items foi
JOIN dwh.dim_product dp ON foi.product_key = dp.product_key
GROUP BY dp.product_category_name
ORDER BY revenue_rank
LIMIT 10;`,
  etl: `<step>
  <name>ADD TOTAL PRICE</name>
  <type>Calculator</type>
  <calculation>
    <field_name>total_price</field_name>
    <calc_type>ADD</calc_type>
    <field_a>price</field_a>
    <field_b>freight_value</field_b>
    <value_type>Number</value_type>
    <remove>N</remove>
  </calculation>
</step>

<step>
  <name>CSV_CUSTOMERS</name>
  <type>CsvInput</type>
  <filename>\${Internal.Transformation.Filename.Directory}\\dataset\\olist_customers_dataset.csv</filename>
  <separator>,</separator>
  <enclosure>"</enclosure>
  <header>Y</header>
  <lazy_conversion>Y</lazy_conversion>
  <fields>
    <field>
      <name>customer_id</name>
      <type>String</type>
      <trim_type>none</trim_type>
    </field>
    <field>
      <name>customer_unique_id</name>
      <type>String</type>
      <trim_type>none</trim_type>
    </field>
  </fields>
</step>`,
};

const biInsights = [
  "Total Revenue: R$ 15,843,553.24 across 24 months",
  "Best Category: 'beleza_saude' accounts for 9.1% of revenue",
  "Key Market: State 'sp' generates 37.4% of sales",
];

const biPdfFiles = [
  {
    title: "Final report",
    fileName: "BID3000_FINAL_REPORT.pdf",
    src: finalReportPdf,
    description: "Sluttrapporten for prosjektet med metode, gjennomføring og resultater.",
  },
  {
    title: "ERD",
    fileName: "ERD.pdf",
    src: erdPdf,
    description: "Entity relationship diagram for datamodellen og strukturen i løsningen.",
  },
  {
    title: "Dashboard documentation",
    fileName: "Dashboard Documentation.pdf",
    src: dashboardDocumentationPdf,
    description: "Dokumentasjon av Power BI-dashboardet og hvordan innsikten presenteres.",
  },
];

const biDashboardPages = [
  { title: "1.1 Figure 1 - Cards Overview", src: deliveryDashboardOverview },
  { title: "1.2 Figure 2 - Regional Map", src: deliveryDashboardRegionalMap },
  { title: "1.3 Figure 3 - Monthly Delivery Trends", src: deliveryDashboardMonthlyTrends },
  { title: "1.4 Figure 4 - Late Deliveries by Region", src: deliveryDashboardLateByRegion },
  { title: "2. Main Dashboard", src: mainDashboard },
  { title: "3. Detailed Sales Analysis", src: detailedAnalysis },
  { title: "4. Drill Through Function", src: drillThrough },
];

const featuredProjectIds = [
  "app2000-golfstore",
  "business-intelligence-og-datavarehus",
  "applikasjonsutvikling-for-mobile-enheter",
  "iot-teknologi-og-mikrokontrollere",
  "artificial-intelligence-for-business-applications",
];

const featuredCardMedia = {
  "app2000-golfstore": {
    type: "image",
    src: golfStoreLogoImage,
    alt: "GolfStore logo",
    className: "course-card__image course-card__image--contain",
  },
  "business-intelligence-og-datavarehus": {
    type: "image",
    src: mainDashboard,
    alt: "Business Intelligence dashboard",
    className: "course-card__image",
  },
  "artificial-intelligence-for-business-applications": {
    type: "image",
    src: aiCardImage,
    alt: "AI project preview",
    className: "course-card__image",
  },
  "applikasjonsutvikling-for-mobile-enheter": {
    type: "panel",
    kicker: "Mobile",
    title: "App Flow",
    accent: "course-card__panel course-card__panel--mobile",
  },
  "iot-teknologi-og-mikrokontrollere": {
    type: "panel",
    kicker: "IoT",
    title: "Sensor Lab",
    accent: "course-card__panel course-card__panel--iot",
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
  const media = featuredCardMedia[course.id];

  return (
    <button
      key={course.id}
      className={`course-card${media ? " course-card--with-image" : ""}`}
      onClick={() => navigateToCourse(course.id)}
      type="button"
    >
      <span className="course-card__tag">{course.tag}</span>
      {media?.type === "image" ? (
        <div className="course-card__image-wrap">
          <img alt={media.alt} className={media.className} src={media.src} />
        </div>
      ) : null}
      {media?.type === "panel" ? (
        <div className={media.accent}>
          <span>{media.kicker}</span>
          <strong>{media.title}</strong>
        </div>
      ) : null}
      <h3>{course.title}</h3>
    </button>
  );
}

function HomePage() {
  const featuredProjects = courses.filter((course) =>
    featuredProjectIds.includes(course.id)
  );

  return (
    <>
      <section className="portfolio-hero">
        <div className="portfolio-hero__copy">
          <div className="portfolio-hero__header">
            <Chip
              className="border border-slate-200 bg-white/85 text-slate-700 shadow-sm"
              radius="sm"
              variant="flat"
            >
              Project portfolio
            </Chip>
            <h1>Velkommen til min portfolio</h1>
          </div>

          <div className="portfolio-hero__media">
            <img alt="Portfolio header" src={heroHeaderImage} />
          </div>

          <div className="portfolio-hero__footer">
            <p>
              Her finner du en oversikt over mine prosjekter og arbeid jeg har
              gjort gjennom studiet.
            </p>
            <div className="portfolio-hero__actions">
              <Button
                as={Link}
                className="bg-white font-semibold text-slate-950"
                href="#subjects"
                radius="sm"
                size="lg"
              >
                Se prosjekter
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section" id="subjects">
        <div className="portfolio-section__intro">
          <p className="portfolio-kicker">Prosjekter</p>
        </div>

        <div className="course-grid">
          {featuredProjects.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </>
  );
}

function CoursePage({ course }) {
  const selectedFeature = featureMap[course.id];
  const isBiCourse = course.id === "business-intelligence-og-datavarehus";
  const isGolfStoreCourse = course.id === "app2000-golfstore";
  const isAiCourse = course.id === "artificial-intelligence-for-business-applications";
  const projectChips = selectedFeature?.chips ?? [course.tag, "Prosjekt"];

  return (
    <>
      <section className="portfolio-section portfolio-section--tight">
        <div className="course-page-back">
          <Button
            className="border border-slate-200 bg-white text-slate-800 shadow-sm"
            onPress={navigateHome}
            radius="sm"
            variant="bordered"
          >
            Tilbake til oversikten
          </Button>
        </div>

        <div className="portfolio-section__intro">
          <p className="portfolio-kicker">Prosjekt</p>
          <h1 className="course-page-title">{course.title}</h1>
          <p>{course.summary}</p>
        </div>

        {isBiCourse ? (
          <div className="course-page-header-media">
            <img alt="Business Intelligence project header" src={biHeaderImage} />
          </div>
        ) : null}

        <div className="subject-layout">
          <Card className="border border-slate-200 bg-white/95 shadow-sm">
            <CardBody className="gap-6 p-6 md:p-8">
              <div className="subject-detail__header">
                <div>
                  <p className="portfolio-kicker">Innhold</p>
                  <h3>Hva prosjektet omfatter</h3>
                </div>
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

          <Card className="border border-slate-200 bg-white/95 shadow-sm">
            <CardBody className="gap-5 p-6 md:p-8">
              <p className="portfolio-kicker">Teknologier</p>
              <h3>Teknologier</h3>
              <div className="portfolio-card__chips">
                {projectChips.map((item) => (
                  <Chip
                    key={item}
                    className="border border-slate-200 bg-slate-50 text-slate-700"
                    radius="sm"
                    size="sm"
                    variant="flat"
                  >
                    {item}
                  </Chip>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {isBiCourse ? (
        <section className="portfolio-section portfolio-section--divided">
          <div className="portfolio-section__intro portfolio-section__intro--framed">
            <p className="portfolio-kicker">Prosjektmappe</p>
            <h2>{biProjectShowcase.title}</h2>
          </div>

          <div className="bi-folder-grid">
            {biProjectShowcase.sections.map((section) => (
              <Card
                key={section.title}
                className="border border-slate-200 bg-white/95 shadow-sm"
              >
                <CardBody className="gap-4 p-6">
                  <p className="portfolio-kicker">{section.title}</p>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                  <div className="bi-file-list">
                    {section.items.map((item) => (
                      <div key={item} className="bi-file-list__item">
                        <span className="portfolio-strength__dot" />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {isBiCourse ? (
        <>
          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Kode og artefakter</p>
              <h2>Kode og artefakter</h2>
            </div>

            <Card className="border border-slate-200 bg-white/95 shadow-sm">
              <CardBody className="p-6">
                <Tabs
                  aria-label="BI project code samples"
                  classNames={{
                    tabList:
                      "w-full justify-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2",
                    cursor: "bg-white shadow-sm",
                    tab: "max-w-fit px-4 h-11 text-sm text-slate-600 data-[selected=true]:text-slate-950",
                    panel: "px-0 pt-6",
                  }}
                  radius="full"
                >
                  <Tab key="python" title="Python">
                    <div className="code-preview">
                      <div className="code-preview__meta">
                        <span>python_analytic_integration.py</span>
                        <span>Forecasting, extraction, analytics</span>
                      </div>
                      <pre className="code-block"><code>{biCodeSamples.python}</code></pre>
                    </div>
                  </Tab>
                  <Tab key="sql-schema" title="SQL schema">
                    <div className="code-preview">
                      <div className="code-preview__meta">
                        <span>Schema_creation.sql</span>
                        <span>Warehouse modeling</span>
                      </div>
                      <pre className="code-block"><code>{biCodeSamples.sql}</code></pre>
                    </div>
                  </Tab>
                  <Tab key="sql-query" title="SQL query">
                    <div className="code-preview">
                      <div className="code-preview__meta">
                        <span>queries.sql</span>
                        <span>Revenue ranking query</span>
                      </div>
                      <pre className="code-block"><code>{biCodeSamples.query}</code></pre>
                    </div>
                  </Tab>
                  <Tab key="etl" title="ETL flow">
                    <div className="code-preview">
                      <div className="code-preview__meta">
                        <span>fact_order_items.ktr</span>
                        <span>Pentaho transformation</span>
                      </div>
                      <pre className="code-block"><code>{biCodeSamples.etl}</code></pre>
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Analyseoutput</p>
              <h2>Visualiseringer og innsikt fra prosjektet.</h2>
            </div>

            <div className="analytics-gallery">
              <Card className="border border-slate-200 bg-white/95 shadow-sm">
                <CardBody className="gap-4 p-5">
                  <div>
                    <p className="portfolio-kicker">descriptive_analytics_sales.png</p>
                    <h3>Descriptive analytics</h3>
                    <p>
                      Viser salgstrend, distribusjon, toppkategorier og toppstater
                      basert på data hentet fra datavarehuset.
                    </p>
                  </div>
                  <div className="analytics-gallery__image">
                    <img
                      alt="Descriptive analytics from Olist BI project"
                      src={descriptiveAnalyticsImage}
                    />
                  </div>
                </CardBody>
              </Card>

              <Card className="border border-slate-200 bg-white/95 shadow-sm">
                <CardBody className="gap-4 p-5">
                  <div>
                    <p className="portfolio-kicker">predictive_model_next_month.png</p>
                    <h3>Predictive analytics</h3>
                    <p>
                      Visualiserer modellens testresultater og hvordan neste
                      måneds salg ble forecastet med Gradient Boosting.
                    </p>
                  </div>
                  <div className="analytics-gallery__image">
                    <img
                      alt="Predictive analytics from Olist BI project"
                      src={predictiveAnalyticsImage}
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Power BI</p>
              <h2>Dashboardvisninger</h2>
            </div>

            <div className="dashboard-gallery">
              {biDashboardPages.map((page) => (
                <Card key={page.title} className="border border-slate-200 bg-white/95 shadow-sm">
                  <CardBody className="gap-4 p-4">
                    <div>
                      <p className="portfolio-kicker">{page.title}</p>
                    </div>
                    <div className="dashboard-gallery__image">
                      <img alt={page.title} src={page.src} />
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Datasett og leveranser</p>
              <h2>Rådata, dokumentasjon og prosjektfiler.</h2>
            </div>

            <div className="bi-assets-grid">
              <Card className="border border-slate-200 bg-white/95 shadow-sm">
                <CardBody className="gap-4 p-6">
                  <p className="portfolio-kicker">Datasett</p>
                  <h3>CSV-filer brukt i ETL-flyten</h3>
                  <div className="bi-file-list">
                    {biDatasetFiles.map((item) => (
                      <div key={item} className="bi-file-list__item">
                        <span className="portfolio-strength__dot" />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card className="border border-slate-200 bg-white/95 shadow-sm">
                <CardBody className="gap-4 p-6">
                  <p className="portfolio-kicker">Business insights</p>
                  <h3>Funn skrevet ut fra analysen</h3>
                  <div className="bi-file-list">
                    {biInsights.map((item) => (
                      <div key={item} className="bi-file-list__item">
                        <span className="portfolio-strength__dot" />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card className="border border-slate-200 bg-white/95 shadow-sm">
                <CardBody className="gap-4 p-6">
                  <p className="portfolio-kicker">Dokumentasjon</p>
                  <h3>Rapport, ERD og dashboard</h3>
                  <div className="bi-file-list">
                    {[
                      "BID3000_FINAL_REPORT.pdf",
                      "ERD.pdf",
                      "Dashboard Documentation.pdf",
                      "PowerBI Dashboard.pbix",
                    ].map((item) => (
                      <div key={item} className="bi-file-list__item">
                        <span className="portfolio-strength__dot" />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">PDF-dokumenter</p>
              <h2>Rapporter og diagrammer fra prosjektet.</h2>
            </div>

            <div className="pdf-grid">
              {biPdfFiles.map((pdf) => (
                <Card key={pdf.fileName} className="border border-slate-200 bg-white/95 shadow-sm">
                  <CardBody className="gap-4 p-5">
                    <div className="pdf-preview__content">
                      <p className="portfolio-kicker">{pdf.fileName}</p>
                      <h3>{pdf.title}</h3>
                      <p>{pdf.description}</p>
                      <Button
                        as={Link}
                        className="w-fit bg-white font-semibold text-slate-950"
                        href={pdf.src}
                        radius="sm"
                        target="_blank"
                      >
                        Åpne PDF
                      </Button>
                    </div>
                    <div className="pdf-preview">
                      <iframe src={pdf.src} title={pdf.title} />
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>
        </>
      ) : null}

      {isGolfStoreCourse ? (
        <>
          <section className="portfolio-section portfolio-section--divided">
            <div className="golfstore-hero-card">
              <div className="golfstore-hero-card__media">
                <img alt="GolfStore landing page" src={golfStoreHeroImage} />
              </div>

              <div className="golfstore-hero-card__body">
                <p className="portfolio-kicker">Fullstack case</p>
                <h2>En nettbutikk bygget som et komplett system</h2>
                <p>
                  GolfStore presenteres best som et dokumentert fullstack-prosjekt:
                  frontend, API, database og autentisering satt sammen i en helhetlig
                  applikasjon.
                </p>

                <div className="golfstore-highlight-grid">
                  {golfStorePresentation.highlights.map((item) => (
                    <div key={item.label} className="golfstore-highlight">
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Prosjektoversikt</p>
              <h2>{golfStorePresentation.title}</h2>
              <p>{golfStorePresentation.intro}</p>
            </div>

            <div className="project-detail-grid">
              {golfStoreProjectShowcase.sections.map((section) => (
                <Card
                  key={section.title}
                  className="border border-slate-200 bg-white/95 shadow-sm"
                >
                  <CardBody className="gap-4 p-6">
                    <p className="portfolio-kicker">{section.title}</p>
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                    <div className="bi-file-list">
                      {section.items.map((item) => (
                        <div key={item} className="bi-file-list__item">
                          <span className="portfolio-strength__dot" />
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Visuell demo</p>
              <h2>Hvordan prosjektet presenteres</h2>
              <p>
                Siden prosjektet ikke er permanent deployet, er skjermbilder og
                dokumentert flyt den beste måten å vise løsningen på i portfolien.
              </p>
            </div>

            <div className="golfstore-gallery">
              {golfStorePresentation.gallery.map((item) => (
                <Card key={item.title} className="border border-slate-200 bg-white/95 shadow-sm">
                  <CardBody className="gap-4 p-5">
                    <div className="analytics-gallery__image golfstore-gallery__image">
                      <img alt={item.title} src={item.src} />
                    </div>
                    <div>
                      <p className="portfolio-kicker">{item.title}</p>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Min rolle</p>
              <h2>Hva jeg faktisk jobbet med</h2>
            </div>

            <Card className="border border-slate-200 bg-white/95 shadow-sm">
              <CardBody className="gap-4 p-6 md:p-8">
                <div className="bi-file-list">
                  {golfStorePresentation.rolePoints.map((item) => (
                    <div key={item} className="bi-file-list__item">
                      <span className="portfolio-strength__dot" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Brukerflyt</p>
              <h2>Hva løsningen demonstrerer</h2>
            </div>

            <div className="project-detail-grid">
              {golfStorePresentation.userFlows.map((flow) => (
                <Card key={flow.title} className="border border-slate-200 bg-white/95 shadow-sm">
                  <CardBody className="gap-4 p-6">
                    <p className="portfolio-kicker">{flow.title}</p>
                    <h3>{flow.title}</h3>
                    <p>{flow.description}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Repositorier</p>
              <h2>Frontend og backend</h2>
            </div>

            <div className="project-detail-grid">
              {golfStoreRepoLinks.map((repo) => (
                <Card key={repo.href} className="border border-slate-200 bg-white/95 shadow-sm">
                  <CardBody className="gap-4 p-6">
                    <p className="portfolio-kicker">{repo.title}</p>
                    <h3>{repo.title}</h3>
                    <p>{repo.description}</p>
                    <Button
                      as={Link}
                      className="w-fit bg-white font-semibold text-slate-950"
                      href={repo.href}
                      radius="sm"
                      target="_blank"
                    >
                      Åpne repository
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Arkitektur</p>
              <h2>Teknisk oppbygning</h2>
            </div>

            <Card className="border border-slate-200 bg-white/95 shadow-sm">
              <CardBody className="gap-4 p-6 md:p-8">
                <div className="bi-file-list">
                  {golfStoreArchitecture.map((item) => (
                    <div key={item} className="bi-file-list__item">
                      <span className="portfolio-strength__dot" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Lokal demo</p>
              <h2>Hvordan prosjektet kan startes</h2>
            </div>

            <Card className="border border-slate-200 bg-white/95 shadow-sm">
              <CardBody className="gap-5 p-6 md:p-8">
                <div className="bi-file-list">
                  {golfStorePresentation.runSteps.map((item) => (
                    <div key={item} className="bi-file-list__item">
                      <span className="portfolio-strength__dot" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </section>
        </>
      ) : null}

      {isAiCourse ? (
        <>
          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">AI case</p>
              <h2>{garbageMlmProject.title}</h2>
              <p>{garbageMlmProject.intro}</p>
            </div>

            <div className="project-detail-grid">
              {garbageMlmProject.sections.map((section) => (
                <Card key={section.title} className="border border-slate-200 bg-white/95 shadow-sm">
                  <CardBody className="gap-4 p-6">
                    <p className="portfolio-kicker">{section.title}</p>
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                    <div className="bi-file-list">
                      {section.items.map((item) => (
                        <div key={item} className="bi-file-list__item">
                          <span className="portfolio-strength__dot" />
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Hva prosjektet viser</p>
              <h2>Praktisk anvendt maskinlæring</h2>
            </div>

            <Card className="border border-slate-200 bg-white/95 shadow-sm">
              <CardBody className="gap-4 p-6 md:p-8">
                <div className="bi-file-list">
                  {garbageMlmHighlights.map((item) => (
                    <div key={item} className="bi-file-list__item">
                      <span className="portfolio-strength__dot" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Demo</p>
              <h2>Gradio-grensesnitt</h2>
              <p>
                Dette skjermbildet er tatt fra den lokale demoappen som laster den
                ferdigtrente modellen og lar brukeren laste opp et bilde for klassifisering.
              </p>
            </div>

            <Card className="border border-slate-200 bg-white/95 shadow-sm">
              <CardBody className="gap-4 p-5">
                <div className="analytics-gallery__image">
                  <img alt="GarbageMLM Gradio demo" src={garbageMlmDemoImage} />
                </div>
              </CardBody>
            </Card>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Repository</p>
              <h2>Kode og demo</h2>
            </div>

            <Card className="border border-slate-200 bg-white/95 shadow-sm">
              <CardBody className="gap-4 p-6">
                <p className="portfolio-kicker">{garbageMlmRepo.title}</p>
                <h3>{garbageMlmRepo.title}</h3>
                <p>{garbageMlmRepo.description}</p>
                <Button
                  as={Link}
                  className="w-fit bg-white font-semibold text-slate-950"
                  href={garbageMlmRepo.href}
                  radius="sm"
                  target="_blank"
                >
                  Åpne repository
                </Button>
              </CardBody>
            </Card>
          </section>

          <section className="portfolio-section portfolio-section--divided">
            <div className="portfolio-section__intro portfolio-section__intro--framed">
              <p className="portfolio-kicker">Lokal kjøring</p>
              <h2>Hvordan demoen startes</h2>
            </div>

            <Card className="border border-slate-200 bg-white/95 shadow-sm">
              <CardBody className="gap-4 p-6 md:p-8">
                <div className="bi-file-list">
                  {garbageMlmRunSteps.map((item) => (
                    <div key={item} className="bi-file-list__item">
                      <span className="portfolio-strength__dot" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </section>
        </>
      ) : null}
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="portfolio-section portfolio-section--tight">
      <div className="portfolio-section__intro">
        <p className="portfolio-kicker">Fant ikke fag</p>
        <h2>Denne fagsiden finnes ikke.</h2>
        <p>Gå tilbake til oversikten og velg et fag fra listen.</p>
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
