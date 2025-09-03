import z from "zod";

export const signInSchema = z.object({
  name: z.string().nonempty("Pole wymagane"),
  password: z.string().nonempty("Pole wymagane"),
});
