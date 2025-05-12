import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const PORT = process.env.PORT!;
export const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET!;
export const FORWARDED_PORT = process.env.FORWARDED_PORT!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD!
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME!;
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION!;
export const AWS_USER_ACCESS_KEY = process.env.AWS_USER_ACCESS_KEY!;
export const AWS_USER_SECRET_ACCESS_KEY = process.env.AWS_USER_SECRET_ACCESS_KEY!;
export const REIMAGINE_HOME_API_KEY_NAME = process.env.REIMAGINE_HOME_API_KEY_NAME!;
export const REIMAGINE_HOME_API_KEY_ID = process.env.REIMAGINE_HOME_API_KEY_ID!;
