const SHIPROCKET_BASE = "https://apiv2.shiprocket.in/v1/external";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }
  const email = process.env["SHIPROCKET_EMAIL"];
  const password = process.env["SHIPROCKET_PASSWORD"];
  if (!email || !password) {
    throw new Error("SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD must be set");
  }
  const res = await fetch(`${SHIPROCKET_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shiprocket auth failed: ${res.status} ${text}`);
  }
  const data = (await res.json()) as { token: string };
  cachedToken = {
    token: data.token,
    expiresAt: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days
  };
  return data.token;
}

export interface ShiprocketOrderAddress {
  name: string;
  phone: string;
  address: string;
  address_2?: string;
  city: string;
  state: string;
  pin: string;
  country: string;
}

export interface ShiprocketOrderItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number; // in INR (rupees)
}

export async function createShiprocketOrder(params: {
  orderId: string; // our order id for reference
  channel: string;
  billingCustomerName: string;
  billingAddress: string;
  billingAddress2?: string;
  billingCity: string;
  billingState: string;
  billingPincode: string;
  billingCountry: string;
  billingPhone: string;
  shippingCustomerName: string;
  shippingAddress: string;
  shippingAddress2?: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  shippingCountry: string;
  shippingPhone: string;
  orderItems: ShiprocketOrderItem[];
  paymentMethod: string;
  subTotal: number; // INR
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
}): Promise<{ order_id: number; shipment_id: number; status: number; status_label: string }> {
  const token = await getToken();
  const res = await fetch(`${SHIPROCKET_BASE}/orders/create/adhoc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      order_id: params.orderId,
      channel: params.channel ?? "Moonzy",
      billing_customer_name: params.billingCustomerName,
      billing_address: params.billingAddress,
      billing_address_2: params.billingAddress2 ?? "",
      billing_city: params.billingCity,
      billing_state: params.billingState,
      billing_pincode: params.billingPincode,
      billing_country: params.billingCountry,
      billing_phone: params.billingPhone,
      shipping_customer_name: params.shippingCustomerName,
      shipping_address: params.shippingAddress,
      shipping_address_2: params.shippingAddress2 ?? "",
      shipping_city: params.shippingCity,
      shipping_state: params.shippingState,
      shipping_pincode: params.shippingPincode,
      shipping_country: params.shippingCountry,
      shipping_phone: params.shippingPhone,
      order_items: params.orderItems,
      payment_method: params.paymentMethod ?? "Prepaid",
      sub_total: params.subTotal,
      length: params.length ?? 10,
      width: params.width ?? 10,
      height: params.height ?? 10,
      weight: params.weight ?? 0.5,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shiprocket create order failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<{
    order_id: number;
    shipment_id: number;
    status: number;
    status_label: string;
  }>;
}

export async function getShiprocketOrderByOrderId(
  ourOrderId: string
): Promise<{ order_id: number; shipment_id: number; awb_code: string | null; courier_name: string | null } | null> {
  const token = await getToken();
  const res = await fetch(
    `${SHIPROCKET_BASE}/orders?order_id=${encodeURIComponent(ourOrderId)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { data: { orders: unknown[] } };
  const orders = data.data?.orders;
  if (!Array.isArray(orders) || orders.length === 0) return null;
  const o = orders[0] as { id: number; shipment_id: number; awb_code: string | null; courier_name: string | null };
  return {
    order_id: o.id,
    shipment_id: o.shipment_id,
    awb_code: o.awb_code ?? null,
    courier_name: o.courier_name ?? null,
  };
}
