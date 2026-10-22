export interface SeoPage {
  path: string;
  alternate: string;
  lang: "fr" | "en";
  title: string;
  description: string;
  heading: string;
  intro: string;
  sections: { title: string; body: string }[];
  cta: string;
}

export const seoPages: SeoPage[] = [
  {
    path: "/fr/agriculteurs-gic/", alternate: "/en/farmers-groups/", lang: "fr",
    title: "Agriculteurs et GIC au Cameroun — Si-Tcha AI",
    description: "Vendre avant de produire : découvrez comment Si-Tcha AI accompagne les GIC au Cameroun avec la coordination des débouchés et le conseil agricole par SMS.",
    heading: "Agriculteurs et GIC : vendre avant de produire.",
    intro: "Une récolte commence bien avant les semis : par la compréhension des besoins des acheteurs. Si-Tcha AI rapproche les groupements de producteurs, les acheteurs et les agronomes pour organiser la production autour de la demande au Cameroun.",
    sections: [
      { title: "Préparer les débouchés avant les semis", body: "Le projet vise à rapprocher les besoins en cultures, volumes et calendriers des capacités des groupements. L'objectif est de construire des engagements d'achat avant la production et de réduire l'incertitude liée à la vente après récolte. Une mise en relation ne constitue pas une garantie de vente ou de prix." },
      { title: "Recevoir des conseils sur un téléphone simple", body: "L'approche combine données satellitaires, modèles prédictifs et accompagnement agronomique. Les informations essentielles peuvent être diffusées par SMS : recevoir un message ne nécessite pas de smartphone ni de connexion Internet mobile." },
      { title: "Renforcer l'organisation du groupement", body: "La formalisation en Groupement d'Initiative Commune (GIC) aide à structurer la participation aux marchés et aux programmes agricoles. MINADER accompagne les démarches administratives liées aux programmes de financement et de subventions ; leur attribution reste soumise aux critères de chaque programme." },
      { title: "Participer au pilote", body: "Le point de départ est un pilote avec cinq GIC sélectionnés dans les Hautes Terres du Cameroun, autour de la pomme de terre et des cultures maraîchères. Contactez l'équipe pour connaître les modalités de participation et les services disponibles dans votre zone." },
    ], cta: "Présenter mon groupement",
  },
  {
    path: "/en/farmers-groups/", alternate: "/fr/agriculteurs-gic/", lang: "en",
    title: "Farmers and farming groups in Cameroon — Si-Tcha AI",
    description: "Sell before you produce. Explore buyer coordination, SMS advice and support for Common Initiative Groups through Si-Tcha AI's Cameroon pilot.",
    heading: "Farmers and groups: sell before you produce.",
    intro: "A harvest starts before planting, with an understanding of what buyers need. Si-Tcha AI connects farming groups, buyers and agronomists to coordinate production around demand in Cameroon.",
    sections: [
      { title: "Plan market access before planting", body: "The project aims to align crop requirements, volumes and delivery calendars with farming group capacity. Building buyer commitments before production can reduce uncertainty after harvest. A buyer introduction does not guarantee a sale or a particular price." },
      { title: "Receive advice on a basic phone", body: "The approach combines satellite data, predictive models and agronomic support. Essential information can be delivered by SMS; receiving a message does not require a smartphone or mobile internet." },
      { title: "Strengthen your farming group", body: "Formal registration as a Common Initiative Group (GIC) helps structure participation in markets and agricultural programs. MINADER supports administrative processes for funding and grant programs. Awards remain subject to each program's eligibility requirements." },
      { title: "Explore the pilot", body: "The starting point is a pilot with five selected GICs in Cameroon's Highlands, focused on potatoes and market garden produce. Contact the team to discuss participation and service availability in your area." },
    ], cta: "Introduce my farming group",
  },
  {
    path: "/fr/acheteurs/", alternate: "/en/buyers/", lang: "fr",
    title: "Acheteurs agricoles au Cameroun — Approvisionnement | Si-Tcha AI",
    description: "Présentez vos besoins en produits agricoles : Si-Tcha AI rapproche acheteurs et GIC au Cameroun pour mieux planifier la production et les approvisionnements.",
    heading: "Acheteurs : exprimez vos besoins avant la récolte.",
    intro: "Grossistes, transformateurs et acheteurs professionnels ont besoin de visibilité sur leurs approvisionnements. Si-Tcha AI propose de partir de cette demande pour coordonner la production avec des groupements agricoles au Cameroun.",
    sections: [
      { title: "Définir une demande exploitable", body: "Précisez les cultures recherchées, les quantités, les exigences de qualité, le calendrier et le lieu de livraison. Ces informations servent de base à une discussion avec les groupements, afin de rapprocher les besoins commerciaux des possibilités réelles de production." },
      { title: "Construire des relations avec les GIC", body: "La coordination avant les semis permet de discuter plus tôt des conditions d'approvisionnement. Les engagements, contrôles de qualité, prix, responsabilités logistiques et paiements doivent être convenus entre les parties. Le site ne présente pas de stock disponible à l'achat immédiat." },
      { title: "Commencer avec le périmètre pilote", body: "Le pilote porte sur cinq GIC des Hautes Terres du Cameroun et cible la pomme de terre ainsi que les productions maraîchères. Notre équipe peut examiner votre besoin et préciser les capacités et les modalités applicables, sans promettre des volumes non confirmés." },
    ], cta: "Décrire mes besoins d'approvisionnement",
  },
  {
    path: "/en/buyers/", alternate: "/fr/acheteurs/", lang: "en",
    title: "Agricultural buyers in Cameroon — Sourcing | Si-Tcha AI",
    description: "Share your agricultural sourcing needs. Si-Tcha AI connects buyers and farming groups in Cameroon to plan production around demand before planting.",
    heading: "Buyers: make your demand visible before harvest.",
    intro: "Wholesalers, processors and professional buyers need visibility into supply. Si-Tcha AI starts with that demand to coordinate production with farming groups in Cameroon.",
    sections: [
      { title: "Define actionable demand", body: "Share the crops, quantities, quality requirements, delivery schedule and destination you need. These details provide a basis for discussions with farming groups and help align commercial requirements with actual production capacity." },
      { title: "Build relationships with farming groups", body: "Coordination before planting creates room to discuss supply conditions earlier. Commitments, quality checks, prices, logistics and payment responsibilities must be agreed by the parties. This website does not list stock for immediate purchase." },
      { title: "Start with the pilot scope", body: "The pilot involves five GICs in Cameroon's Highlands and focuses on potatoes and market garden produce. Our team can review your needs and discuss capacity and applicable terms without promising unconfirmed volumes." },
    ], cta: "Discuss my sourcing needs",
  },
  {
    path: "/fr/agronomes/", alternate: "/en/agronomists/", lang: "fr",
    title: "Agronomes — Conseil agricole et suivi des parcelles | Si-Tcha AI",
    description: "Découvrez l'approche Si-Tcha AI : données satellitaires, suivi des cultures et conseils par SMS pour accompagner les groupements agricoles au Cameroun.",
    heading: "Agronomes : transformer les données en décisions de terrain.",
    intro: "L'information agricole n'a de valeur que si elle aide un producteur à agir. Si-Tcha AI associe l'expertise agronomique aux données et à une diffusion accessible pour accompagner les GIC au Cameroun.",
    sections: [
      { title: "Relier observation et conseil", body: "L'approche combine imagerie satellitaire et modèles prédictifs pour éclairer le suivi des cultures et les alertes. L'interprétation doit tenir compte de la culture, de la parcelle et des observations de terrain ; un indicateur numérique ne remplace pas un diagnostic agronomique." },
      { title: "Rendre le conseil accessible", body: "Des recommandations courtes et exploitables peuvent être diffusées par SMS, y compris aux producteurs équipés de téléphones simples. Le projet cherche à faciliter le lien entre une alerte, son analyse et une action adaptée au contexte de production." },
      { title: "Contribuer à l'apprentissage du pilote", body: "Le pilote avec cinq GIC permet de travailler sur les besoins des producteurs et la pertinence des conseils. Les écrans interactifs de l'accueil sont une démonstration avec des données simulées : ils ne représentent ni une surveillance en direct ni des résultats mesurés du pilote." },
    ], cta: "Proposer mon expertise agronomique",
  },
  {
    path: "/en/agronomists/", alternate: "/fr/agronomes/", lang: "en",
    title: "Agronomists — Crop monitoring and SMS advice | Si-Tcha AI",
    description: "Explore Si-Tcha AI's approach to satellite data, crop monitoring and SMS advice for farming groups in Cameroon.",
    heading: "Agronomists: turn data into field decisions.",
    intro: "Agricultural information matters when it helps a farmer act. Si-Tcha AI brings agronomic expertise, data and accessible delivery together to support farming groups in Cameroon.",
    sections: [
      { title: "Connect observation with advice", body: "The approach combines satellite imagery and predictive models to inform crop monitoring and alerts. Interpretation must consider the crop, plot and field observations. A digital indicator does not replace an agronomic diagnosis." },
      { title: "Make advice accessible", body: "Short, actionable recommendations can be delivered by SMS, including to farmers using basic phones. The project aims to connect an alert with expert interpretation and an appropriate response for local production conditions." },
      { title: "Contribute to pilot learning", body: "The five-GIC pilot provides a setting to understand farmer needs and assess the usefulness of advice. The interactive dashboard on the homepage is a demonstration using simulated data, not a live monitoring service or measured pilot results." },
    ], cta: "Contribute agronomic expertise",
  },
  {
    path: "/fr/investisseurs/", alternate: "/en/investors/", lang: "fr",
    title: "Investir dans l'agritech au Cameroun — Si-Tcha AI",
    description: "Découvrez Si-Tcha AI : coordination des débouchés, conseil agricole par SMS et pilote de cinq GIC au Cameroun. Échangez avec l'équipe sur le projet.",
    heading: "Investisseurs : relier une production planifiée à un marché identifié.",
    intro: "Si-Tcha AI développe une approche de coordination agricole au Cameroun : partir des besoins des acheteurs, organiser les producteurs et accompagner les décisions de culture. Notre devise résume cette logique : vendre avant de produire.",
    sections: [
      { title: "Un problème concret, un point de départ ciblé", body: "Des débouchés incertains, une offre fragmentée et une connectivité limitée compliquent la commercialisation agricole. Le projet démarre avec cinq GIC des Hautes Terres du Cameroun, autour de la pomme de terre et des cultures maraîchères. Ce périmètre pilote sert à affiner le modèle avant une expansion envisagée en Afrique centrale." },
      { title: "Une infrastructure qui relie plusieurs besoins", body: "La proposition associe coordination des acheteurs, intelligence agronomique, SMS et organisation des GIC. AfribaPay fournit des API de paiement couvrant 16 pays africains. Cette couverture du partenaire ne signifie pas que Si-Tcha opère déjà dans ces 16 pays. MINADER accompagne les démarches liées aux programmes agricoles." },
      { title: "Un développement guidé par les résultats", body: "Les priorités de mesure sont les engagements d'achat, les marges nettes des agriculteurs, les pertes après récolte et l'accès au conseil. Le pilote doit permettre de documenter ces indicateurs et d'affiner le modèle. Les investisseurs peuvent échanger avec l'équipe sur la méthode de suivi et les éléments disponibles pour évaluer le projet." },
      { title: "Ouvrir une discussion de financement", body: "Contactez l'équipe pour examiner le stade du projet, le modèle économique, les besoins de financement et les documents disponibles. Une discussion permet de distinguer les services opérationnels, les intégrations en cours et les objectifs de développement." },
    ], cta: "Demander un échange avec l'équipe",
  },
  {
    path: "/en/investors/", alternate: "/fr/investisseurs/", lang: "en",
    title: "Invest in Cameroon agritech — Si-Tcha AI",
    description: "Explore Si-Tcha AI's buyer coordination, SMS advice and five-GIC pilot in Cameroon. Contact the team to discuss the project and investment opportunities.",
    heading: "Investors: connect planned production with an identified market.",
    intro: "Si-Tcha AI is developing agricultural coordination in Cameroon: start with buyer needs, organize producers and support growing decisions. Our motto captures the approach: sell before you produce.",
    sections: [
      { title: "A concrete problem and a focused entry point", body: "Uncertain market access, fragmented supply and limited connectivity complicate agricultural trade. The project starts with five GICs in Cameroon's Highlands, focused on potatoes and market garden produce. This pilot scope supports learning before a planned expansion across Central Africa." },
      { title: "Infrastructure that connects complementary needs", body: "The proposition links buyer coordination, agronomic intelligence, SMS and GIC organization. AfribaPay provides payment APIs covering 16 African countries. This partner coverage does not mean Si-Tcha already operates in all 16 countries. MINADER supports administrative processes for agricultural programs." },
      { title: "Development guided by evidence", body: "Measurement priorities include buyer commitments, farmer net margins, post-harvest losses and access to advice. The pilot is designed to document these indicators and refine the model. Investors can discuss the monitoring approach and available evidence with the team to evaluate the project." },
      { title: "Start a funding conversation", body: "Contact the team to review the project's stage, business model, financing needs and available documents. A discussion can distinguish operational services, integrations in progress and development objectives." },
    ], cta: "Request a conversation with the team",
  },
  {
    path: "/fr/projet/", alternate: "/en/project/", lang: "fr",
    title: "Le projet Si-Tcha AI — Agritech et GIC au Cameroun",
    description: "Si-Tcha AI SARL : vendre avant de produire. Découvrez le projet camerounais qui relie acheteurs, GIC, conseil agronomique et accès par SMS.",
    heading: "Si-Tcha AI : vendre avant de produire au Cameroun.",
    intro: "Si-Tcha AI SARL est un projet agritech basé à Yaoundé, au Cameroun. Il rapproche les acheteurs, les groupements agricoles et les agronomes pour mieux coordonner les débouchés, la production et l'accompagnement des producteurs.",
    sections: [
      { title: "La terre et les cauris", body: "Notre identité s'appuie sur deux symboles : la terre, d'où provient la richesse agricole, et les cauris, qui ont représenté la richesse et les échanges dans de nombreuses sociétés africaines. Cette identité accompagne une ambition concrète : mieux relier la valeur produite dans les champs aux marchés." },
      { title: "Une approche conçue pour l'accès rural", body: "Le projet associe coordination commerciale, données satellitaires, modèles prédictifs et conseil par SMS. Il accompagne également l'organisation des groupements en GIC afin de faciliter leur participation aux marchés formels et aux programmes agricoles, selon leurs critères d'éligibilité." },
      { title: "Un écosystème de partenaires", body: "L'écosystème présenté par Si-Tcha comprend AU-CIEFFA, LeTexto pour la communication par SMS, AfribaPay pour les API de paiement et MINADER pour l'accompagnement administratif lié aux programmes agricoles. Les rôles et modalités de mise en œuvre peuvent être précisés auprès de l'équipe." },
      { title: "Contacter les responsables du projet", body: "Pour une collaboration, une demande presse ou des informations sur l'équipe et les documents de l'entreprise, écrivez à contact@si-tcha.com ou appelez le +237 670 463 484. Basée à Yaoundé, l'équipe accueille les échanges avec les acteurs agricoles, les partenaires techniques et les investisseurs." },
    ], cta: "Contacter Si-Tcha AI",
  },
  {
    path: "/en/project/", alternate: "/fr/projet/", lang: "en",
    title: "About Si-Tcha AI — Agritech and farming groups in Cameroon",
    description: "Si-Tcha AI SARL: sell before you produce. Discover the Cameroon project connecting buyers, farming groups, agronomic advice and SMS access.",
    heading: "Si-Tcha AI: sell before you produce in Cameroon.",
    intro: "Si-Tcha AI SARL is an agritech project based in Yaoundé, Cameroon. It connects buyers, farming groups and agronomists to coordinate market access, production and support for farmers.",
    sections: [
      { title: "Earth and cowries", body: "Our identity draws on two symbols: the earth as the source of agricultural wealth, and cowries, which represented wealth and exchange in many African societies. They express a practical ambition: better connect the value produced in the fields with markets." },
      { title: "Designed for rural access", body: "The project combines market coordination, satellite data, predictive models and SMS advice. It also supports farming groups in organizing as GICs to facilitate participation in formal markets and agricultural programs, subject to their eligibility requirements." },
      { title: "A partner ecosystem", body: "Si-Tcha's presented ecosystem includes AU-CIEFFA, LeTexto for SMS communication, AfribaPay for payment APIs and MINADER for administrative support related to agricultural programs. Contact the team to clarify partner roles and implementation arrangements." },
      { title: "Contact the project team", body: "For collaboration, press enquiries or information about the team and company documents, write to contact@si-tcha.com or call +237 670 463 484. Based in Yaoundé, the team welcomes discussions with agricultural organizations, technical partners and investors." },
    ], cta: "Contact Si-Tcha AI",
  },
  {
    path: "/fr/pilote/", alternate: "/en/pilot/", lang: "fr",
    title: "Pilote agricole — Cinq GIC au Cameroun | Si-Tcha AI",
    description: "Découvrez le périmètre du pilote Si-Tcha AI : cinq GIC des Hautes Terres du Cameroun, pomme de terre, maraîchage et coordination des débouchés.",
    heading: "Un pilote avec cinq GIC dans les Hautes Terres du Cameroun.",
    intro: "Le pilote de Si-Tcha AI constitue le point de départ du projet. Son périmètre associe cinq Groupements d'Initiative Commune sélectionnés, avec une attention portée à la pomme de terre et aux cultures maraîchères.",
    sections: [
      { title: "Ce que nous cherchons à apprendre", body: "Le pilote doit aider à comprendre comment rapprocher la demande des acheteurs et les plans de production, rendre les conseils agronomiques accessibles et renforcer l'organisation des groupements. Les enseignements guideront l'évolution du modèle et les prochaines zones de développement." },
      { title: "Comment documenter les résultats", body: "Les indicateurs prioritaires sont les engagements d'achat, les marges nettes des producteurs, les pertes après récolte et l'accès au conseil. Une publication de résultats devra préciser la période, l'échantillon, la méthode et les limites des observations. Cette page présente le périmètre du pilote, pas une étude d'impact achevée." },
      { title: "Démonstration et données terrain", body: "Le tableau de bord interactif de l'accueil illustre l'expérience envisagée pour un agriculteur. Les montants, températures, indicateurs de végétation et alertes y sont simulés ; ils ne constituent pas des données terrain en temps réel. Contactez l'équipe pour demander les informations et documents disponibles sur le pilote." },
    ], cta: "Échanger sur le pilote",
  },
  {
    path: "/en/pilot/", alternate: "/fr/pilote/", lang: "en",
    title: "Cameroon farming pilot — Five GICs | Si-Tcha AI",
    description: "Explore the scope of Si-Tcha AI's five-GIC pilot in Cameroon's Highlands, focused on potatoes, market garden produce and buyer coordination.",
    heading: "A pilot with five GICs in Cameroon's Highlands.",
    intro: "Si-Tcha AI's pilot is the project's starting point. It involves five selected Common Initiative Groups, with a focus on potatoes and market garden produce.",
    sections: [
      { title: "What we aim to learn", body: "The pilot helps explore how to connect buyer demand with production plans, make agronomic advice accessible and strengthen farming group organization. Learning will guide the model's development and future expansion areas." },
      { title: "How to document results", body: "Priority indicators include buyer commitments, farmer net margins, post-harvest losses and access to advice. Published results should specify the period, sample, method and limitations. This page describes the pilot scope, not a completed impact evaluation." },
      { title: "Demonstration versus field data", body: "The interactive homepage dashboard illustrates the intended farmer experience. Its balances, temperatures, vegetation indicators and alerts are simulated; they are not live field data. Contact the team to request available pilot information and supporting documents." },
    ], cta: "Discuss the pilot",
  },
];
