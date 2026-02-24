export type CartItem = {
  productId: string;
  quantity: number;
};

const STORAGE_KEY = "moonzy_cart_v1";
const CART_UPDATED_EVENT = "moonzy_cart_updated";

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.floor(quantity));
}

function readRaw(): unknown {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function sanitize(items: unknown): CartItem[] {
  if (!Array.isArray(items)) return [];

  const map = new Map<string, number>();
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const productId = (item as { productId?: unknown }).productId;
    const quantity = (item as { quantity?: unknown }).quantity;
    if (typeof productId !== "string" || !productId) continue;
    const q = normalizeQuantity(typeof quantity === "number" ? quantity : Number(quantity));
    map.set(productId, (map.get(productId) ?? 0) + q);
  }

  return Array.from(map.entries()).map(([productId, quantity]) => ({
    productId,
    quantity,
  }));
}

export function getCart(): CartItem[] {
  return sanitize(readRaw());
}

export function setCart(items: CartItem[]) {
  if (!isBrowser()) return;
  try {
    const sanitized = sanitize(items);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  } catch {
    // ignore write failures (private mode / quota)
  }
}

export function addToCart(productId: string, quantity: number) {
  const q = normalizeQuantity(quantity);
  const current = getCart();
  const next = current.map((item) =>
    item.productId === productId ? { ...item, quantity: item.quantity + q } : item,
  );

  if (!next.some((i) => i.productId === productId)) {
    next.push({ productId, quantity: q });
  }

  setCart(next);
  return next;
}

export function updateCartItemQuantity(productId: string, quantity: number) {
  const q = Math.max(0, Math.floor(quantity));
  const current = getCart();
  const next =
    q <= 0
      ? current.filter((i) => i.productId !== productId)
      : current.map((i) => (i.productId === productId ? { ...i, quantity: q } : i));
  setCart(next);
  return next;
}

export function removeFromCart(productId: string) {
  const next = getCart().filter((i) => i.productId !== productId);
  setCart(next);
  return next;
}

export function clearCart() {
  setCart([]);
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function subscribeToCartChanges(onChange: () => void) {
  if (!isBrowser()) return () => {};

  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };

  window.addEventListener(CART_UPDATED_EVENT, onChange);
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(CART_UPDATED_EVENT, onChange);
    window.removeEventListener("storage", storageHandler);
  };
}

