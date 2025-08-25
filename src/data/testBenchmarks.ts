export interface Benchmark {
  min: number;
  max: number;
  label: string;
  color: string;
}

export interface TestDefinition {
  id: string;
  naam: string;
  categorie: string;
  eenheid: string;
  instructie: string;
  afbeelding?: string;
  benchmarks: {
    man: Benchmark[];
    vrouw: Benchmark[];
  };
}

export const fysiekeTesten: TestDefinition[] = [
  {
    id: 'lenigheid',
    naam: 'Lenigheid (Sit-and-Reach)',
    categorie: 'Flexibiliteit',
    eenheid: 'cm',
    instructie: `Meetlint-matje-tape(lijn):
• Voeten maximaal 25 cm uit elkaar
• Hielen tegen de tape
• 25 cm is 0 punt (kruising tape – meetlint)
• Noteer het aantal cm`,
    afbeelding: '/images/lenigheid.jpg',
    benchmarks: {
      man: [
        { min: 27, max: Infinity, label: 'Uitstekend', color: '#10b981' },
        { min: 17, max: 27, label: 'Erg goed', color: '#34d399' },
        { min: 6, max: 16, label: 'Boven gemiddeld', color: '#86efac' },
        { min: 0, max: 5, label: 'Gemiddeld', color: '#fbbf24' },
        { min: -8, max: -1, label: 'Onder gemiddeld', color: '#fb923c' },
        { min: -20, max: -9, label: 'Slecht', color: '#f87171' },
        { min: -Infinity, max: -20, label: 'Erg slecht', color: '#ef4444' }
      ],
      vrouw: [
        { min: 30, max: Infinity, label: 'Uitstekend', color: '#10b981' },
        { min: 21, max: 30, label: 'Erg goed', color: '#34d399' },
        { min: 11, max: 20, label: 'Boven gemiddeld', color: '#86efac' },
        { min: 1, max: 10, label: 'Gemiddeld', color: '#fbbf24' },
        { min: -7, max: 0, label: 'Onder gemiddeld', color: '#fb923c' },
        { min: -15, max: -8, label: 'Slecht', color: '#f87171' },
        { min: -Infinity, max: -15, label: 'Erg slecht', color: '#ef4444' }
      ]
    }
  },
  {
    id: 'uithoudingsvermogen',
    naam: 'Uithoudingsvermogen (Shuttle Run)',
    categorie: 'Conditie',
    eenheid: 'trap',
    instructie: `Pilonnen-audio apparatuur-tape(lijn):
• Pilonnen op 20 meter
• Loop in een rechte lijn
• Met minimaal 1 voet de lijn passeren
• Noteer de trap`,
    afbeelding: undefined,
    benchmarks: {
      man: [
        { min: 13, max: Infinity, label: 'Uitstekend', color: '#10b981' },
        { min: 11, max: 13, label: 'Zeer goed', color: '#34d399' },
        { min: 10, max: 11, label: 'Goed', color: '#86efac' },
        { min: 7, max: 10, label: 'Voldoende', color: '#fbbf24' },
        { min: 6, max: 7, label: 'Matig', color: '#fb923c' },
        { min: -Infinity, max: 6, label: 'Slecht', color: '#ef4444' }
      ],
      vrouw: [
        { min: 12, max: Infinity, label: 'Uitstekend', color: '#10b981' },
        { min: 10, max: 12, label: 'Zeer goed', color: '#34d399' },
        { min: 9, max: 10, label: 'Goed', color: '#86efac' },
        { min: 6, max: 9, label: 'Voldoende', color: '#fbbf24' },
        { min: 5, max: 6, label: 'Matig', color: '#fb923c' },
        { min: -Infinity, max: 5, label: 'Slecht', color: '#ef4444' }
      ]
    }
  },
  {
    id: 'behendigheid',
    naam: 'Behendigheid (T-Test)',
    categorie: 'Coördinatie',
    eenheid: 'seconden',
    instructie: `T-Test setup:
• 4 pilonnen in T-vorm: start/finish, 3 posities op 5m afstand
• Sprint vooruit naar pylon 1 (10m)
• Zijwaarts naar links naar pylon 3 (5m)
• Zijwaarts naar rechts naar pylon 2 (10m)
• Zijwaarts terug naar pylon 1 (5m)
• Achterwaarts terug naar start (10m)
• Noteer de tijd in seconden`,
    afbeelding: '/images/behendigheid.png',
    benchmarks: {
      man: [
        { min: -Infinity, max: 10, label: 'Uitstekend', color: '#10b981' },
        { min: 10, max: 11, label: 'Zeer goed', color: '#34d399' },
        { min: 11, max: 12, label: 'Goed', color: '#86efac' },
        { min: 12, max: 13, label: 'Voldoende', color: '#fbbf24' },
        { min: 13, max: 14, label: 'Matig', color: '#fb923c' },
        { min: 14, max: Infinity, label: 'Slecht', color: '#ef4444' }
      ],
      vrouw: [
        { min: -Infinity, max: 11, label: 'Uitstekend', color: '#10b981' },
        { min: 11, max: 12, label: 'Zeer goed', color: '#34d399' },
        { min: 12, max: 13, label: 'Goed', color: '#86efac' },
        { min: 13, max: 14, label: 'Voldoende', color: '#fbbf24' },
        { min: 14, max: 15, label: 'Matig', color: '#fb923c' },
        { min: 15, max: Infinity, label: 'Slecht', color: '#ef4444' }
      ]
    }
  },
  {
    id: 'kracht',
    naam: 'Kracht (Push-ups)',
    categorie: 'Kracht',
    eenheid: 'repetities',
    instructie: `Push-up test:
• Fitness matje/turnmatje met tennisbal/shuttle
• Handen schouderbreedte uit elkaar
• Zakken tot 90 graden in de ellebogen (neus op de tennisbal/shuttle)
• Uitduwen tot volledig gestrekte ellebogen
• Geen pauze/hersteltijd tussen repetities
• Zoveel mogelijk achtereenvolgende push-ups
• Noteer het totaal aantal push-ups`,
    afbeelding: '/images/kracht.jpg',
    benchmarks: {
      man: [
        { min: 47, max: Infinity, label: 'Uitstekend', color: '#10b981' },
        { min: 39, max: 47, label: 'Goed', color: '#34d399' },
        { min: 30, max: 39, label: 'Boven gemiddeld', color: '#86efac' },
        { min: 17, max: 30, label: 'Gemiddeld', color: '#fbbf24' },
        { min: 10, max: 17, label: 'Onder gemiddeld', color: '#fb923c' },
        { min: 4, max: 10, label: 'Slecht', color: '#f87171' },
        { min: -Infinity, max: 4, label: 'Erg slecht', color: '#ef4444' }
      ],
      vrouw: [
        { min: 35, max: Infinity, label: 'Uitstekend', color: '#10b981' },
        { min: 27, max: 35, label: 'Goed', color: '#34d399' },
        { min: 21, max: 27, label: 'Boven gemiddeld', color: '#86efac' },
        { min: 11, max: 21, label: 'Gemiddeld', color: '#fbbf24' },
        { min: 6, max: 11, label: 'Onder gemiddeld', color: '#fb923c' },
        { min: 2, max: 6, label: 'Slecht', color: '#f87171' },
        { min: -Infinity, max: 2, label: 'Erg slecht', color: '#ef4444' }
      ]
    }
  },
  {
    id: 'snelheid',
    naam: 'Snelheid (Plate Tapping)',
    categorie: 'Snelheid',
    eenheid: 'seconden',
    instructie: `Plate Tapping test:
• Turnkast met schijven op buikhoogte
• Niet-voorkeurshand op het middenvlak
• Voorkeurshand op tikvlak A
• Tikvlakken liggen 80 cm (hart) uit elkaar
• Tikvlak is maximaal 20 cm groot (doorsnee)
• Tik zo snel mogelijk afwisselend tikvlak A en B
• 25x tikvlak A en 25x tikvlak B
• Noteer de totale tijd in seconden`,
    afbeelding: '/images/snelheid.png',
    benchmarks: {
      man: [
        { min: -Infinity, max: 9.1, label: 'Zeer goed', color: '#10b981' },
        { min: 9.11, max: 9.6, label: 'Goed', color: '#34d399' },
        { min: 9.61, max: 10.2, label: 'Gemiddeld', color: '#86efac' },
        { min: 10.21, max: 11.0, label: 'Zwak', color: '#fbbf24' },
        { min: 11.01, max: 11.9, label: 'Zwak', color: '#fb923c' },
        { min: 11.91, max: Infinity, label: 'Zeer zwak', color: '#ef4444' }
      ],
      vrouw: [
        { min: -Infinity, max: 9.7, label: 'Zeer goed', color: '#10b981' },
        { min: 9.71, max: 10.3, label: 'Goed', color: '#34d399' },
        { min: 10.31, max: 11.0, label: 'Gemiddeld', color: '#86efac' },
        { min: 11.01, max: 11.8, label: 'Zwak', color: '#fbbf24' },
        { min: 11.81, max: 12.6, label: 'Zwak', color: '#fb923c' },
        { min: 12.61, max: Infinity, label: 'Zeer zwak', color: '#ef4444' }
      ]
    }
  }
];

export function evalueerScore(
  testId: string, 
  score: number, 
  geslacht: 'man' | 'vrouw'
): { label: string; color: string; feedback: string } {
  const test = fysiekeTesten.find(t => t.id === testId);
  if (!test) return { label: 'Onbekend', color: '#gray', feedback: '' };

  const benchmarks = test.benchmarks[geslacht];
  const benchmark = benchmarks.find(b => score >= b.min && score <= b.max);
  
  if (!benchmark) return { label: 'Onbekend', color: '#gray', feedback: '' };

  const feedbackByTest: Record<string, Record<string, string>> = {
    lenigheid: {
      'Uitstekend': 'Fantastisch! Je flexibiliteit is uitstekend. Blijf dit niveau onderhouden met regelmatige stretching.',
      'Erg goed': 'Zeer goed! Je flexibiliteit is bovengemiddeld. Blijf werken aan het behouden van deze goede conditie.',
      'Zeer goed': 'Zeer goed! Je flexibiliteit is bovengemiddeld. Blijf werken aan het behouden van deze goede conditie.',
      'Boven gemiddeld': 'Goed bezig! Je flexibiliteit is beter dan gemiddeld. Met wat extra stretching kun je nog verder verbeteren.',
      'Gemiddeld': 'Je flexibiliteit is gemiddeld. Overweeg om dagelijks 10-15 minuten te stretchen om te verbeteren.',
      'Onder gemiddeld': 'Je flexibiliteit heeft aandacht nodig. Begin met dagelijkse stretching oefeningen, vooral voor hamstrings en onderrug.',
      'Slecht': 'Je flexibiliteit is beperkt. Het is belangrijk om direct te beginnen met een gestructureerd stretching programma.',
      'Erg slecht': 'Je flexibiliteit vraagt om urgente aandacht. Overweeg begeleiding van een fysiotherapeut of bewegingsdeskundige.'
    },
    uithoudingsvermogen: {
      'Uitstekend': 'Uitstekende conditie! Je uithoudingsvermogen is top. Blijf regelmatig trainen om dit niveau te behouden.',
      'Zeer goed': 'Zeer goede conditie! Je uithoudingsvermogen is prima. Blijf consistent met je cardio training.',
      'Goed': 'Goede conditie! Met wat extra cardio training kun je naar het volgende niveau.',
      'Voldoende': 'Voldoende conditie voor dagelijkse activiteiten. Overweeg 3x per week 30 minuten cardio training.',
      'Matig': 'Je conditie heeft verbetering nodig. Start met korte wandelingen en bouw langzaam op naar intensievere training.',
      'Slecht': 'Je conditie vraagt dringend aandacht. Begin met lichte activiteiten zoals wandelen en bouw geleidelijk op.'
    },
    behendigheid: {
      'Uitstekend': 'Fantastische behendigheid! Je coördinatie en wendbaarheid zijn uitstekend. Blijf dit niveau onderhouden.',
      'Zeer goed': 'Zeer goede behendigheid! Je bent wendbaar en gecoördineerd. Blijf werken met agility training.',
      'Goed': 'Goede behendigheid! Met wat extra coördinatie-oefeningen kun je je wendbaarheid verder verbeteren.',
      'Voldoende': 'Voldoende behendigheid voor dagelijkse activiteiten. Overweeg ladder- en kegeldrill oefeningen.',
      'Matig': 'Je behendigheid heeft aandacht nodig. Begin met eenvoudige coördinatie-oefeningen en agility drills.',
      'Slecht': 'Je behendigheid vraagt om verbetering. Start met basis coördinatie-oefeningen en bouw langzaam op.'
    },
    kracht: {
      'Uitstekend': 'Uitstekende spierkracht! Je bovenlichaam kracht is top niveau. Blijf regelmatig krachttraining doen.',
      'Goed': 'Goede spierkracht! Je hebt een solide basis. Met consistent krachttraining kun je verder groeien.',
      'Boven gemiddeld': 'Boven gemiddelde kracht! Met wat extra push-up variaties kun je naar het volgende niveau.',
      'Gemiddeld': 'Gemiddelde spierkracht. Begin met regelmatige push-ups, 3 sets van 8-12 herhalingen.',
      'Onder gemiddeld': 'Je kracht heeft verbetering nodig. Start met knee push-ups en bouw langzaam op.',
      'Slecht': 'Je spierkracht vraagt aandacht. Begin met wall push-ups en werk naar knee push-ups.',
      'Erg slecht': 'Start met basis krachttraining. Overweeg begeleiding van een trainer voor de juiste technieken.'
    },
    snelheid: {
      'Zeer goed': 'Uitstekende reactiesnelheid! Je hand-oog coördinatie is top. Blijf oefenen met snelheidstraining.',
      'Goed': 'Goede reactiesnelheid! Je coördinatie is prima. Met wat extra drills kun je nog sneller worden.',
      'Gemiddeld': 'Gemiddelde snelheid en coördinatie. Oefen regelmatig met snelle bewegingsoefeningen.',
      'Zwak': 'Je reactiesnelheid heeft verbetering nodig. Begin met langzame, gecontroleerde bewegingen.',
      'Zeer zwak': 'Je snelheid en coördinatie vragen aandacht. Start met basis coördinatie-oefeningen.'
    }
  };

  const feedback = feedbackByTest[testId]?.[benchmark.label] || 
    'Blijf werken aan verbetering van je fysieke conditie.';

  return {
    label: benchmark.label,
    color: benchmark.color,
    feedback
  };
}