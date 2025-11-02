import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
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

    const tiposDocumento = [
        { value: '', label: 'Selecciona un tipo' },
        { value: 'CC', label: 'Cédula de Ciudadanía' },
        { value: 'CE', label: 'Cédula de Extranjería' },
        { value: 'PA', label: 'Pasaporte' },
        { value: 'TI', label: 'Tarjeta de Identidad' },
        { value: 'NIT', label: 'NIT' },
    ];

    // ✅ Validaciones
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

    // ✅ Manejo de cambios
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // ✅ Envío al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const jsonData = {
                username: formData.nombre.trim().replace(/\s+/g, "_").toLowerCase(),
                email: formData.correo,
                password: formData.contrasena,
                rol: "cliente",
            };

            try {
                const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonData),
                });

                if (response.ok) {
                    console.log("✅ Usuario creado correctamente");
                    setSubmitSuccess(true);
                    setTimeout(() => navigate("/"), 2500);
                } else {
                    const errorData = await response.json();
                    console.error("❌ Error al registrar:", errorData);
                    alert("No se pudo registrar. Verifica los datos.");
                }
            } catch (err) {
                console.error("❌ Error de conexión:", err);
                alert("Error de conexión con el servidor.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#9ec5ff] p-4">
            <div className="w-full max-w-md bg-[#e0edff] rounded-3xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">

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

                {/* ✅ Mensaje de éxito */}
                <AnimatePresence>
                    {submitSuccess && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                                duration: 0.4,
                                type: 'spring',
                                stiffness: 150,
                            }}
                            className="mb-6 p-4 bg-green-100 border border-green-200 rounded-xl flex items-center gap-3 shadow-md"
                        >
                            <CheckCircle className="w-7 h-7 text-green-600" />
                            <p className="text-green-800 font-semibold">
                                ¡Registro exitoso! Redirigiendo al inicio...
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5 relative">
                    {[
                        { label: 'Nombre Completo', name: 'nombre', icon: User, type: 'text', placeholder: 'Juan Pérez' },
                        { label: 'Correo Electrónico', name: 'correo', icon: Mail, type: 'email', placeholder: 'correo@ejemplo.com' },
                        { label: 'Contraseña', name: 'contrasena', icon: Lock, type: showPassword ? 'text' : 'password', placeholder: 'Mínimo 6 caracteres', showPasswordToggle: true },
                        { label: 'Tipo de Documento', name: 'tipoDocumento', icon: CreditCard, type: 'select', options: tiposDocumento },
                        { label: 'Número de Identificación', name: 'numeroIdentificacion', icon: CreditCard, type: 'text', placeholder: '123456789' },
                        { label: 'Dirección', name: 'direccion', icon: MapPin, type: 'text', placeholder: 'Calle 123 #45-67' },
                        { label: 'Teléfono', name: 'telefono', icon: Phone, type: 'tel', placeholder: '3001234567' },
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
                                        className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all duration-200 bg-[#e0edff] focus:ring-2 focus:ring-[#1d4ed8]/60 ${errors[field.name]
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-[#b2c9ff]'
                                            }`}
                                    >
                                        {field.options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        className={`w-full pl-11 pr-12 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/60 ${errors[field.name]
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-[#b2c9ff]'
                                            }`}
                                    />
                                )}
                                {field.showPasswordToggle && (
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
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
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors[field.name]}
                                </p>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full mt-6 bg-[#1d4ed8] hover:bg-[#150063] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all focus:ring-2 focus:ring-[#9ec5ff]/70"
                    >
                        Registrarse
                    </button>

                    <p className="text-center text-sm text-[#1d4ed8]/80 mt-4">
                        ¿Ya tienes cuenta?{' '}
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="font-medium text-[#150063] hover:underline"
                        >
                            Inicia sesión
                        </button>
                    </p>
                </form>

                <p className="text-center text-xs text-[#1d4ed8]/70 mt-6">
                    Al registrarte, aceptas nuestros términos y condiciones
                </p>
            </div>
        </div>
    );
}
