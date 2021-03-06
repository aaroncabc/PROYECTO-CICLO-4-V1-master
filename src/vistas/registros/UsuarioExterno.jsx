import './usuarioInterno.css';
import React from 'react';
import Constantes from "../../Constantes";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Formularios from '../plantillas/Formularios'

class UsuarioExterno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarioE: {
                "nombre": "",
                "usuario": "",
                "correo": "",
                "contraseña": "",
            },
        };
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
    }


    render(){
        return (
            <div className="App">
              <header className="App-header">
                <h1>
                  REGISTRO DE USUARIOS EXTERNO
                </h1>
                <div className="contanedorgeneral">
                <div>
                    <form className="field" onSubmit={this.manejarEnvioDeFormulario}>
                         <div className="form-group">
                            <label className="label" htmlFor="nombre">Nombre:</label> 
                            <input className="form-control" placeholder="Nombre" id="nombre" name="nombre" onChange={this.manejarCambio} value={this.state.usuarioE.nombre} ></input>
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="usuario">usuario:</label>
                            <input className="form-control" placeholder="Usuario" id="usuario"  name="usuario" onChange={this.manejarCambio} value={this.state.usuarioE.usuario} ></input>
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="correo">Correo:</label>
                            <input className="form-control" placeholder="Correo" id="correo"  name="correo" onChange={this.manejarCambio} value={this.state.usuarioE.correo} ></input>
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="contraseña">contraseña:</label>
                            <input className="form-control" placeholder="contraseña" id="contraseña" name="contraseña" onChange={this.manejarCambio} value={this.state.usuarioE.contraseña} ></input>
                        </div>
                        <button className="btn btn-dark">Guardar</button>
                    </form>
                </div>

                <div>
                    
                    <Formularios src="https://sialdeporte.com/wp-content/uploads/2018/02/cuanto-pesa-el-balon-de-basquetbol-1-1024x640.jpg" />

                </div>
                </div>
             
              </header>
            </div>
          );
    }
    async manejarEnvioDeFormulario(evento) {
        evento.preventDefault();

        const respuesta = await fetch(`${Constantes.RUTA_API4}`, {
            method: 'POST',
            body: JSON.stringify(this.state.usuarioE),
            headers: {
                'Content-Type' : 'application/json',
            }
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            toast('Videojuego guardado', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                usuarioE: {
                    nombre: "",
                    usuario: "",
                    correo: "",
                    contraseña: ""
                }
            });
        } else {
            toast.error("Error guardando. Intenta de nuevo");
        }
    }

    manejarCambio(evento) {
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const equipoActualizado = state.usuarioE;
            equipoActualizado[clave] = valor;
            return {
                usuarioE: equipoActualizado,
            }
        });
    }
}

export default UsuarioExterno;
