export interface Rental {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  address: string;
  bed: string;
  wifi: string;
  price: string;
  currency: string;
  coordinates: [number, number];
}
