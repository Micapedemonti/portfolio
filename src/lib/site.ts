/** Datos personales y enlaces. Único lugar donde se editan. */
export const site = {
  name: 'Micaela Pedemonti',
  role: 'Full stack',
  city: 'Viña del Mar',
  timeZone: 'America/Santiago',
  email: 'micapedemonti7@gmail.com',
  // TODO: completar. Los que queden en null no se muestran.
  socials: {
    github: null as string | null,
    linkedin: 'https://www.linkedin.com/in/micapedemonti' as string | null,
  },
} as const;
