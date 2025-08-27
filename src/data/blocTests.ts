export interface BLOCTestDefinition {
  id: string;
  naam: string;
  categorie: string;
  instructie: string;
  videoUrl?: string;
  afbeelding?: string;
}

export interface BLOCTestResult {
  testId: string;
  timestamp: Date;
  scores: {
    achterwaarts_balanceren?: {
      balk3cm: number[];
      balk45cm: number[];
      balk6cm: number[];
    };
    zijwaarts_verplaatsen?: {
      poging1: number;
      poging2: number;
    };
    zijwaarts_springen?: {
      poging1: number;
      poging2: number;
    };
    oog_hand_coordinatie?: {
      poging1: number;
      poging2: number;
    };
  };
}

export const blocTesten: BLOCTestDefinition[] = [
  {
    id: 'achterwaarts_balanceren',
    naam: 'Achterwaarts Balanceren',
    categorie: 'Evenwicht',
    instructie: `Opstelling:
• Drie evenwichtsbalken (3 cm, 4.5 cm, 6 cm breed)
• Elk 300 cm lang met zachte mat aan uiteinde

Uitvoering:
• Oefen eerst voorwaarts tot eerste plankje
• Draai om en loop achterwaarts terug
• Per balk 3 pogingen
• Tel vanaf eerste stap tweede voet
• Maximum 8 stappen per poging

Let op: Uitvoeren op blote voeten`,
    videoUrl: 'https://www.youtube.com/embed/BJjwEpX_O-k?start=21',
    afbeelding: '/images/achterwaarts-balanceren.jpg'
  },
  {
    id: 'zijwaarts_verplaatsen',
    naam: 'Zijwaarts Verplaatsen (Stapverplaatsing)',
    categorie: 'Coördinatie',
    instructie: `Materiaal:
• Twee vierkante plankjes (25 × 25 × 4 cm)
• Op pootjes met anti-slip onderzijde

Uitvoering:
• Verplaats plankje zijwaarts
• Stap erop
• Verplaats andere plankje
• Herhaal als stepping-stone beweging
• 2 pogingen van elk 20 seconden

Score: Tel aantal correcte verplaatsingen`,
    videoUrl: 'https://www.youtube.com/embed/aXfN9QZEdLY',
    afbeelding: '/images/zijwaarts-verplaatsen.jpg'
  },
  {
    id: 'zijwaarts_springen',
    naam: 'Zijwaarts Heen en Weer Springen',
    categorie: 'Behendigheid',
    instructie: `Materiaal:
• Balkje op zachte balanceermat
• Ongeveer 60 × 3 cm

Uitvoering:
• Spring zijwaarts heen en weer over balkje
• 2 pogingen van elk 15 seconden
• Met beide benen tegelijk springen
• Landen met beide voeten

Score: Tel aantal correcte sprongen`,
    videoUrl: 'https://www.youtube.com/embed/GBxzEflmpGk',
    afbeelding: '/images/zijwaarts-springen.jpg'
  },
  {
    id: 'oog_hand_coordinatie',
    naam: 'Oog-Handcoördinatie (Bal tegen Muur)',
    categorie: 'Coördinatie',
    instructie: `Materiaal:
• Drie tennisballen
• Rechthoek op muur (152 × 137 cm)
• Afzetlijn op 2 meter afstand

Uitvoering (30 seconden):
• Gooi de bal tegen de muur
• Vang de bal voordat deze stuitert
• Blijf achter de lijn
• Gooi binnen het gemarkeerde vlak
• Tel het aantal correct gevangen ballen

Score: Aantal correct gevangen ballen per poging`,
    videoUrl: 'https://www.youtube.com/embed/OHcR_jHfnnU?start=1',
    afbeelding: '/images/oog-hand-coordinatie.jpg'
  }
];