import React, { useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";

function Register() {
    const [emisorData, setEmisorData] = useState({
        nombre: '',
        nif: '',
        domicilio: ''
    });

    const [receptorData, setReceptorData] = useState({
        nombre: '',
        nif: '',
        domicilio: ''
    });

    const handleEmisorChange = (e) => {
        const { name, value } = e.target;
        setEmisorData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReceptorChange = (e) => {
        const { name, value } = e.target;
        setReceptorData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Datos del Emisor:', emisorData);
        console.log('Datos del Receptor:', receptorData);
        // Aquí puedes agregar la lógica de registro
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
            {/* Top App Bar */}
            <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                <div className="flex size-12 shrink-0 items-center justify-start">
                    <span className="material-symbols-outlined text-slate-800 dark:text-slate-200">
                        <IoMdArrowBack size={24} />
                    </span>
                </div>
                <h1 className="text-slate-900 dark:text-slate-50 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                    Registro
                </h1>
                <div className="w-12"></div>
            </header>

            <main className="grow">
                {/* Page Indicators */}
                <div className="flex w-full flex-row items-center justify-center gap-3 py-5">
                    <div className="h-2 w-8 rounded-full bg-primary"></div>
                    <div className="h-2 w-8 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="h-2 w-8 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>

                <div className="px-4">
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
                        Completa los siguientes datos para crear tu cuenta.
                    </p>
                </div>

                {/* Section 1: Datos del Emisor */}
                <section className="mb-6">
                    <h2 className="text-secondary text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                        Datos del Emisor
                    </h2>

                    {/* Nombre o Razón Social */}
                    <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
                                Nombre o Razón Social
                            </p>
                            <input
                                type="text"
                                name="nombre"
                                value={emisorData.nombre}
                                onChange={handleEmisorChange}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
                                placeholder="Ingrese su nombre o razón social"
                            />
                        </label>
                    </div>

                    {/* NIF */}
                    <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
                                Número de Identificación Fiscal (NIF, CIF, NIT, etc.)
                            </p>
                            <input
                                type="text"
                                name="nif"
                                value={emisorData.nif}
                                onChange={handleEmisorChange}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
                                placeholder="Ej: 12345678A"
                            />
                        </label>
                    </div>

                    {/* Domicilio */}
                    <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
                                Domicilio
                            </p>
                            <input
                                type="text"
                                name="domicilio"
                                value={emisorData.domicilio}
                                onChange={handleEmisorChange}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
                                placeholder="Ingrese su dirección completa"
                            />
                        </label>
                    </div>
                </section>

                {/* Section 2: Datos del Receptor */}
                <section className="mb-8">
                    <h2 className="text-secondary text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                        Datos del Receptor
                    </h2>

                    {/* Nombre o Razón Social */}
                    <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
                                Nombre o Razón Social
                            </p>
                            <input
                                type="text"
                                name="nombre"
                                value={receptorData.nombre}
                                onChange={handleReceptorChange}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
                                placeholder="Ingrese el nombre del receptor"
                            />
                        </label>
                    </div>

                    {/* NIF */}
                    <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
                                Número de Identificación Fiscal (NIF, CIF, NIT, etc.)
                            </p>
                            <input
                                type="text"
                                name="nif"
                                value={receptorData.nif}
                                onChange={handleReceptorChange}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
                                placeholder="Ej: 87654321B"
                            />
                        </label>
                    </div>

                    {/* Domicilio */}
                    <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
                                Domicilio
                            </p>
                            <input
                                type="text"
                                name="domicilio"
                                value={receptorData.domicilio}
                                onChange={handleReceptorChange}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
                                placeholder="Ingrese la dirección del receptor"
                            />
                        </label>
                    </div>
                </section>
            </main>

            {/* Action Area */}
            <footer className="sticky bottom-0 bg-background-light dark:bg-background-dark p-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                    onClick={handleSubmit}
                    className="flex w-full min-w-40 flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-6 text-base font-bold leading-normal tracking-[0.015em] text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 dark:focus:ring-offset-background-dark"
                >
                    Registrar
                </button>
            </footer>
        </div>
    );
}

export default Register;