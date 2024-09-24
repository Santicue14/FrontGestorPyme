import { useContext, useState } from "react";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
export const NavBar = () => {

    const { user, logOut, loading } = useContext(AuthContext)

    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    if (user) {
        return (
            <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-2xl">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GR LLaves</span>
                    </Link>
                    <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown" >
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to='/' className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Inicio</Link>
                            </li>


                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Ventas</a>
                            </li>
                            {!loading && user.id_rol == '1'
                                && < li >
                                    <a href="#" className="block py-2 px-3 text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white ">Empleados</a>
                                </li>
                            }
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded  md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Proveedores</a>
                            </li>
                            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <Link
                                    to='/usermanagement'
                                    className="text-gray-900 text-center inline-flex items-center md:hover:text-blue-700"
                                    type="button"
                                >
                                    {!loading && user.nombre}
                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </Link>
                                {isOpen && (
                                    <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                            <li>
                                                <Link to='/usermanagement' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Modificar datos</Link>
                                            </li>
                                            {user.id_rol === 1 && (
                                                <>
                                                    <li>
                                                        <a href="/gestionemployees" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Gestionar empleados</a>
                                                    </li>
                                                    <li>
                                                        <a href="/sectores" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Gestionar sectores</a>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li>
                                <a href="#" className=" bg-blue-700 text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    onClick={logOut}>
                                    <MdLogout size={20} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        )
    }
}
