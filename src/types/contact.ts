export interface ContactInput {
  name: string;
  email: string;
  message: string;
  company: string;
}

export type ContactField = Exclude<keyof ContactInput, 'company'>;

export type ContactErrorCode = 'required' | 'invalidEmail' | 'tooShort' | 'tooLong';

export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';
