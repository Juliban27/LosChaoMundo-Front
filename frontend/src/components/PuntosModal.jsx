import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CashbackModal({ show, onClose }) {
    return (
        <AnimatePresence>
            {show && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 flex items-center justify-center p-4 z-10"
                    >
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-blue-100 text-gray-700">
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                            >
                                <X size={22} />
                            </button>

                            <h2 className="text-xl font-semibold text-blue-700 mb-3 text-center">
                                💙 Puntos Garzas
                            </h2>
                            <p className="text-justify leading-relaxed">
                                Los <strong>puntos Garzas</strong> son un sistema de{" "}
                                <em>cashback</em> en el cual, por cada compra que hagas y
                                factures electrónicamente, podrás recibir el{" "}
                                <strong>1% del valor total</strong> de la operación. Con estos
                                puntos podrás reclamar{" "}
                                <strong>recompensas especiales</strong> en la tienda que
                                prefieras.
                            </p>
                            <div className="mt-5 flex justify-center">
                                <button
                                    onClick={onClose}
                                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Entendido
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}