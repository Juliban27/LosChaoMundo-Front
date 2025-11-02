export function ArrowBack({className = "" }) {

    return (
        <div className={`${className}`}>
            <img
                src="/src/assets/arrowBack.svg"
                alt="Logo de la empresa"
                className="w-full h-full object-contain"
            />
        </div>
    )
}