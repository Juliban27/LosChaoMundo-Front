import React, { useState } from "react";
import { X, CheckCircle2, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";

export default function RedeemModal({ show, onClose, userPoints = 1000, cost = 200 }) {
    const [step, setStep] = useState("confirm"); // confirm | qr | success
    const [points, setPoints] = useState(userPoints);

    const handleRedeem = () => {
        setStep("qr");
        // Simular escaneo exitoso tras 3 segundos
        setTimeout(() => {
            setPoints((prev) => prev - cost);
            setStep("success");
        }, 3000);
    };

    const resetModal = () => {
        setStep("confirm");
        onClose();
    };

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Fondo oscuro */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black"
                        onClick={resetModal}
                    />

                    {/* Contenido del modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 flex items-center justify-center p-4 z-10"
                    >
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-blue-100 text-gray-700">
                            {/* Botón de cierre */}
                            <button
                                onClick={resetModal}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                            >
                                <X size={22} />
                            </button>

                            {/* Etapa 1: Confirmación */}
                            {step === "confirm" && (
                                <motion.div
                                    key="confirm"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <h2 className="text-xl font-semibold text-blue-700 mb-3 text-center">
                                        🎁 Redimir producto
                                    </h2>
                                    <p className="text-justify leading-relaxed">
                                        Este producto cuesta <strong>{cost}</strong> puntos Garzas.
                                        Actualmente tienes <strong>{points}</strong> puntos.
                                        ¿Deseas continuar con la redención?
                                    </p>
                                    <div className="mt-5 flex justify-center gap-3">
                                        <button
                                            onClick={resetModal}
                                            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleRedeem}
                                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Redimir
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Etapa 2: Generando QR */}
                            {step === "qr" && (
                                <motion.div
                                    key="qr"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center"
                                >
                                    <h2 className="text-lg font-semibold text-blue-700 mb-3">
                                        Escanea el código QR
                                    </h2>
                                    <div className="bg-white p-3 rounded-xl shadow-inner">
                                        <QRCode value="redencion-puntos-garzas" size={160} />
                                    </div>
                                    <p className="mt-3 text-gray-500 text-sm text-center">
                                        Esperando confirmación del escaneo...
                                    </p>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                        className="mt-4 text-blue-500"
                                    >
                                        <QrCode size={28} />
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Etapa 3: Éxito */}
                            {step === "success" && (
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <CheckCircle2 size={60} className="text-green-500 mb-3" />
                                    <h2 className="text-xl font-semibold text-green-600">
                                        ¡Redención exitosa!
                                    </h2>
                                    <p className="mt-2 text-gray-600">
                                        Se han descontado <strong>{cost}</strong> puntos de tu cuenta.
                                    </p>
                                    <p className="text-gray-500 mt-1 text-sm">
                                        Nuevo saldo: <strong>{points}</strong> puntos
                                    </p>
                                    <button
                                        onClick={resetModal}
                                        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Cerrar
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
