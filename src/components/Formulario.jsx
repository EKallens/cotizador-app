import React, { useState } from 'react';
import styled from '@emotion/styled';
import Alerta from './Alerta';
import PropTypes from 'prop-types';
import { calculoYears, obtenerIncremento, obtenerPlan } from '../helpers/helpers';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover{
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Formulario = ({setResumen, setCargando}) => {

    //State para leer información de los input y radio
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [error, setError] = useState(false);
    const [alerta, setAlerta] = useState({
        mensaje: '',
        tipo: ''
    });

    //Destructuración del objeto datos para crear variables que se usan en el value
    const { marca, year, plan } = datos;

    //Función para obtener la información de lo que va seleccionando el usuario
    const obtenerInformacion = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const cotizarSeguro = e => {

        //Base de 2000
        let resultado = 2000;
        let diferencia;

        e.preventDefault();

        if(marca.trim() === ''){
            setError(true);
            setAlerta({
                mensaje: 'Debes elegir una marca!',
                tipo: 'error'
            })
            return;
        }

        if(year.trim()===''){
            setError(true);
            setAlerta({
                mensaje: 'Debes elegir un año!',
                tipo: 'error',
                variant:'outlined'
            })
            return;
        }

        if(plan.trim()===''){
            setError(true);
            setAlerta({
                mensaje: 'Debes elegir un plan!',
                tipo: 'error',
                variant:'outlined'
            })
            return;
        }

        setError(false);
        diferencia = calculoYears(year);
        resultado -= ((diferencia*3) * resultado) / 100;

        resultado = obtenerIncremento(marca) * resultado;
        
        const incrementoPlan = obtenerPlan(plan);

        resultado = parseFloat(resultado * incrementoPlan).toFixed(2);

        setCargando(true);

        setTimeout(() => {

            setCargando(false);

            setResumen({
                cotizacion: Number(resultado),
                datos
            })
            
        }, 1500);

    }

    return (
        <form onSubmit={ cotizarSeguro }>
            <Campo>
                <Label>Marca: </Label>
                <Select onChange={ obtenerInformacion } name="marca" value={marca}>
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año: </Label>
                <Select onChange={ obtenerInformacion } name="year" value={year}>
                    <option value="">-- Seleccione --</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan: </Label>
                <InputRadio
                    type="radio"
                    name="plan" 
                    value="basico"
                    checked={ plan === "basico" }
                    onChange={obtenerInformacion}
                /> 
                Básico

                <InputRadio
                    type="radio"
                    name="plan" 
                    value="completo"
                    checked={ plan === "completo" }
                    onChange={obtenerInformacion}
                /> 
                Completo
            </Campo>

            {error ? <Alerta alerta={alerta} /> : null }

            <Boton type="submit">Cotizar</Boton>

        </form>
    )
}

Formulario.propTypes = {
    setResumen: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired
}

export default Formulario
