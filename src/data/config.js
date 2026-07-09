// ─────────────────────────────────────────────────────────────────
// Caswells Group — Warehouse Induction Training
// Config: all content, branding, and settings in one place
// ─────────────────────────────────────────────────────────────────

export const BRAND = {
  primary:   '#08488D',
  secondary: '#EC1C24',
  accent:    '#53BF96',
  navy:      '#1F3864',
  lightGrey: '#F5F6F8',
  midGrey:   '#8A9BB0',
  white:     '#FFFFFF',
  logo: 'https://www.caswellsgroup.com/Content/Images/CG-full-colour-logo-RGB.svg',
};

export const FLOW_URL = 'https://default7dc2103ac96a41759933d23f7fa9ad.9a.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/11/workflows/b1219ae80f74499385fb4949ba17002b/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pKdT69HvxGrsgaAcJ0lAFrau3Z4MHks6J7teWiwuJdQ';

export const RA_LINKS = {
  billingham:   'https://caswellsgroup.sharepoint.com/sites/CaswellsQHSEHub/Documents%20%20Warehouse%20Activities/01%20Risk%20Assessment/CAS03_Rev5.pdf',
  macclesfield: 'https://caswellsgroup.sharepoint.com/sites/CaswellsQHSEHub/Documents%20%20Warehouse%20Activities/01%20Risk%20Assessment/Cutlers/CUT03_Rev4.pdf',
};

// ── Assessment questions ──────────────────────────────────────────
export const QUESTIONS_BILLINGHAM = [
  {
    q: 'What PPE must be worn at all times in the warehouse?',
    options: ['Hard hat and gloves', 'Hi-Vis clothing and safety footwear', 'Safety glasses only', 'No PPE required'],
    correct: 1,
  },
  {
    q: 'What should you do if you notice racking damage?',
    options: ['Leave it — someone else will report it', 'Try to repair it yourself', 'Report it to a manager immediately', 'Put extra stock in the damaged bay to stabilise it'],
    correct: 2,
  },
  {
    q: 'What is the wrist rule?',
    options: [
      'Never lift more than you can hold at wrist height',
      'Anything above your wrist height requires using the blue steps',
      'Wrist guards must be worn at all times',
      'Always bend your wrists when lifting',
    ],
    correct: 1,
  },
  {
    q: 'When picking from Level 3 or above, what must you use?',
    options: ['The blue steps', 'A ladder', 'A reach truck operated by an authorised person', 'Your own judgement based on the load size'],
    correct: 2,
  },
  {
    q: 'Which direction must you always cut when using a safety knife?',
    options: ['Towards your body for control', 'Away from your body', 'Downward only', 'Direction does not matter if you use a safety knife'],
    correct: 1,
  },
  {
    q: 'When must you wrap products before putting them back at height?',
    options: ['Only if they are fragile', 'Never — wrapping is optional', 'Any products above Level 2', 'Only on the mezzanine floor'],
    correct: 2,
  },
  {
    q: 'What must you do when using the stairs to the mezzanine?',
    options: [
      'Walk quickly to reduce time at height',
      'Carry as much as possible in one trip',
      'Maintain three points of contact and hold the handrail at all times',
      'Only use the stairs when the pallet lift is busy',
    ],
    correct: 2,
  },
  {
    q: 'When should accidents and near misses be reported?',
    options: ['At the end of the shift', 'Only if someone is injured', 'Immediately', 'Only if it happens twice'],
    correct: 2,
  },
  {
    q: 'After picking the last item from a box or pallet, what must you do?',
    options: [
      'Leave the empty box in the location',
      'Remove it from the location and place it in the bin',
      'Ask a manager what to do',
      'Put it on the floor next to the racking',
    ],
    correct: 1,
  },
  {
    q: 'Before operating any MHE, what must you complete?',
    options: ['A manual handling assessment', 'A pre-operation check', 'A risk assessment form', 'A toolbox talk'],
    correct: 1,
  },
];

export const QUESTIONS_MACCLESFIELD = QUESTIONS_BILLINGHAM.filter((_, i) => i !== 6);

// ── Section content ───────────────────────────────────────────────
export const SECTIONS = [
  {
    id: 'hs-awareness',
    number: 1,
    title: 'Health & Safety Awareness',
    icon: '🦺',
    intro: 'Before you start picking or putting away, you must understand the key health and safety rules that apply in the warehouse. These apply to both Billingham and Macclesfield.',
    points: [
      { heading: 'PPE', text: 'Hi-Vis clothing and safety footwear must be worn at all times in the warehouse. Additional PPE may be required when handling specific products — check the COSHH assessment if unsure.' },
      { heading: 'Situational awareness', text: 'You must be aware of your surroundings at all times — including moving MHE such as reach trucks, counterbalance trucks, and pump trucks. Always make eye contact with an operator before crossing an aisle end.' },
      { heading: 'Follow trained methods', text: 'You must follow the methods you have been shown. Do not improvise or take shortcuts.' },
      { heading: 'MHE pre-operation check', text: 'A pre-operation check must be completed on all MHE before use. If you find a defect, report it to your manager and take the equipment out of service.' },
      { heading: 'Never climb the racking', text: 'Under no circumstances should you climb the racking. Use the steps, reach truck, or counterbalance to access stock at height.' },
      { heading: 'Report racking damage', text: 'If you see any racking damage, misalignment, or instability — report it to a manager immediately. Do not use a damaged bay.' },
      { heading: 'Accidents and near misses', text: 'All accidents and near misses must be reported immediately using the incident reporting system. Do not wait until the end of your shift.' },
    ],
  },
  {
    id: 'incident-reporting',
    number: 2,
    title: 'Incident Reporting',
    icon: '📋',
    intro: 'If anything goes wrong — or nearly goes wrong — you must report it straight away. This applies to accidents, injuries, near misses, unsafe conditions, and property damage.',
    points: [
      { heading: 'How to report', text: 'Reports are made using the Microsoft Forms links below. You can also report verbally to your manager, who will complete the form on your behalf if needed.' },
      { heading: 'What counts as a near miss', text: 'A near miss is any event that did not cause injury or damage but could have done. Reporting near misses is just as important as reporting accidents — they help us prevent future incidents.' },
      { heading: 'No blame culture', text: 'Caswells operates a no-blame reporting culture. The purpose of incident reporting is to learn and improve, not to assign blame.' },
      { heading: 'RIDDOR', text: 'Certain injuries must be reported to the HSE under RIDDOR. Your manager and the QHSE Representative will handle this — your job is simply to report promptly.' },
    ],
    reportingLinks: [
      { label: 'Report an Incident (Accident, Injury, Near Miss, Unsafe Condition)', url: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=OhDCfWrJdUGZM9I_f6mtmjYaKB-AedJFpW5p97gXbYlURUIyR09NMUlRWklCV0JXTU5ZUzU3TjBTOS4u', colour: '#EC1C24' },
    ],
  },
  {
    id: 'low-level',
    number: 3,
    title: 'Picking & Putting Away — Low Level',
    icon: '📦',
    intro: 'Low level picking covers stock at ground level and the first shelf level, accessible without steps or MHE.',
    points: [
      { heading: 'Check your route', text: 'Before picking, check for obstructions on your route — loose cardboard, empty pallets, or other stock left in the aisle.' },
      { heading: 'Manual handling', text: 'Follow your manual handling training at all times. Bend your knees, keep the load close to your body, and turn with your feet — never twist your back.' },
      { heading: 'Pick a level at a time', text: 'Pick from one level at a time. Do not pick from the front of the pallet only — this can make the pallet unstable and cause goods to fall.' },
      { heading: 'Safety knives', text: 'Use the safety knives provided to remove excess wrap or cardboard. Always cut away from your body. Inspect the knife for damage before use.' },
      { heading: 'Clear the location', text: 'Remove any unwanted cardboard or wrap from the location after picking. Keep aisles clear at all times.' },
      { heading: 'Empty boxes', text: 'If you pick the last item from a box, remove the empty box from the location and place it in the bin.' },
    ],
    videos: [
      {
        label: '❌ Incorrect knife technique',
        embedId: 'AE3ZEDj8rjU',
        style: 'incorrect',
        caption: 'What NOT to do — cutting towards the body',
      },
      {
        label: '✅ Correct knife technique',
        embedId: 'EtJ9fsxOMEk',
        style: 'correct',
        caption: 'Correct method — always cut away from the body',
      },
    ],
  },
  {
    id: 'mid-level',
    number: 4,
    title: 'Picking & Putting Away — Mid Level',
    icon: '🪜',
    intro: 'Mid level covers shelf levels above ground where stock cannot be reached without the blue steps.',
    points: [
      { heading: 'The wrist rule', text: 'If the stock is above your wrist height, you must use the blue steps provided. Inspect the steps for damage or contamination before use.' },
      { heading: 'Never overstretch', text: 'Never overstretch. If stock is beyond your reach even from the steps, it must be lowered using a Reach Truck by an authorised operator.' },
      { heading: 'Pick a level at a time', text: 'Pick from one level at a time to maintain pallet integrity.' },
      { heading: 'Wrap before putting back', text: 'Any products above Level 2 must be wrapped and stable before being put back at height. This prevents goods falling on people below.' },
      { heading: 'Clear the location', text: 'Remove any unwanted cardboard or wrap from the location or pallet after picking.' },
      { heading: 'Empty boxes', text: 'If you pick the last item from a pallet or box, remove it and place in the bin.' },
    ],
    images: [
      { src: '/images/blue-steps.jpeg', alt: 'Blue steps in position in the warehouse', caption: 'The blue steps — always inspect before use', badge: null },
      { src: '/images/wrist-rule-ok.jpeg', alt: 'Correct wrist rule — stock at or below wrist height', caption: '✅ Wrist at or above stock height — no steps needed', badge: 'correct' },
      { src: '/images/wrist-rule-too-high.jpeg', alt: 'Stock above wrist height — steps required', caption: '⚠️ Stock above wrist height — blue steps required', badge: 'warning' },
    ],
  },
  {
    id: 'high-level',
    number: 5,
    title: 'Picking & Putting Away — High Level (Level 3+)',
    icon: '🏗️',
    intro: 'High level covers Level 3 and above, where a powered truck must be used to lower the pallet. This requires a trained and authorised operator.',
    points: [
      { heading: 'Always use a truck', text: 'Level 3 and above requires a reach truck or counterbalance to lower the full pallet. You must be trained and authorised to operate the truck. Exception: low racking where Level 3 can be safely reached from the blue steps provided.' },
      { heading: 'Forklift training', text: 'You must follow your forklift or reach truck training at all times. Do not operate MHE you are not authorised to use.' },
      { heading: 'Pick a level at a time', text: 'Pick from one level at a time to keep the pallet stable.' },
      { heading: 'Wrap before putting back', text: 'All products must be stacked and wrapped safely before being put back at height. The load must be stable before you raise it.' },
      { heading: 'Clear the location', text: 'Remove any unwanted cardboard or wrap from the pallet or slot after picking.' },
      { heading: 'Empty boxes', text: 'If you pick the last item from a box, remove it from the location and place in the bin.' },
    ],
    images: [
      { src: '/images/pallet-wrap-comparison.jpeg', alt: 'Left pallet correctly wrapped, right pallet unwrapped', caption: 'Left: correctly wrapped ✅  —  Right: unwrapped ❌ (not acceptable above Level 2)', badge: null },
    ],
  },
  {
    id: 'mezzanine',
    number: 6,
    title: 'Top Floor / Mezzanine',
    icon: '🏢',
    billinghamOnly: true,
    intro: 'The mezzanine floor at Billingham is accessed by stairs and a pallet lift. This session applies to Billingham operatives only.',
    points: [
      { heading: 'Three points of contact', text: 'You must maintain three points of contact when using the stairs at all times, and hold the handrail. Never carry a load that prevents you from using the handrail.' },
      { heading: 'Use the pallet lift', text: 'When picking or putting away large or heavy products to/from the mezzanine floor, you must use the pallet loading/unloading lift. Do not carry large loads up or down the stairs.' },
      { heading: 'Clear the location', text: 'Remove any unwanted cardboard or wrap from the pallet or slot after picking.' },
      { heading: 'Empty boxes', text: 'If you pick the last item from a box, remove it and place in the bin.' },
      { heading: 'Report issues', text: 'Report any issues on the mezzanine to your manager immediately.' },
    ],
    images: [
      { src: '/images/pallet-lift-1.jpeg', alt: 'Pallet lift at mezzanine level', caption: 'The pallet lift — use this for large or heavy products to/from the mezzanine', badge: null },
      { src: '/images/pallet-lift-2.jpeg', alt: 'Pallet lift gate', caption: 'Ensure the gate is closed and secured before operating', badge: null },
    ],
  },
];
