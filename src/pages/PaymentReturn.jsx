import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { getPaymentStatus } from "../lib/paymentApi.js";

/**
 * Handles the redirect back from PayMongo after GCash / Maya payment.
 * Route: /payment/success?booking=<id>
 *        /payment/failed?booking=<id>
 */
export default function PaymentReturn({ outcome }) {
  const [searchParams]  = useSearchParams();
  const navigate        = useNavigate();
  const bookingId       = searchParams.get("booking");

  const [status, setStatus]   = useState("loading"); // loading | confirmed | pending | failed
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!bookingId) {
      setStatus("failed");
      return;
    }

    // If PayMongo returned "failed", no need to poll
    if (outcome === "failed") {
      setStatus("failed");
      return;
    }

    // Poll the backend a few times — webhook may arrive slightly after redirect
    let tries = 0;
    const maxTries = 6;

    async function poll() {
      try {
        const data = await getPaymentStatus(bookingId);
        setAttempts((a) => a + 1);

        if (data.paid || data.status === "Confirmed") {
          setStatus("confirmed");
          return;
        }

        tries++;
        if (tries < maxTries) {
          setTimeout(poll, 2000); // retry every 2 s
        } else {
          // Webhook may still be on its way — show a soft "pending" state
          setStatus("pending");
        }
      } catch {
        setStatus("failed");
      }
    }

    poll();
  }, [bookingId, outcome]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">

        {/* Loading */}
        {status === "loading" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying your payment…</h2>
            <p className="text-sm text-gray-500">Please wait. This only takes a few seconds.</p>
          </>
        )}

        {/* Success */}
        {status === "confirmed" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-4xl">✅</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Confirmed!</h2>
            <p className="text-gray-600 mb-1">
              Your reservation fee has been received.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Your booking is now <span className="font-semibold text-green-600">Confirmed</span>. Check your dashboard for details.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/dashboard/bookings"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
              >
                View My Bookings
              </Link>
              <Link to="/resort" className="text-sm text-gray-500 hover:text-gray-700">
                Back to Resort
              </Link>
            </div>
          </>
        )}

        {/* Pending (webhook delayed) */}
        {status === "pending" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-4xl">⏳</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Processing</h2>
            <p className="text-gray-600 mb-1">
              We received your payment but confirmation is still processing.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Your booking will be updated to <span className="font-semibold">Confirmed</span> within a few minutes. Check your dashboard shortly.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/dashboard/bookings"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
              >
                Go to My Bookings
              </Link>
              <Link to="/resort" className="text-sm text-gray-500 hover:text-gray-700">
                Back to Resort
              </Link>
            </div>
          </>
        )}

        {/* Failed */}
        {status === "failed" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-4xl">❌</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">
              Your payment was not completed. Your booking slot has been held for a short time — please try again.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/resort?book=1"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
              >
                Try Again
              </Link>
              <Link to="/resort" className="text-sm text-gray-500 hover:text-gray-700">
                Back to Resort
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
