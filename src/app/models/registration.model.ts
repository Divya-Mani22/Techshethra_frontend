export interface Registration {
  id?: number;

  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;

  member2?: string;
  member3?: string;
  member4?: string;

  paymentMode: string;
  transactionId: string;
  paymentStatus: string;
}
