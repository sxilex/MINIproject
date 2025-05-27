export interface TicketData {
  price: number;
  quantity: number;
  userTicketLimit: number;
  ticketCategory: TicketCategory;
}

export interface EventRequestBody {
  title: string;
  description: string;
  location: string;
  quota: number;
  type: "PAID" | "FREE";
  tickets: TicketData[];
}

export interface ReviewData {
  text: string;
  eventId: string;
  userId: string;
}

export type TicketCategory = `NORMAL` | `ABNORMAL` | `ANOMALY`;
