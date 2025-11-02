// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Importante para navegar
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [numero_documento, setNumeroDocumento] = useState(''); // Estado para el documento
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Estados para manejar el login
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hook para navegar
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero_documento: numero_documento, // Asegúrate que el backend espera 'numero_documento'
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Si las credenciales son inválidas
        throw new Error(data.detail || "Credenciales inválidas.");
      }

      // --- ✅ ¡LOGIN EXITOSO! ---
      // 1. Guardamos todo en localStorage
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      // 2. 👇 ¡¡ESTA ES LA LÍNEA QUE TE FALTA!!
      // Redirigimos a la ruta '/home' (en minúscula)
      navigate('/home');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo o título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
            <p className="text-gray-500 mt-2">Ingresa a tu cuenta</p>
          </div>

          {/* Mensaje de Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-100 border border-red-200 rounded-xl flex items-center gap-3 shadow-md text-red-700"
              >
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de documento */}
            <div>
              <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-2">
                No. de Documento
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="documento"
                  type="text"
                  value={numero_documento}
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Ingresa tu documento"
                  required
                />
              </div>
            </div>

            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón de ingreso */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 active:bg-indigo-800 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>

            {/* Link a Registro */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/register')} // Te lleva a registro
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                ¿No tienes una cuenta? Regístrate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}