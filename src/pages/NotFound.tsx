export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light dark:bg-dark">
      <div className="text-center">
        <div className="text-9xl font-bold text-blue-500 dark:text-blue-400">404</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4">Página no encontrada</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
          Lo sentimos, la página que buscas no existe.
        </p>
        <a
          href="/"
          className="mt-8 inline-block btn-primary px-8 py-3 text-lg"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
}
