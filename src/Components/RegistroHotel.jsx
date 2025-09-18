import React, { useState } from "react";
import "./RegistroHotel.css";

export default function RegistroHotel(){
    const [formData, setFormData] = useState({
        identificacion: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        habitacion: "",
        rh: "O+",
        fechaIngreso: "",
        fechaSalida: "",
    });

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // Validación
    const [errors, setErrors] = useState({});
    const validar = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
        if (typeof formData[key] ==='string' && !formData[key].trim()) {
            newErrors[key] = "Este campo es obligatorio";
        }else if(!formData[key])
            {
                newErrors[key] = "Este campo es obligatorio";
            }
        });
        if (formData.fechaIngreso && formData.fechaSalida && new Date(formData.fechaSalida)<= new Date(formData.fechaIngreso)){
            newErrors.fechaSalida = "La fecha de salida debe ser posterior a la fecha de ingreso";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegistrar = (e) => {
        e.preventDefault();
        if (validar()) {
            alert("Registro exitoso");
            // Reiniciar el formulario
            setFormData({
                identificacion: "",
                nombres: "",
                apellidos: "",
                telefono: "",
                habitacion: "",
                rh: "O+",
                fechaIngreso: "",
                fechaSalida: "",
            });
        }else {
            alert("Por favor, complete todos los campos");
        }
    };

    const handleCancelar = () =>{
        alert("Registro cancelado");
        setFormData({
            identificacion: "",
            nombres: "",
            apellidos: "",
            telefono: "",
            habitacion: "",
            rh: "O+",
            fechaIngreso: "",
            fechaSalida: "",
        });
        setErrors({});
    };

    return(
        <div className="container">
            <div className="header">
                <p>REGISTRO HOTEL</p>
                <button className="btn-close">✖</button>
            </div>

            <form className="formulario">
                <label htmlFor="identificacion">Identificación:</label>
                <input id="identificacion" name="identificacion" value={formData.identificacion} onChange={handleChange} />
                {errors.identificacion && <span className="error">{errors.identificacion}</span>}

                <label htmlFor="nombres">Nombres:</label>
                <input id="nombres" name="nombres" value={formData.nombres} onChange={handleChange} />
                {errors.nombres && <span className="error">{errors.nombres}</span>}

                <label htmlFor="apellidos">Apellidos:</label>
                <input id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} />
                {errors.apellidos && <span className="error">{errors.apellidos}</span>}

                <label htmlFor="telefono">Teléfono:</label>
                <input id="telefono" name="telefono" value={formData.telefono} onChange={(e)=> {const soloNumeros = e.target.value.replace(/\D/g,"");
                setFormData({...formData, telefono: soloNumeros});
                }} />
                {errors.telefono && <span className="error">{errors.telefono}</span>}

                <label htmlFor="habitacion">Habitación:</label>
                <input id="habitacion" name="habitacion" value={formData.habitacion} onChange={handleChange} />
                {errors.habitacion && <span className="error">{errors.habitacion}</span>}

                <label htmlFor="rh">RH:</label>
                <select id="rh" name="rh" value={formData.rh} onChange={handleChange}>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>
                {errors.rh && <span className="error">{errors.rh}</span>}

                <div className="fechas">
                    <div className="campo-fecha">
                        <label>Fecha Ingreso:</label>
                        <input type="date" name="fechaIngreso" value={formData.fechaIngreso} onChange={handleChange} />
                        {errors.fechaIngreso && <span className="error-fecha">{errors.fechaIngreso}</span>}
                    </div>
                    <div className="campo-fecha">
                        <label>Fecha Salida:</label>
                        <input type="date" name="fechaSalida" value={formData.fechaSalida} onChange={handleChange} />
                        {errors.fechaSalida && <span className="error-fecha">{errors.fechaSalida}</span>}
                    </div>
                </div>

                <div className="navegacion">
                    <button type="button">←</button>
                    <button type="button">→</button>
                </div>

                <div className="acciones">
                    <button type="button" className="btn-registrar" onClick={handleRegistrar}>Registrar</button>
                    <button type="button" className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}