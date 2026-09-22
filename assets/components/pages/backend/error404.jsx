import { HomeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Layout from '../../layout/Layout';

const Error404 = () => {
    return (
        <Layout tituloHeader="Página No Encontrada">
            <div className="flex flex-1 flex-col items-center justify-center text-center px-4 py-16">
                <div className="flex items-center justify-center size-24 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500" aria-hidden="true" />
                </div>

                <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    404
                </h1>

                <p className="mt-4 text-xl font-semibold text-purple-900">
                    Página No Encontrada
                </p>
                <p className="mt-2 max-w-md text-sm text-pink-900">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>

                <a
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 active:scale-95"
                >
                    <HomeIcon className="h-5 w-5" aria-hidden="true" />
                    Volver al inicio
                </a>
            </div>
        </Layout>
    );
};

export default Error404;