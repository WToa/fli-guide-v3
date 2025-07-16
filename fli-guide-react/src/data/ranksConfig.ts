const ranks = [
   { id: "fledgling", label: "Fledgling" },
   { id: "apprentice", label: "Apprentice" },
   { id: "adept", label: "Adept" },
   { id: "expert", label: "Expert" },
   { id: "master", label: "Master" },
   { id: "hero", label: "Hero" },
] as const;

export default ranks;
export type Rank = (typeof ranks)[number]["id"];
