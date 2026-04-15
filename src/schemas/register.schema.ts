import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),

    email: zod.string().trim().email("Invalid email address"),

    phone: zod.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),

    password: zod
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/\d/, "Must include a number")
      .regex(/[@$!%*?&]/, "Must include a special character"),

    rePassword: zod
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type registerSchemaType = zod.infer<typeof registerSchema>;
