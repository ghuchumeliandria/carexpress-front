const ENTRIES = [
  {
    term: 'Well Maintained — Regular Oil Changes',
    body:
      'Identified as having a regular oil change history when all recommended changes, based on the vehicle\'s maintenance schedule, have been reported. Manufacturer schedule and normal driving conditions are assumed.',
  },
  {
    term: 'Damage Indicator',
    body:
      'Damage can be the result of contact with objects (other cars, debris), vandalism, or weather events. Not every damage event is reported. We recommend an inspection by a qualified mechanic.',
  },
  {
    term: 'Damage Severity',
    body:
      'Minor: cosmetic, may require reconditioning. Moderate: may affect multiple components and impair operation. Severe: likely compromises operation and safety.',
  },
  {
    term: 'First Owner',
    body: 'When the first owner obtains a title from the DMV as proof of ownership.',
  },
  {
    term: 'Manufacturer Recall',
    body:
      'Recall notices inform owners of safety defects or failure to meet federal safety/emissions standards. Manufacturer recalls are repaired at no cost to the customer.',
  },
  {
    term: 'Salvage Title',
    body:
      'Issued when damage exceeds approximately 75% of pre-damage value (varies by state). Some states use Salvage to indicate stolen vehicles.',
  },
  {
    term: 'Title Issued',
    body:
      'A state issues a title to provide proof of ownership. Each title or registration record does not necessarily indicate a change in ownership.',
  },
];

export function Glossary() {
  return (
    <div className="space-y-3">
      {ENTRIES.map((e) => (
        <details key={e.term} className="group rounded-md border bg-white px-4 py-3">
          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 group-open:text-brand-600">
            {e.term}
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{e.body}</p>
        </details>
      ))}
    </div>
  );
}
