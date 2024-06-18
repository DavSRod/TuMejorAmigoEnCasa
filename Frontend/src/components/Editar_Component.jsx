import React, { useState, useEffect } from "react";
import api from "./api/Api";
import { Link, useParams } from "react-router-dom";

const Editar_Component = () => {
    const { id } = useParams();
    const [mascota, setMascota] = useState({
        nombre: '',
        raza: '',
        categoria: '',
        genero: '',
        foto: ''
    });

    const [razas, setRazas] = useState([]);
    const [categorias, setCategoria] = useState([]);
    const [generos, setGenero] = useState([]);
    const [foto, setFoto] = useState(null);
    const [previewImagen, setPreviewImagen] = useState(null);

    const getRaza = async () => {
        try {
            const response = await api.get('/raza');
            setRazas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCategoria = async () => {
        try {
            const response = await api.get('/categoria');
            setCategoria(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getGenero = async () => {
        try {
            const response = await api.get('/genero');
            setGenero(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const mascotaId = async () => {
            try {
                const response = await api.get(`/mascota/${id}`);
                if (response.data.mascota) {
                    setMascota(response.data.mascota);
                }
            } catch (error) {
                console.error(error);
            }
        };
        mascotaId();
        getRaza();
        getCategoria();
        getGenero();
    }, [id]);

    const actualizarMascota = async () => {
        try {
            const response = await api.put(`/mascota/${id}`, mascota);
            console.log(response.data);
            alert("Se actualizó con éxito");
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const handleFileUpload = (event) => {
        const archivo = event.target.files[0];
        if (archivo) {
            const previewUrl = URL.createObjectURL(archivo);
            setFoto(archivo);
            setPreviewImagen(previewUrl);
        } else {
            setPreviewImagen(null);
        }
    };

    return (
        <div className="flex relative bg-[url('../../bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
            <div className="flex absolute flex-row text-white top-10">
                <Link to='/Home' className="bg-[url('../../btn-back.svg')] w-[12px] h-[20px] flex absolute right-56 cursor-pointer"></Link>
                <p>Modificar Mascota</p>
                <Link to='/' className="bg-[url('../../btn-close.svg')] w-[34px] h-[34px] flex absolute left-52 cursor-pointer"></Link>
            </div>
            <main className="flex flex-col items-center justify-center">
                <div className="flex absolute justify-center h-40 w-40 top-24 right-32">
                    <figure className="flex bg-white h-full w-96 rounded-full items-center justify-center">
                        {previewImagen && (
                            <img
                                src={previewImagen}
                                alt="icon-camera"
                                className="rounded-full h-full"
                            />
                        )}
                    </figure>
                </div>
                <div className="flex flex-col items-center h-3/5 pt-11">
                    <ul className="flex flex-col gap-x-8 sm:gap-y-8 xl:col-span-2">
                        <li>
                            <section className="flex flex-row bg-white h-12 rounded-s-2xl w-80">
                                <div className="bg-blue-600 flex items-center pl-8 w-4/12">Nombre</div>
                                <input
                                    type="text"
                                    className="flex pl-9 items-center bg-gray-200 w-8/12"
                                    value={mascota.nombre || ''}
                                    onChange={(e) => setMascota({ ...mascota, nombre: e.target.value })}
                                />
                            </section>
                        </li>
                        <li>
                            <section className="flex flex-row bg-[url('info-race.svg')] bg-no-repeat h-12 w-80">
                                <div className="w-4/12 bg-blue-600 flex items-center pl-8">Raza</div>
                                <select
                                    className="appearance-none w-8/12 py-2 px-4 pr-8 bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                                    value={mascota.raza || ''}
                                    onChange={(e) => setMascota({ ...mascota, raza: e.target.value })}
                                >
                                    <option value="">Seleccione una raza</option>
                                    {razas.map((raza) => (
                                        <option key={raza._id} value={raza._id}>
                                            {raza.name}
                                        </option>
                                    ))}
                                </select>
                            </section>
                        </li>
                        <li>
                            <section className="flex flex-row bg-[url('info-category.svg')] bg-no-repeat h-12 w-80">
                                <div className="flex w-4/12 bg-blue-600 items-center pl-8">Categoría</div>
                                <select
                                    className="appearance-none w-8/12 py-2 px-4 pr-8 bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                                    value={mascota.categoria || ''}
                                    onChange={(e) => setMascota({ ...mascota, categoria: e.target.value })}
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria._id} value={categoria._id}>
                                            {categoria.name}
                                        </option>
                                    ))}
                                </select>
                            </section>
                        </li>
                        <li>
                            <div>
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    className="appearance-none w-80 py-2 px-4 pr-8 bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                                />
                            </div>
                        </li>
                        <li>
                            <section className="flex flex-row bg-[url('info-gender.svg')] bg-no-repeat h-12 w-80">
                                <div className="w-4/12 bg-blue-600 flex items-center pl-8">Género</div>
                                <select
                                    className="appearance-none w-8/12 py-2 px-4 pr-8 bg-gray-200 focus:outline-none focus:bg-white focus:border-blue-500"
                                    value={mascota.genero || ''}
                                    onChange={(e) => setMascota({ ...mascota, genero: e.target.value })}
                                >
                                    <option value="">Seleccione un género</option>
                                    {generos.map((genero) => (
                                        <option key={genero._id} value={genero._id}>
                                            {genero.name}
                                        </option>
                                    ))}
                                </select>
                            </section>
                        </li>
                    </ul>
                    <button
                        onClick={actualizarMascota}
                        className="mt-9 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Modificar
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Editar_Component