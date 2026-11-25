export type EnquirySource =
  | "contact"
  | "quote-dialog"
  | "destination"
  | "africa"
  | "journey-planner"
  | "groups-mice"
  | "franchise"
  | "corporate-partnership"
  | "other";

export type EnquiryInput = {
  source: EnquirySource;
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  service?: string;
  destination?: string;
  message?: string;
  fields?: Record<string, string | number | boolean | string[] | null | undefined>;
};
