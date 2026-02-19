import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import { ScanLine, CheckCircle, AlertCircle, ShoppingCart, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ID único para el div del escáner
const QR_SCANNER_ID = "qr-reader";

export default function PanelCajero() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [scanner, setScanner] = useState(null);
    const lastQRRef = useRef(null); // 👈 Guardará el último QR escaneado

    // Inicia el escáner solo una vez
    useEffect(() => {
        if (!scanner) {
            const newScanner = new Html5QrcodeScanner(
                QR_SCANNER_ID,
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false
            );

            newScanner.render(handleScanResult, handleScanError);
            setScanner(newScanner);
        }

        // Limpieza al salir
        return () => {
            if (scanner) {
                scanner.clear().catch(err => console.error("Fallo al limpiar el escáner", err));
                setScanner(null);
            }
        };
    }, []);

    // ✅ Se ejecuta solo con un QR nuevo
    const handleScanResult = (decodedText) => {
        // Si ya se está procesando o es el mismo QR que el anterior, lo ignoramos
        if (loading || decodedText === lastQRRef.current) return;

        lastQRRef.current = decodedText; // Guardamos el último QR detectado
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Si el QR es JSON (antiguo formato)
            let documentoCliente = decodedText.trim();
            if (decodedText.startsWith('{')) {
                try {
                    const parsed = JSON.parse(decodedText);
                    documentoCliente = parsed.documento || parsed.numero_documento || '';
                } catch (e) {
                    console.warn("QR no es JSON válido");
                }
            }

            if (!/^\d+$/.test(documentoCliente)) {
                throw new Error("El QR no contiene un número de documento válido.");
            }

            procesarCompra(documentoCliente);
        } catch (err) {
            console.error("Error al procesar QR:", err);
            setError("QR inválido o dañado. Escanee de nuevo.");
            setLoading(false);
        }
    };

    const handleScanError = (errorMsg) => {
        if (!errorMsg.includes("QR code no longer") && !errorMsg.includes("not found")) {
            console.warn("Error de escáner:", errorMsg);
        }
    };

    // Procesa la factura
    const procesarCompra = async (documentoCliente) => {
        const facturaSimulada = {
            numero_factura: `FAC-${Math.floor(Math.random() * 90000) + 10000}`,
            nit_empresa: "900.123.456-7",
            total_factura: Math.floor(Math.random() * 40000) + 5000,
            metodo_pago: "Tarjeta Débito"
        };

        try {
            const tokenCajero = localStorage.getItem('accessToken');
            if (!tokenCajero) {
                navigate('/login');
                return;
            }

            const res = await fetch("http://127.0.0.1:8000/api/procesar-factura/", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${tokenCajero}` },
                body: JSON.stringify({
                    numero_documento_cliente: documentoCliente,
                    factura_json: facturaSimulada
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al procesar la factura.");
            setSuccess(`✅ ${data.mensaje} (+${data.puntos_ganados} pts)`);
        } catch (err) {
            setError(err.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
                setSuccess('');
                setError('');
                lastQRRef.current = null; // 👈 Permite volver a leer el mismo QR si se repite más tarde
            }, 5000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#001C63] to-[#150063] flex flex-col">
            <Header pageTitle="Panel de Cajera" />

            <main className="flex-1 w-full max-w-md mx-auto p-4 pb-24">

                {/* Tarjeta de Escáner */}
                <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] p-2.5 rounded-xl">
                            <ShoppingCart className="text-white" size={24} />
                        </div>
                        <h3 className="text-[#001C63] font-bold text-lg">Registrar Venta</h3>
                    </div>

                    {/* Escáner */}
                    <div id={QR_SCANNER_ID} className="w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-inner" />
                </div>

                {/* Estado */}
                <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 min-h-[150px] flex items-center justify-center">
                    <AnimatePresence>
                        {loading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                                <Activity className="w-12 h-12 mx-auto text-blue-500 animate-spin mb-2" />
                                <p className="text-lg font-medium text-blue-600">Procesando...</p>
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
                                <p className="text-sm text-gray-500">Listo para el próximo cliente...</p>
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
                            <p className="font-semibold">Apunte el QR del cliente a la cámara</p>
                            <p className="text-sm">La venta se registrará automáticamente.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
