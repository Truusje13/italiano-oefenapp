import { z } from "zod";

// Schema voor één les. Elke les staat in een eigen JSON-bestand in src/data/.
export const woordSchema = z.object({
  it: z.string().min(1),
  nl: z.string().min(1),
  voorbeeld: z.string().optional(),
  woordsoort: z.string().optional()
});

export const zinSchema = z.object({
  nl: z.string().min(1),
  it: z.string().min(1)
});

export const invulSchema = z.object({
  // Gebruik ___ in de zin waar het antwoord moet komen
  zin: z.string().min(1).refine((s) => s.includes("___"), {
    message: "Invulzin moet ___ bevatten"
  }),
  antwoord: z.string().min(1)
});

export const luisterSchema = z.object({
  tekst: z.string().min(1),
  audioBestand: z.string().optional(),
  vragen: z.array(
    z.object({
      vraag: z.string().min(1),
      antwoord: z.string().min(1)
    })
  )
});

export const grammaticaSchema = z.object({
  titel: z.string().min(1),
  uitleg: z.string().min(1)
});

export const schrijfSchema = z.object({
  opdracht: z.string().min(1),
  modelantwoord: z.string().min(1)
});

export const meerkeuzeSchema = z.object({
  vraag: z.string().min(1),
  opties: z.array(z.string().min(1)).min(2).max(4),
  antwoord: z.string().min(1),
  uitleg: z.string().optional()
});

export const lesSchema = z.object({
  id: z.number().int().positive(),
  titel: z.string().min(1),
  woorden: z.array(woordSchema),
  zinnen: z.array(zinSchema),
  invuloefeningen: z.array(invulSchema).default([]),
  meerkeuzevragen: z.array(meerkeuzeSchema).default([]),
  grammatica: z.array(grammaticaSchema).default([]),
  luisteroefeningen: z.array(luisterSchema).default([]),
  schrijfopdrachten: z.array(schrijfSchema).default([])
});

export type Les = z.infer<typeof lesSchema>;
export type Woord = z.infer<typeof woordSchema>;
export type Zin = z.infer<typeof zinSchema>;
export type Invul = z.infer<typeof invulSchema>;
