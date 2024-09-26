import { useContext, useEffect, useState } from "react"
import { GestionContext } from "../../../contexts/GestionContext"
import { AuthContext } from "../../../auth/AuthContext"

export const GestionSectores = () => {
    const { getUsers, listarSectores } = useContext(GestionContext)
    const { user } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [sectores, setSectores] = useState([])
    const [searchTerm, setSearchTerm] = useState('') // Estado para la búsqueda
    const [sectorSelected, setSectorSelected] = useState({})
    const [showModal, setShowModal] = useState(false)

    const toggleOnModal = (sector) => {
        setShowModal(prevState => !prevState)
        if (sector.sector_nombre) {
            setSectorSelected(sector)
        }
    }
    const toggleOffModal = () => {
        setShowModal(prevState => !prevState)
        setSectorSelected(null)
    }

    const getSectores = async () => {
        try {
            let res = await listarSectores();
            setSectores(res.data)
        } catch (error) {
            console.error(error);
        }
    }
    const getFrontUsers = async () => {
        try {
            let res = await getUsers();
            setUsers(res.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSectores()
        getFrontUsers()
    }, [sectores])

    // Filtrar sectores basado en el término de búsqueda
    const filteredSectores = sectores.filter((sector) => {
        return (
            (sector.sector_nombre && sector.sector_nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (sector.supervisor_mail && sector.supervisor_mail.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (sector.supervisor_apellido && sector.supervisor_apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (sector.supervisor_nombre && sector.supervisor_nombre.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });


    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-12 mt-6">
                <div className="flex justify-between sticky top-0 pl-4 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    <label htmlFor="table-search" className="sr-only">Buscar</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Buscar sector"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => toggleOnModal({})} // Pasa un objeto vacío para crear un nuevo sector
                    >
                        Add Sector
                    </button>
                </div>
                <div className="max-h-[500px]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 max-h-[600px]" >
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="checkbox-all-search" className="sr-only">Seleccionar todo</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">Nombre del sector</th>
                                <th scope="col" className="px-6 py-3">Encargado</th>
                                {user.id_rol == 1 && <th scope="col" className="px-6 py-3">Acciones</th>}
                            </tr>
                        </thead>
                        <tbody className="max-h-[500px] overflow-y-auto">
                            {filteredSectores.length !== 0 &&
                                filteredSectores.map(sector => (
                                    <SectoresTabla
                                        key={sector.id}
                                        sector={sector}
                                        user={user}
                                        toggleOnModal={toggleOnModal}
                                        sectorSelected={sectorSelected}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && sectorSelected && (
                <UpdateSectorModal
                    sector={sectorSelected}
                    toggleOffModal={toggleOffModal}
                    users={users}
                />
            )}
        </div>
    );
}

// Modifica la función toggleModal para que pase el sector correcto
// eslint-disable-next-line react/prop-types
const SectoresTabla = ({ sector, user, toggleOnModal }) => {
    const { supervisor_mail, supervisor_apellido, supervisor_nombre, sector_nombre } = sector;
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="col" className="px-6 py-4">
                {sector_nombre}
            </th>
            <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="ps-3">
                    <div className="text-base font-semibold">{supervisor_apellido ? `${supervisor_apellido}, ${supervisor_nombre}` : 'No disponible'}</div>
                    <div className="font-normal text-gray-500">{supervisor_mail}</div>
                </div>
            </td>
            {user.id_rol == 1 && (
                <td>
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => toggleOnModal(sector)}>Editar sector</a>
                </td>
            )}
        </tr>
    );
};

// UpdateSectorModal recibe sectorSelected y muestra la información
export const UpdateSectorModal = ({
    sector,
    toggleOffModal,
    users
}) => {
    const { id, id_supervisor, sectorId, supervisor_mail, supervisor_apellido, supervisor_nombre, sector_nombre } = sector;
    const [nombreSector, setNombreSector] = useState(sector_nombre || '')
    const [supervisorSelected, setSupervisorSelected] = useState(null)
    const { createSector, updateSector } = useContext(GestionContext)
    useEffect(() => {
        if (id_supervisor) {
            setSupervisorSelected(id_supervisor);
        }
    }, [id_supervisor]);

    const handleChangeNombreSector = (e) => {
        setNombreSector(e.target.value)
        return
    }
    const handleChangeSupervisor = (e) => {
        setSupervisorSelected(e.target.value)
        return
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { supervisorId: supervisorSelected, nombre: nombreSector, sectorId: id, }
        if (supervisorSelected !== '') {
            if (id) {
                const response = await updateSector(data)
                console.log(response)
                if (response.message) {
                    alert(response.message)
                } else {
                    alert('Error en la actualización del sector');
                }
                toggleOffModal()
            } else {
                const response = await createSector(data)
                console.log(response);
                if (response.message) {
                    alert(response.message)
                } else {
                    alert('Error en la creación del sector');
                }
                toggleOffModal()
            }
        } else {
            alert('Seleccione un supervisor')
        }

    }
    return (
        <>
            <div className="background-modal absolute w-full h-full bg-gray-500 top-0 opacity-30"></div>
            <div id="popup-modal" tabIndex="-1" className="flex absolute mt-24 left-[1000px] z-50 justify-center w-full md:inset-0">
                <div className="relative p-4 w-full max-w-md h-fit">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-4 md:p-5 text-center">
                            <h3 className="mb-2 text-lg font-bold">{sector_nombre ? 'Modificación de sector' : 'Creación de sector'}</h3>
                            <form action="" className="max-w-sm mx-auto mb-4">
                                <div>
                                    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  text-left">Nombre del sector</label>
                                    <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => handleChangeNombreSector(e)}
                                        value={nombreSector} />
                                </div>
                                <div>
                                    <label htmlFor="small-input" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white  text-left">Nombre del sector</label>
                                    <select type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => handleChangeSupervisor(e)}
                                        value={supervisorSelected || ''}
                                    >
                                        <option value={''}>Seleccione un supervisor...</option>
                                        {users.map((user) => {
                                            return (
                                                <option value={user.id} key={user.id}>{`${user.apellido}, ${user.nombre}`}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </form>
                            <button data-modal-hide="popup-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={(e) => handleSubmit(e)}>
                                Sí, estoy seguro
                            </button>
                            <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={toggleOffModal}>
                                No, cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
