import { useContext, useState } from 'react'
import EmpresaLogo from '../assets/logo.webp'
import { AuthContext } from '../auth/AuthContext'

export const Login = () => {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async(e) => {
        e.preventDefault()
        try {
            await login(email, password)
        } catch (error) {
            console.error(error)

        }
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <main className="bg-gray-50 shadow-xl w-[600px] mt-8 grid justify-center gap-6 items-center mx-auto rounded-lg overflow-hidden">
            <section className='mt-6'>
                <img src={EmpresaLogo} alt="Logo GR" className='overflow-hidden rounded-2xl shadow-md' />
            </section>
            {/*LOGIN FORM */}
            <form className="" onSubmit={(e) => handleLogin(e)}>
                <div className="mb-5 pb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese su email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@grllaves.com" required onChange={handleChangeEmail} value={email} />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese su contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleChangePassword}
                        value={password} required />
                </div>
                <div className="submit grid w-full pb-8 items-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
        </main>
    )
}
