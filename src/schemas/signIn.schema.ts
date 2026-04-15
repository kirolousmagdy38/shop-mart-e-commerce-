import * as zod from "zod";

export const SignInSchema = zod.object({
  email: zod.string().trim().email("Invalid email address"),

  password: zod
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/\d/, "Must include a number")
    .regex(/[@$!%*?&]/, "Must include a special character"),
});

export type signInSchemaType = zod.infer<typeof SignInSchema>;
