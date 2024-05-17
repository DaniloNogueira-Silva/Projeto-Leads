import { LeadSchema } from "../schema/lead.schema";

export const LeadProviders = [
  {
    provide: 'LEAD_MODEL',
    useFactory: (connection) => connection.model('Lead', LeadSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];