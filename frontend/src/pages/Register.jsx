// frontend/src/pages/Register.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Importa useNavigate
import {
    User,
    Mail,
    Lock,
    CreditCard,
    MapPin,
    Phone,
    Eye,
    EyeOff,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        tipoDocumento: '',
        numeroIdentificacion: '',
        direccion: '',
        telefono: '',
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [loading, setLoading] = useState(false); // 👈 Estado de carga
    const navigate = useNavigate(); // 👈 Hook para navegar

    const tiposDocumento = [
        { value: '', label: 'Selecciona un tipo' },
        { value: 'CC', label: 'Cédula de Ciudadanía' },
        { value: 'CE', label: 'Cédula de Extranjería' },
        { value: 'PA', label: 'Pasaporte' },
        { value: 'TI', label: 'Tarjeta de Identidad' },
        { value: 'NIT', label: 'NIT' },
    ];

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'nombre':
                if (!value.trim()) error = 'El nombre es requerido';
                else if (value.trim().length < 3)
                    error = 'El nombre debe tener al menos 3 caracteres';
                break;
            case 'correo':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) error = 'El correo es requerido';
                else if (!emailRegex.test(value))
                    error = 'Correo electrónico inválido';
                break;
            case 'contrasena':
                if (!value) error = 'La contraseña es requerida';
                else if (value.length < 6)
                    error = 'Debe tener al menos 6 caracteres';
                break;
            case 'tipoDocumento':
                if (!value) error = 'Selecciona un tipo de documento';
                break;
            case 'numeroIdentificacion':
                if (!value.trim()) error = 'El número es requerido';
                else if (!/^\d+$/.test(value.trim()))
                    error = 'Solo se permiten números';
                break;
            case 'direccion':
                if (!value.trim()) error = 'La dirección es requerida';
                break;
            case 'telefono':
                if (!value.trim()) error = 'El teléfono es requerido';
                else if (!/^\d{7,10}$/.test(value.trim()))
                    error = 'Teléfono inválido (7-10 dígitos)';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // ===========================================
    // 👇 HANDLESUBMIT CON MANEJO DE ERRORES 500
    // ===========================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        setSubmitError('');

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);

            // 1. Traduce los campos de React a los de Django
            const jsonData = {
                nombre: formData.nombre,       // 👈 Corregido (nombre, no first_name)
                email: formData.correo,
                password: formData.contrasena,
                tipo_documento: formData.tipoDocumento,
                numero_documento: formData.numeroIdentificacion,
                direccion: formData.direccion,
                telefono: formData.telefono,
            };

            try {
                const res = await fetch("http://127.0.0.1:8000/api/usuarios/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(jsonData),
                });

                // 2. Manejo de errores (JSON y no-JSON)
                if (!res.ok) {
                    try {
                        // Intenta leer el error como JSON (Error 400)
                        const errorData = await res.json();
                        if (errorData.error) {
                            setSubmitError(errorData.error);
                        } else if (errorData.numero_documento) {
                            setSubmitError(errorData.numero_documento[0]);
                        } else if (errorData.nombre) {
                            setSubmitError(errorData.nombre[0]);
                        } else if (errorData.email) {
                            setSubmitError(errorData.email[0]);
                        } else {
                            setSubmitError("Error de validación desconocido.");
                        }
                    } catch (jsonError) {
                        // Si falla, es un error 500 (HTML)
                        setSubmitError("Error 500: El servidor falló. Revisa la terminal de Django.");
                    }
                    return;
                }

                // 3. Si todo va bien (Respuesta 201)
                setSubmitSuccess(true);
                setFormData({
                    nombre: '', correo: '', contrasena: '', tipoDocumento: '',
                    numeroIdentificacion: '', direccion: '', telefono: '',
                });

                setTimeout(() => {
                    navigate("/login"); // 👈 Redirige al login
                }, 2500);

            } catch (error) {
                setSubmitError("❌ Error de conexión con el servidor.");
                console.error(error);
            } finally {
                setLoading(false); // 👈 Deja de cargar
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#9ec5ff] p-4">
            <div className="w-full max-w-md bg-[#e0edff] rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9ec5ff]/20 via-transparent to-[#150063]/10 blur-2xl"></div>

                {/* Header */}
                <div className="relative text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1d4ed8] rounded-full shadow-md mb-4">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#150063] mb-1">
                        Crear Cuenta
                    </h1>
                    <p className="text-sm text-[#1d4ed8]/80">
                        Completa el formulario para registrarte
                    </p>
                </div>

                {/* Mensajes de éxito o error */}
                <AnimatePresence>
                    {submitSuccess && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="mb-6 p-4 bg-green-100 border border-green-200 rounded-xl flex items-center gap-3 shadow-md"
                        >
                            <CheckCircle className="w-7 h-7 text-green-600" />
                            <div>
                                <p className="text-green-800 font-semibold">
                                    ¡Registro exitoso!
                                </p>
                                <p className="text-green-700 text-sm">
                                    Redirigiendo al login...
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {submitError && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl flex items-center gap-3 shadow-md"
                        >
                            <AlertCircle className="w-7 h-7 text-red-600" />
                            <div>
                                <p className="text-red-800 font-semibold">Error</p>
                                <p className="text-red-700 text-sm">{submitError}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5 relative">
                    {[
                        {
                            label: 'Nombre Completo',
                            name: 'nombre',
                            icon: User,
                            type: 'text',
                            placeholder: 'Juan Pérez',
                        },
                        {
                            label: 'Correo Electrónico',
                            name: 'correo',
                            icon: Mail,
                            type: 'email',
                            placeholder: 'correo@ejemplo.com',
                        },
                        {
                            label: 'Contraseña',
                            name: 'contrasena',
                            icon: Lock,
                            type: showPassword ? 'text' : 'password',
                            placeholder: 'Mínimo 6 caracteres',
                            showPasswordToggle: true,
                        },
                        {
                            label: 'Tipo de Documento',
                            name: 'tipoDocumento',
                            icon: CreditCard,
                            type: 'select',
                            options: tiposDocumento,
                        },
                        {
                            label: 'Número de Identificación',
                            name: 'numeroIdentificacion',
                            icon: CreditCard,
                            type: 'text',
                            placeholder: '123456789',
                        },
                        {
                            label: 'Dirección',
                            name: 'direccion',
                            icon: MapPin,
                            type: 'text',
                            placeholder: 'Calle 123 #45-67',
                        },
                        {
                            label: 'Teléfono',
                            name: 'telefono',
                            icon: Phone,
                            type: 'tel',
                            placeholder: '3001234567',
                        },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-semibold text-[#150063] mb-2">
                                {field.label}
                            </label>
                            <div className="relative">
                                <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1d4ed8]/60" />
                                {field.type === 'select' ? (
                                    <select
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-white border ${
                                            errors[field.name]
                                                ? 'border-red-400'
                                                : 'border-gray-200'
                                        } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/50 transition duration-200`}
                                    >
                                        {field.options.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-white border ${
                                            errors[field.name]
                                                ? 'border-red-400'
                                                : 'border-gray-200'
                                        } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/50 transition duration-200`}
                                    />
                                )}
                                {field.showPasswordToggle && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1d4ed8]/60 hover:text-[#1d4ed8]"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                )}
                            </div>
                            {errors[field.name] && (
                                <p className="mt-1 text-xs text-red-600 font-medium">
                                    {errors[field.name]}
                                </p>
                            )}
                        </div>
                    ))}

                    {/* Botón de Submit */}
                    <div className="pt-4">
                        <motion.button
                            type="submit"
                            disabled={loading} // 👈 Deshabilitado si está cargando
                            className="w-full bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#1d4ed8]/50 transition-all duration-300 ease-in-out disabled:opacity-50"
                            whileHover={{ scale: loading ? 1 : 1.03 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </motion.button>
                    </div>

                    {/* Link a Login */}
                    <p className="text-center text-sm text-[#150063]/80 pt-3">
                        ¿Ya tienes una cuenta?{' '}
                        <a
                            href="/login" // href está bien, o puedes usar Link de react-router-dom
                            className="font-bold text-[#1d4ed8] hover:underline"
                        >
                            Inicia Sesión
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}