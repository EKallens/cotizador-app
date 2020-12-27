import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));


const ContenedorAlerta = styled.div`
  margin-top: 30px;
`;

const Alerta = ({ alerta }) => {

  const { mensaje, tipo, variante } = alerta;

    const classes = useStyles();

    return (
        <ContenedorAlerta className={classes.root}>
            <Alert variant={variante} severity={tipo}>
              {mensaje}
            </Alert>
        </ContenedorAlerta>
    )
}

Alerta.propTypes = {
  alerta: PropTypes.object.isRequired
}

export default Alerta
