import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "./api/Api"

const Listar_Component = () => {
    const navegacion = useNavigate()
    const [mascotas, setMascotas] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getMascotas();
      }, []);
    
      const getMascotas = async () => {
        try {
          const response = await api.get("/mascota");
          console.log("Respuesta de la API:", response.data)
          if (Array.isArray(response.data)) {
            setMascotas(response.data)
          }
          else {
            setError("La respuesta no es valida")
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError("No se encontraron mascotas");
          }
          if (error.response.status === 401 || error.response.status === 403) {
            navegacion("/");
          }
        }
      };
    
    
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta mascota?")) {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                }

                await api.delete(`/mascota/${id}`, config);
                const updatedPets = mascotas.filter(mascota => mascota._id !== id);
                setMascotas(updatedPets);
            } catch (error) {
                console.error("Error al eliminar la mascota:", error);
                setError("Error al eliminar la mascota");
            }
        }
    }

    return (
        <>
            <div className="flex relative bg-[url('../../bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
                <div className="flex absolute flex-row text-white top-10 gap-10">
                    <p>Administrar Mascotas</p>
                    <Link to='/' className="bg-[url('../../btn-close.svg')] w-[34px] h-[34px] flex absolute left-56 cursor-pointer"></Link>
                </div>
                <Link to='/AnadirMascotas' className="bg-[url('../../btn-add.svg')] w-[360px] h-[50px] flex absolute cursor-pointer top-32"></Link>
                {error && <p>{error}</p>}
                {
                    mascotas.map((mascota, i) => (
                        <div key={i} className={`flex absolute bg-gray-400 w-11/12 h-24 rounded-2xl ${i === 0 ? 'top-52' : i === 1 ? 'top-80' : i === 2 ? 'bottom-64' : i === 3 ? 'bottom-36' : 'bottom-8'} items-center hover:bg-gray-500`}>
                        <div className="flex absolute left-3">
                            <img src={mascota.photo} className="h-14 w-14 rounded-full" alt="" />
                        </div>
                        <div className="flex absolute flex-col left-24">
                            <p className="text-sky-700 font-semibold">{mascota.name}</p>
                            <p className="text-sky-700">{mascota.race_id?.name}</p>
                        </div>
                        <Link to={`/ConsultarMascotas/${mascota._id}`} className="flex absolute bg-[url('../../btn-show.svg')] w-[34px] h-[34px] right-28 cursor-pointer"></Link>
                        <Link to={`EditarMascotas/${mascota._id}`} className="flex absolute bg-[url('../../btn-edit.svg')] w-[34px] h-[34px] right-16 cursor-pointer"></Link>
                        <div className="flex absolute bg-[url('../../btn-delete.svg')] w-[34px] h-[34px] right-4 cursor-pointer" onClick={() => handleDelete(mascota._id)}></div>
                    </div>
                    ))
                }
            </div>
        </>
    )
}

export default Listar_Component