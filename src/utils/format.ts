export type RatingLevel = "high" | "medium" | "low";

// Classifica a nota (0–10) para colorir o selo do card
export function getRatingLevel(nota: number): RatingLevel {
  if (nota >= 8) return "high";
  if (nota >= 5) return "medium";
  return "low";
}

// Formata a nota com uma casa decimal no padrão brasileiro: 8.5 -> "8,5"
export function formatRating(nota: number) {
  return nota.toFixed(1).replace(".", ",");
}
