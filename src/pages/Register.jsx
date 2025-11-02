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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const jsonData = {
        ...formData,
        fechaRegistro: new Date().toISOString(),
      };
      console.log('✅ Datos listos para enviar:', jsonData);
      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({
          nombre: '',
          correo: '',
          contrasena: '',
          tipoDocumento: '',
          numeroIdentificacion: '',
          direccion: '',
          telefono: '',
        });
        setSubmitSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden">
        {/* Glow sutil en tonos indigo (solo color) */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/20 via-transparent to-indigo-400/10 blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="relative text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full shadow-md mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Crear Cuenta</h1>
          <p className="text-sm text-gray-500">
            Completa el formulario para registrarte
          </p>
        </div>

        {/* Mensaje de éxito (mantiene verde estándar) */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 150 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 shadow-md"
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: [0, 1.2, 1], rotate: [0, 15, 0] }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative"
              >
                <div className="absolute -inset-1 rounded-full bg-green-200/40 blur-md" />
                <CheckCircle className="w-7 h-7 text-green-600 relative z-10" />
              </motion.div>
              <div>
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-800 font-semibold"
                >
                  ¡Registro exitoso!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-700 text-sm"
                >
                  Tus datos fueron guardados correctamente
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="relative">
                <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border bg-white transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors[field.name]
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300'
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
                    className={`w-full pl-11 pr-12 py-3 rounded-lg border bg-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors[field.name]
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                )}
                {field.showPasswordToggle && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
            className="w-full mt-6 bg-indigo-600 text-white font-medium py-3 rounded-lg shadow-lg hover:bg-indigo-700 active:bg-indigo-800 transition duration-200 hover:shadow-xl"
          >
            Registrarse
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            ¿Ya tienes cuenta?{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline">
              Inicia sesión
            </a>
          </p>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Al registrarte, aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
}
