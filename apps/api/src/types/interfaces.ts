export interface TicketData {
  price: number;
  quantity: number;
  userTicketLimit: number;
  ticketCategory: TicketCategory;
}

export interface EventRequestBody {
  title: string;
  image: string;
  description: string;
  location: string;
  quota: number;
  startedDate: Date;
  startedTime: string;
  type: "PAID" | "FREE";
  tickets: TicketData[];
}

export interface ReviewData {
  text: string;
  eventId: string;
  userId: string;
}

export type TicketCategory = `REGULAR` | `VIP` | `DIAMOND`;
