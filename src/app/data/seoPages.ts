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
    "path": "/fr/agriculteurs-gic/",
    "alternate": "/en/farmers-groups/",
    "lang": "fr",
    "title": "Agriculteurs et GIC au Cameroun — Si-Tcha AI",
    "description": "Un pilote construit avec les agricultrices pour rapprocher production, conseil et débouchés.",
    "heading": "Agriculteurs et GIC : préparez la prochaine saison.",
    "intro": "Un pilote construit avec les agricultrices pour rapprocher production, conseil et débouchés.",
    "sections": [
      {
        "title": "Le terrain d’abord",
        "body": "Un GIC de 10 agricultrices a rejoint le programme de test dans le département des Hauts-Plateaux. Le premier diagnostic est réalisé."
      },
      {
        "title": "Des outils accessibles",
        "body": "L’application hors ligne, les SMS et le suivi satellite sont en développement. Les retours des agricultrices orientent leur conception."
      },
      {
        "title": "Le prochain objectif",
        "body": "Étendre le pilote à 3 GIC et 30 agricultrices, former les groupes et préparer les premières ventes groupées."
      }
    ],
    "cta": "Présenter mon GIC"
  },
  {
    "path": "/en/farmers-groups/",
    "alternate": "/fr/agriculteurs-gic/",
    "lang": "en",
    "title": "Farmers and GICs in Cameroon — Si-Tcha AI",
    "description": "A pilot built with women farmers to connect production, advice and market access.",
    "heading": "Farmers and groups: plan your next season.",
    "intro": "A pilot built with women farmers to connect production, advice and market access.",
    "sections": [
      {
        "title": "Fieldwork first",
        "body": "One GIC of 10 women farmers has joined the test program in the Hauts-Plateaux department. The initial diagnosis is complete."
      },
      {
        "title": "Accessible tools",
        "body": "The offline-first app, SMS and satellite monitoring are in development. Farmer feedback guides their design."
      },
      {
        "title": "The next goal",
        "body": "Extend the pilot to 3 GICs and 30 women farmers, train groups and prepare the first collective sales."
      }
    ],
    "cta": "Introduce my group"
  },
  {
    "path": "/fr/acheteurs/",
    "alternate": "/en/buyers/",
    "lang": "fr",
    "title": "Acheteurs agricoles au Cameroun — Si-Tcha AI",
    "description": "Exprimez vos besoins avant les semis pour construire des relations directes avec les groupements agricoles.",
    "heading": "Acheteurs : anticipez vos approvisionnements.",
    "intro": "Exprimez vos besoins avant les semis pour construire des relations directes avec les groupements agricoles.",
    "sections": [
      {
        "title": "Votre demande",
        "body": "Partagez les cultures, volumes, critères de qualité et dates de livraison recherchés."
      },
      {
        "title": "Des échanges en cours",
        "body": "Des supermarchés et hôtels examinent le projet. Les premiers contrats pré-récolte restent à formaliser."
      },
      {
        "title": "Construire le premier accord",
        "body": "Échangeons sur les capacités du pilote, les conditions commerciales et les responsabilités de chaque partie."
      }
    ],
    "cta": "Partager mes besoins"
  },
  {
    "path": "/en/buyers/",
    "alternate": "/fr/acheteurs/",
    "lang": "en",
    "title": "Agricultural buyers in Cameroon — Si-Tcha AI",
    "description": "Share your needs before planting to build direct relationships with farming groups.",
    "heading": "Buyers: plan your supply earlier.",
    "intro": "Share your needs before planting to build direct relationships with farming groups.",
    "sections": [
      {
        "title": "Your requirements",
        "body": "Tell us your crops, volumes, quality standards and delivery dates."
      },
      {
        "title": "Discussions underway",
        "body": "Supermarkets and hotels are reviewing the project. The first pre-harvest contracts remain to be formalized."
      },
      {
        "title": "Build the first agreement",
        "body": "Discuss pilot capacity, commercial terms and each party’s responsibilities with the team."
      }
    ],
    "cta": "Share my requirements"
  },
  {
    "path": "/fr/agronomes/",
    "alternate": "/en/agronomists/",
    "lang": "fr",
    "title": "Agronomes et suivi des cultures — Si-Tcha AI",
    "description": "Associez expertise locale, observations de parcelles et données satellitaires.",
    "heading": "Agronomes : rapprochez le conseil du terrain.",
    "intro": "Associez expertise locale, observations de parcelles et données satellitaires.",
    "sections": [
      {
        "title": "Partir du diagnostic",
        "body": "Un premier diagnostic a été réalisé avec le GIC de 10 agricultrices du programme de test."
      },
      {
        "title": "Concevoir des conseils utiles",
        "body": "Les intégrations satellite et SMS sont en cours pour préparer un suivi accessible sur téléphone basique."
      },
      {
        "title": "Accompagner le pilote",
        "body": "Contribuez aux protocoles de suivi et à la formation des groupes. Le dashboard du site présente des données simulées."
      }
    ],
    "cta": "Proposer mon expertise"
  },
  {
    "path": "/en/agronomists/",
    "alternate": "/fr/agronomes/",
    "lang": "en",
    "title": "Agronomists and crop monitoring — Si-Tcha AI",
    "description": "Combine local expertise, plot observations and satellite data.",
    "heading": "Agronomists: bring advice closer to the field.",
    "intro": "Combine local expertise, plot observations and satellite data.",
    "sections": [
      {
        "title": "Start with diagnosis",
        "body": "An initial diagnosis has been completed with the test program’s GIC of 10 women farmers."
      },
      {
        "title": "Design useful advice",
        "body": "Satellite and SMS integrations are underway to prepare monitoring accessible on basic phones."
      },
      {
        "title": "Support the pilot",
        "body": "Contribute monitoring protocols and group training. The website dashboard uses simulated data."
      }
    ],
    "cta": "Contribute expertise"
  },
  {
    "path": "/fr/investisseurs/",
    "alternate": "/en/investors/",
    "lang": "fr",
    "title": "Investir dans l’agritech au Cameroun — Si-Tcha AI",
    "description": "Si-Tcha AI développe une agriculture connectée et entrepreneuriale, portée par les femmes rurales.",
    "heading": "Investir dans l’avenir des agricultrices.",
    "intro": "Si-Tcha AI développe une agriculture connectée et entrepreneuriale, portée par les femmes rurales.",
    "sections": [
      {
        "title": "Une première validation terrain",
        "body": "1 GIC et 10 agricultrices inscrites au programme de test. Diagnostic initial réalisé ; objectif de lancement : 3 GIC et 30 agricultrices."
      },
      {
        "title": "Un produit en développement",
        "body": "Maquette de l’application finalisée ; architecture hors ligne et intégrations SMS et satellite en cours."
      },
      {
        "title": "Les prochains jalons",
        "body": "Finaliser l’application, former les groupes, formaliser les premiers contrats d’achat pré-récolte et obtenir les premiers financements des GIC."
      }
    ],
    "cta": "Échanger avec l’équipe"
  },
  {
    "path": "/en/investors/",
    "alternate": "/fr/investisseurs/",
    "lang": "en",
    "title": "Invest in Cameroon agritech — Si-Tcha AI",
    "description": "Si-Tcha AI is developing connected, entrepreneurial agriculture led by rural women.",
    "heading": "Back the next generation of women farmers.",
    "intro": "Si-Tcha AI is developing connected, entrepreneurial agriculture led by rural women.",
    "sections": [
      {
        "title": "Initial field validation",
        "body": "1 GIC and 10 women farmers enrolled in testing. Initial diagnosis completed; launch target: 3 GICs and 30 women farmers."
      },
      {
        "title": "A product in development",
        "body": "App design completed; offline-first architecture and SMS and satellite integrations underway."
      },
      {
        "title": "The next milestones",
        "body": "Complete the app, train groups, formalize the first pre-harvest purchase contracts and secure initial GIC funding."
      }
    ],
    "cta": "Talk to the team"
  },
  {
    "path": "/fr/projet/",
    "alternate": "/en/project/",
    "lang": "fr",
    "title": "Le projet Si-Tcha AI — Agritech au Cameroun",
    "description": "Basée à Yaoundé, Si-Tcha AI rapproche agricultrices, acheteurs et agronomes. Notre devise : vendre avant de produire.",
    "heading": "Si-Tcha AI : nos racines nourrissent le futur.",
    "intro": "Basée à Yaoundé, Si-Tcha AI rapproche agricultrices, acheteurs et agronomes. Notre devise : vendre avant de produire.",
    "sections": [
      {
        "title": "Notre vision",
        "body": "Faire de l’agriculture au Cameroun un métier d’avenir, connecté et industrialisé, porté par les femmes rurales et la rigueur entrepreneuriale."
      },
      {
        "title": "Une équipe pluridisciplinaire",
        "body": "Sandra Mbeukou Lengue porte le produit et le développement, avec Loïc Kenmoe Mbeukem en agriculture de précision, Yves Seraphin Menzepoh et Murielle Nahomy Kombou Komga en design."
      },
      {
        "title": "Nos appuis",
        "body": "AU-CIEFFA accompagne le projet ; LeTexto, AfribaPay et MINADER apportent leurs expertises en SMS, paiements et programmes agricoles."
      }
    ],
    "cta": "Nous contacter"
  },
  {
    "path": "/en/project/",
    "alternate": "/fr/projet/",
    "lang": "en",
    "title": "About Si-Tcha AI — Cameroon agritech",
    "description": "Based in Yaoundé, Si-Tcha AI brings women farmers, buyers and agronomists together. Our motto: sell before you produce.",
    "heading": "Si-Tcha AI: our roots nourish the future.",
    "intro": "Based in Yaoundé, Si-Tcha AI brings women farmers, buyers and agronomists together. Our motto: sell before you produce.",
    "sections": [
      {
        "title": "Our vision",
        "body": "Make agriculture in Cameroon a connected, industrialized career of the future, driven by rural women and entrepreneurial discipline."
      },
      {
        "title": "An interdisciplinary team",
        "body": "Sandra Mbeukou Lengue leads product and development, with Loïc Kenmoe Mbeukem in precision agriculture, and Yves Seraphin Menzepoh and Murielle Nahomy Kombou Komga in design."
      },
      {
        "title": "Our ecosystem",
        "body": "AU-CIEFFA supports the project; LeTexto, AfribaPay and MINADER contribute expertise in SMS, payments and agricultural programs."
      }
    ],
    "cta": "Contact us"
  },
  {
    "path": "/fr/pilote/",
    "alternate": "/en/pilot/",
    "lang": "fr",
    "title": "Pilote agricole et agricultrices au Cameroun — Si-Tcha AI",
    "description": "Le programme de test démarre avec 1 GIC de 10 agricultrices dans le département des Hauts-Plateaux.",
    "heading": "Du terrain au premier déploiement.",
    "intro": "Le programme de test démarre avec 1 GIC de 10 agricultrices dans le département des Hauts-Plateaux.",
    "sections": [
      {
        "title": "Réalisé",
        "body": "Un groupement enrôlé et un premier diagnostic terrain. La maquette de l’application est finalisée."
      },
      {
        "title": "En cours",
        "body": "Développement de l’application, intégrations SMS et satellite, échanges avec des supermarchés et hôtels."
      },
      {
        "title": "Objectif de lancement",
        "body": "3 GIC et 30 agricultrices. Former les groupes, conclure une première vente groupée et accompagner les premières demandes de financement."
      }
    ],
    "cta": "Participer au pilote"
  },
  {
    "path": "/en/pilot/",
    "alternate": "/fr/pilote/",
    "lang": "en",
    "title": "Cameroon women farmers pilot — Si-Tcha AI",
    "description": "Testing starts with 1 GIC of 10 women farmers in Cameroon’s Hauts-Plateaux department.",
    "heading": "From fieldwork to the first deployment.",
    "intro": "Testing starts with 1 GIC of 10 women farmers in Cameroon’s Hauts-Plateaux department.",
    "sections": [
      {
        "title": "Completed",
        "body": "One group enrolled and an initial field diagnosis completed. The app design is finalized."
      },
      {
        "title": "Underway",
        "body": "App development, SMS and satellite integrations, and discussions with supermarkets and hotels."
      },
      {
        "title": "Launch target",
        "body": "3 GICs and 30 women farmers. Train groups, complete the first collective sale and support initial funding applications."
      }
    ],
    "cta": "Join the pilot"
  }
];
