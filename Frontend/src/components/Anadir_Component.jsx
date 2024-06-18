import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "./api/Api";

const Anadir_Component = () => {
  const navegacion = useNavigate();
  const [razas, setRazas] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const [generos, setGenero] = useState([]);
  const [previewImagen, setPreviewImagen] = useState(null);

  // validacion de campos con libreria react-hook-form
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();

  useEffect(() => {
    getCategoria();
    getGenero();
    getRaza();
  }, []);

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

  const handleFileUpload = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const previewUrl = URL.createObjectURL(archivo);
      setValue('img', archivo);
      setPreviewImagen(previewUrl);
    } else {
      setPreviewImagen(null);
    }
  };

  const registrarMascota = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('race_id', data.race_id);
    formData.append('category_id', data.category_id);
    formData.append('gender_id', data.gender_id);
    formData.append('img', data.img);

    try {
      const response = await api.post('/mascota', formData);

      if (response) {
        alert("Nueva mascota agregada");
        navegacion('/Home');
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="flex relative bg-[url('../../bg.svg')] w-[400px] h-[785px] justify-center items-center flex-col">
      <div className="flex absolute flex-row text-white top-10">
        <Link to='/Home' className="bg-[url('../../btn-back.svg')] w-[12px] h-[20px] flex absolute right-56 cursor-pointer"></Link>
        <p>Adicionar Mascota</p>
        <Link to='/' className="bg-[url('../../btn-close.svg')] w-[34px] h-[34px] flex absolute left-52 cursor-pointer"></Link>
      </div>
      <div className="flex absolute top-32">
        <figure className="bg-white w-[150px] h-[150px] rounded-full border-blue-500 flex items-center justify-center">
          {
            previewImagen ? (
              <img
                src={previewImagen}
                alt="preview"
                className="rounded-full w-full h-full"
              />
            ) : (
              <img
                src="icon-camera.svg"
                alt="icon-camera"
                className="rounded-full w-full h-full"
              />
            )
          }
        </figure>
      </div>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit(registrarMascota)}>
          <div className="flex items-center justify-center">
            <input
              {...register("name", { required: "El nombre es obligatorio" })}
              type="text"
              className="absolute flex w-11/12 pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 top-[330px] placeholder:text-sky-800 hover:bg-slate-200"
              placeholder="Nombre"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-[url('../../arrows.svg')] w-[10px] h-[18px] flex absolute bottom-[345px] right-10 z-10 cursor-pointer"></div>
            <select
              {...register("race_id", { required: "Seleccione una raza" })}
              className="absolute flex w-11/12 pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 bottom-[330px] placeholder:text-sky-800 z-0 hover:bg-slate-200"
            >
              <option value="" disabled>Seleccione una raza</option>
              {razas.map(raza => (
                <option key={raza._id} value={raza._id}>
                  {raza.name}
                </option>
              ))}
            </select>
            {errors.race_id && <p>{errors.race_id.message}</p>}
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-[url('../../arrows.svg')] w-[10px] h-[18px] flex absolute bottom-[270px] right-10 z-10 cursor-pointer"></div>
            <select
              {...register("category_id", { required: "Seleccione una categoría" })}
              className="absolute flex w-11/12 pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 bottom-[255px] placeholder:text-sky-800 hover:bg-slate-200"
            >
              <option value="" disabled>Seleccione una categoría</option>
              {categorias.map(categoria => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p>{errors.category_id.message}</p>}
          </div>
          <div className="flex items-center justify-center">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute appearance-none py-2 flex w-11/12 pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 bottom-[180px] placeholder:text-sky-800 hover:bg-slate-200"
            />
            {errors.img && <p>{errors.img.message}</p>}
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-[url('../../arrows.svg')] w-[10px] h-[18px] flex absolute bottom-[120px] right-10 z-10"></div>
            <select
              {...register("gender_id", { required: "Seleccione un género" })}
              className="absolute flex w-11/12 pl-4 rounded-full outline-none h-[50px] opacity-60 bg-slate-100 bottom-[105px] placeholder:text-sky-800 hover:bg-slate-200"
            >
              <option value="" disabled>Seleccione un género</option>
              {generos.map(genero => (
                <option key={genero._id} value={genero._id}>
                  {genero.name}
                </option>
              ))}
            </select>
            {errors.gender_id && <p>{errors.gender_id.message}</p>}
          </div>
          <button type="submit" className="bg-[url('../../btn-save.svg')] w-[360px] h-[50px] flex absolute bottom-8 left-5"></button>
        </form>
      </div>
    </div>
  );
};

export default Anadir_Component;