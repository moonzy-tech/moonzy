const getBase = () => process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type ApiOptions = Omit<RequestInit, "body"> & { body?: unknown };

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, ...rest } = options;
  const res = await fetch(`${getBase()}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(rest.headers as Record<string, string>),
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

export type User = {
  _id: string;
  email: string;
  name?: string;
  picture?: string;
  role: string;
};

export type Dashboard = {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  paidOrders: number;
  productCount: number;
  customerCount: number;
  revenueByStatus: { _id: string; total: number; count: number }[];
  recentOrders: RecentOrder[];
};

export type RecentOrder = {
  _id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  userId?: { email?: string; name?: string };
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  imageUrl?: string;
  images?: string[];
  sku?: string;
  stock: number;
  isActive: boolean;
  sortOrder: number;
};

export type Order = {
  _id: string;
  orderNumber: string;
  userId: { _id: string; email?: string; name?: string };
  items: { productId: string; name: string; quantity: number; price: number }[];
  subtotal: number;
  shippingAmount: number;
  taxAmount: number;
  total: number;
  shippingAddress: Address;
  status: string;
  createdAt: string;
};

export type Address = {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export type Customer = {
  _id: string;
  email: string;
  name?: string;
  picture?: string;
  createdAt: string;
  orderCount?: number;
  totalSpent?: number;
  orders?: Order[];
};

export type Shipment = {
  _id: string;
  orderId: { _id: string; orderNumber?: string };
  shiprocketOrderId?: string;
  awbCode?: string;
  courierName?: string;
  status: string;
  trackingUrl?: string;
  createdAt: string;
};
