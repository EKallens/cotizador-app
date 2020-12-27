import React from 'react';
import Alerta from './Alerta';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const TextoTotal = styled.p`
    color: #00838F;
    padding: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    margin : 0;
`;

const ResultadoCotizacion = styled.div`
    text-align: center;
    padding: .5rem;
    border: 1px solid #26C6DA;
    background-color: rgb(127, 224, 237);
    margin-top: 1rem;
    position: relative;
`;

const Resultado = ({cotizacion}) => {

    let alerta = {
        mensaje: 'Elige marca, año y plan!',
        tipo: 'warning',
        variant:'filled'
    }

    return (
        (cotizacion === 0)
        ? <Alerta alerta={alerta}/> 
        : <ResultadoCotizacion>
            <TransitionGroup
                component='span'
                className='resultado'
            >
                <CSSTransition
                    classNames='resultado'
                    key={cotizacion}
                    timeout={{ enter:500, exit: 500 }}
                >
                <TextoTotal>El total es: $ <span>{cotizacion}</span></TextoTotal>
                </CSSTransition>
            </TransitionGroup>
        </ResultadoCotizacion>
        
    )
}

Resultado.propTypes = {
    cotizacion: PropTypes.number.isRequired
}

export default Resultado
