import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resultado, setResultado] = useState(null); // 🔹 nuevo estado para mostrar respuesta

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documento, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setResultado({ tipo: "ok", mensaje: data.message });
      } else {
        setResultado({ tipo: "error", mensaje: data.message });
      }
    } catch (error) {
      setResultado({ tipo: "error", mensaje: "No se pudo conectar con el servidor 😢" });
      console.error(error);
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
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
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
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 active:bg-indigo-800 transition duration-200 shadow-lg hover:shadow-xl"
            >
              Ingresar
            </button>
          </form>

          {/* 🔹 Resultado visual */}
          {resultado && (
            <div
              className={`mt-6 p-3 rounded-lg text-center font-medium ${
                resultado.tipo === "ok"
                  ? "bg-green-100 text-green-800 border border-green-400"
                  : "bg-red-100 text-red-800 border border-red-400"
              }`}
            >
              {resultado.mensaje}
            </div>
          )}

          {/* Olvidaste tu contraseña */}
          <div className="text-center mt-4">
            <button
              onClick={() => console.log('Recuperar contraseña')}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        {/* Footer opcional */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2025 Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
