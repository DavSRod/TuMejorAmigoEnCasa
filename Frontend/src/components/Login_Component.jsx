import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login_Component = () => {
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navegacion = useNavigate()
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: correo, password: password
      })
      alert(response.data.Mensaje)
      window.localStorage.setItem("token", response.data.token);
      console.log(response.data.Mensaje)
      navegacion('/Home')
    } catch (error) {
      setError(error.response.data.mensaje)
    }
  }

    return (
        <>
            <div className="flex relative bg-[url('../../bg-login.svg')] w-[400px] h-[785px] justify-center items-center">
                <form action="" onSubmit={handleSubmit(login)}>
                  <div>
                    <input type="email" name="email" id="email" className="absolute flex w-11/12 pl-4 rounded-full outline-none h-11 opacity-60 bg-slate-100 bottom-44 placeholder:text-sky-800 hover:bg-slate-200 left-5" placeholder="Correo Electrónico" {...register('email', {required: true})} value={correo} onChange={e => setCorreo(e.target.value)} autoComplete="off"/>
                    {
                        errors.correo?.type === "required" && (
                            <div className="text-red-600 font-bold">El correo es requerido</div>
                        )
                    }
                  </div>
                  <div>
                    <input type="password" name="password" id="password" className="absolute flex w-11/12 pl-4 rounded-full outline-none h-11 opacity-60 bg-slate-100 bottom-28 placeholder:text-sky-800 hover:bg-slate-200 left-5" placeholder="Contraseña" {...register('password', {required: true})} value={password} onChange={e => setPassword(e.target.value)} autoComplete="off"/>
                    {
                      errors.password?.type === 'required' && (
                        <div className="text-red-600 font-boldfont-bold">La contraseña es requerida</div>
                      )
                    }
                  </div>
                <button type="submit" className="absolute flex items-center justify-center w-11/12 pl-4 text-gray-300 bg-blue-900 rounded-full h-11 bottom-9 hover:bg-blue-950 left-5">Ingresar</button>
                </form>
                {
                  error && (
                    <div className="px-8 text-red-500">{error}</div>
                  )
                }
            </div>
        </>
    )
}

export default Login_Component