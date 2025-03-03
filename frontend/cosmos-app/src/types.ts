export interface Customer {
  id: number;
  name: string;
  email: string;
  address?: string;
}

export interface CustomerPayload {
  name: string;
  email: string;
  address?: string;
}
