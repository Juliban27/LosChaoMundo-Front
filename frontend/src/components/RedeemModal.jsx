import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import {
  ScanLine,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PanelCajero() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [ultimoQR, setUltimoQR] = useState(null);

  const qrRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  // ==========================
  //  INICIALIZAR ESCÁNER
  // ==========================
  useEffect(() => {
    const qrRegionId = "qr-reader";

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
    }

    const startScanner = async () => {
      try {
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          onScanSuccess,
          onScanError
        );
      } catch (err) {
        console.error("Error iniciando cámara:", err);
        setError("No se pudo acceder a la cámara.");
      }
    };

    startScanner();

    // Limpieza al desmontar
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current.clear())
          .catch(() => {});
      }
    };
  }, []);

  // ==========================
  //  CALLBACKS DE ESCANEO
  // ==========================
  const onScanSuccess = (decodedText) => {
    if (loading || decodedText === ultimoQR) return;
    setUltimoQR(decodedText);
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = JSON.parse(decodedText);
      if (!data.documento)
        throw new Error("QR sin campo 'documento' válido.");
      procesarCompra(data.documento);
    } catch (err) {
      console.error("Error al leer QR:", err);
      setError("Código QR inválido o dañado.");
      setLoading(false);
    }
  };

  const onScanError = (errMsg) => {
    if (errMsg.includes("not found")) return;
    console.warn("Error de escaneo:", errMsg);
  };

  // ==========================
  //  PROCESAR FACTURA
  // ==========================
  const procesarCompra = async (documentoCliente) => {
    const facturaSimulada = {
      numero_factura: `FAC-${Math.floor(Math.random() * 90000) + 10000}`,
      nit_empresa: "900123456-7",
      total_factura: Math.floor(Math.random() * 40000) + 5000,
      metodo_pago: "Tarjeta Débito",
    };

    try {
      const tokenCajero =
        localStorage.getItem("access") || localStorage.getItem("accessToken");
      if (!tokenCajero) {
        setError("Sesión no válida. Inicia sesión nuevamente.");
        return;
      }

      const res = await fetch(
        "http://127.0.0.1:8000/api/procesar_factura_automatica/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenCajero}`,
          },
          body: JSON.stringify({
            numero_documento_cliente: documentoCliente,
            factura_json: facturaSimulada,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Error al procesar la factura.");

      setSuccess(
        `✅ ${data.mensaje} (+${data.puntos_ganados} pts acumulados)`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setSuccess("");
        setError("");
        setUltimoQR(null); // Permitir otro escaneo
      }, 5000);
    }
  };

  // ==========================
  //  RENDER
  // ==========================
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001C63] to-[#150063] flex flex-col">
      <Header pageTitle="Panel de Cajero" />

      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-24">
        {/* Tarjeta Escáner */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] p-2.5 rounded-xl">
              <ShoppingCart className="text-white" size={24} />
            </div>
            <h3 className="text-[#001C63] font-bold text-lg">
              Registrar Venta
            </h3>
          </div>

          {/* Vista de cámara */}
          <div
            id="qr-reader"
            ref={qrRef}
            className="w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-inner"
          />
        </div>

        {/* Estado del proceso */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 min-h-[150px] flex items-center justify-center">
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <Activity className="w-12 h-12 mx-auto text-blue-500 animate-spin mb-2" />
                <p className="text-lg font-medium text-blue-600">
                  Procesando...
                </p>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-2" />
                <p className="font-semibold text-green-700">{success}</p>
                <p className="text-sm text-gray-500">
                  Listo para el próximo cliente...
                </p>
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-2" />
                <p className="font-semibold text-red-700">{error}</p>
                <p className="text-sm text-gray-500">Escanee de nuevo.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && !success && !error && (
            <div className="text-center text-gray-500">
              <ScanLine className="w-12 h-12 mx-auto mb-2" />
              <p className="font-semibold">
                Apunte el QR del cliente a la cámara
              </p>
              <p className="text-sm">La venta se registrará automáticamente.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}