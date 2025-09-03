// config/env.js
const { z } = require('zod');

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3000),
  CORS_ORIGIN: z.string().optional(),   // fine to be undefined in dev
  MONGO_URI: z.string()
    .url()
    .or(z.string().startsWith('mongodb://')),
  OPENAI_API_KEY: z.string().optional(), // used later in NL→SQL epic
  NODE_ENV: z.string().default('development'),
});

function loadEnv() {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  return parsed.data;
}

module.exports = { loadEnv };
