// US state NEC (NFPA 70) adoption — real statewide-adoption data.
// Source: JADE Learning NEC adoption tracker (a recognised NEC CE provider),
// reflecting statewide adoption. Local AHJs and major cities (e.g. Chicago, NYC)
// may enforce a different edition — always confirm with your local inspector.
export interface State {
  name: string;
  abbr: string;
  slug: string;
  nec: string; // adopted edition, or "No statewide"
}

function s(name: string, abbr: string, nec: string): State {
  return { name, abbr, slug: name.toLowerCase().replace(/\s+/g, "-"), nec };
}

export const US_STATES: State[] = [
  s("Alabama", "AL", "2020"),
  s("Alaska", "AK", "2020"),
  s("Arizona", "AZ", "2017"),
  s("Arkansas", "AR", "2020"),
  s("California", "CA", "2020"),
  s("Colorado", "CO", "2023"),
  s("Connecticut", "CT", "2020"),
  s("Delaware", "DE", "2020"),
  s("Florida", "FL", "2020"),
  s("Georgia", "GA", "2023"),
  s("Hawaii", "HI", "2023"),
  s("Idaho", "ID", "2023"),
  s("Illinois", "IL", "2020"),
  s("Indiana", "IN", "2017"),
  s("Iowa", "IA", "2023"),
  s("Kansas", "KS", "2017"),
  s("Kentucky", "KY", "2023"),
  s("Louisiana", "LA", "2020"),
  s("Maine", "ME", "2023"),
  s("Maryland", "MD", "2020"),
  s("Massachusetts", "MA", "2023"),
  s("Michigan", "MI", "2023"),
  s("Minnesota", "MN", "2023"),
  s("Mississippi", "MS", "No statewide"),
  s("Missouri", "MO", "No statewide"),
  s("Montana", "MT", "2020"),
  s("Nebraska", "NE", "2023"),
  s("Nevada", "NV", "2017"),
  s("New Hampshire", "NH", "2020"),
  s("New Jersey", "NJ", "2020"),
  s("New Mexico", "NM", "2020"),
  s("New York", "NY", "2017"),
  s("North Carolina", "NC", "2023"),
  s("North Dakota", "ND", "2023"),
  s("Ohio", "OH", "2023"),
  s("Oklahoma", "OK", "2023"),
  s("Oregon", "OR", "2023"),
  s("Pennsylvania", "PA", "2017"),
  s("Rhode Island", "RI", "2020"),
  s("South Carolina", "SC", "2020"),
  s("South Dakota", "SD", "2023"),
  s("Tennessee", "TN", "2017"),
  s("Texas", "TX", "2023"),
  s("Utah", "UT", "2020"),
  s("Vermont", "VT", "2020"),
  s("Virginia", "VA", "2020"),
  s("Washington", "WA", "2023"),
  s("West Virginia", "WV", "2020"),
  s("Wisconsin", "WI", "2017"),
  s("Wyoming", "WY", "2023"),
];

export function getState(slug: string): State | undefined {
  return US_STATES.find((x) => x.slug === slug);
}
