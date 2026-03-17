// src/lib/paymentApi.js
import { api } from "./api";

/**
 * Creates a PayMongo GCash or Maya source for a booking.
 * Returns { checkout_url, source_id }
 *
 * @param {number} bookingId  - the booking's database ID
 * @param {'gcash'|'paymaya'} type
 */
export async function createPaymentSource(bookingId, type) {
  const res = await api.post("/api/payments/source", {
    booking_id: bookingId,
    type,
  });
  return res.data;
}

/**
 * Polls the payment status of a booking.
 * Returns { booking_id, status, paid, paid_at, payment_method }
 *
 * @param {number} bookingId
 */
export async function getPaymentStatus(bookingId) {
  const res = await api.get(`/api/payments/status/${bookingId}`);
  return res.data;
}
