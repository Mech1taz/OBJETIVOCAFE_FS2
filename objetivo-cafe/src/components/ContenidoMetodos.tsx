import React from 'react';

export const ContenidoMetodos: React.FC = () => {
    const imgStyle = {
        height: '250px',        // Altura fija para que todas se vean iguales
        objectFit: 'cover' as const, // 'cover' hace que la imagen llene todo el espacio
        width: '100%',          // Ancho total
        borderBottom: '1px solid #eee' // Un borde sutil abajo de la imagen
    };
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 display-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Guía de Métodos
            </h1>
            <p className="lead text-center mb-5">
                Domina el arte de la extracción con nuestras recetas paso a paso.
            </p>
            
            <div className="row">
                
                <div className="col-md-4 mb-4">
                    <div className="card shadow h-100 border-0" style={{ overflow: 'hidden' }}>
                        <img src="/img/cafe_en_prensa.png" className="card-img-top" alt="Prensa Francesa" style={imgStyle} />
                        <div className="card-body">
                            <h3 className="card-title text-primary">Prensa Francesa</h3>
                            <h6 className="card-subtitle mb-3 text-muted">Cuerpo robusto e intenso</h6>
                            
                            
                            <div className="alert alert-primary py-2 px-3 mb-3">
                                <small>
                                    <strong>Molienda:</strong> Gruesa (Sal de mar)<br/>
                                    <strong>Ratio:</strong> 1:15 (20g café / 300ml agua)<br/>
                                    <strong>Tiempo:</strong> 4 minutos
                                </small>
                            </div>

                            <h6 className="fw-bold">Preparación:</h6>
                            <ol className="ps-3 small text-secondary">
                                <li className="mb-1">Precalienta la prensa con agua caliente y deséchala.</li>
                                <li className="mb-1">Agrega el café molido al fondo.</li>
                                <li className="mb-1">Vierte el agua caliente (94°C) asegurando mojar todo el café.</li>
                                <li className="mb-1">Pon la tapa sin bajar el émbolo y espera 4 minutos.</li>
                                <li className="mb-1">Rompe la costra superior con una cuchara y baja el émbolo suavemente.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                
                <div className="col-md-4 mb-4">
                    <div className="card shadow h-100 border-0" style={{ overflow: 'hidden' }}>
                        <img src="/img/cafe_en_v60.png" className="card-img-top" alt="V60" style={imgStyle} />
                        <div className="card-body">
                            <h3 className="card-title text-success">V60 / Filtro</h3>
                            <h6 className="card-subtitle mb-3 text-muted">Limpieza y claridad</h6>
                            
                            
                            <div className="alert alert-success py-2 px-3 mb-3">
                                <small>
                                    <strong>Molienda:</strong> Media-Fina (Sal de mesa)<br/>
                                    <strong>Ratio:</strong> 1:16 (15g café / 250ml agua)<br/>
                                    <strong>Tiempo:</strong> 2:30 - 3:00 min
                                </small>
                            </div>

                            <h6 className="fw-bold">Preparación:</h6>
                            <ol className="ps-3 small text-secondary">
                                <li className="mb-1">Dobla el filtro, colócalo y mójanlo con agua caliente (elimina sabor a papel).</li>
                                <li className="mb-1">Agrega el café y haz un hueco en el centro.</li>
                                <li className="mb-1"><strong>Bloom:</strong> Vierte 30ml de agua y espera 30 seg.</li>
                                <li className="mb-1">Vierte el resto del agua en círculos lentos y constantes sin tocar los bordes.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                
                <div className="col-md-4 mb-4">
                    <div className="card shadow h-100 border-0" style={{ overflow: 'hidden' }}>
                        <img src="/img/cafe_en_moka.png" className="card-img-top" alt="Moka Italiana" style={imgStyle} />
                        <div className="card-body">
                            <h3 className="card-title" style={{ color: '#A6634B' }}>Moka Italiana</h3>
                            <h6 className="card-subtitle mb-3 text-muted">El espresso casero</h6>
                            
                            
                            <div className="alert alert-warning py-2 px-3 mb-3" style={{ backgroundColor: '#fff3cd', borderColor: '#ffecb5', color: '#664d03' }}>
                                <small>
                                    <strong>Molienda:</strong> Fina (Arena fina)<br/>
                                    <strong>Agua:</strong> Pre-calentada<br/>
                                    <strong>Fuego:</strong> Bajo / Medio
                                </small>
                            </div>

                            <h6 className="fw-bold">Preparación:</h6>
                            <ol className="ps-3 small text-secondary">
                                <li className="mb-1">Llena la base con agua caliente hasta justo debajo de la válvula.</li>
                                <li className="mb-1">Llena el filtro con café al ras, <strong>sin presionar</strong> (muy importante).</li>
                                <li className="mb-1">Enrosca bien (cuidado, la base quema) y pon al fuego bajo.</li>
                                <li className="mb-1">Deja la tapa abierta. Cuando empiece a salir café, baja el fuego.</li>
                                <li className="mb-1">Al comenzar el gorgoteo ("sputtering"), retira del fuego y enfría la base.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5 pt-5 pb-5 opacity-75 hover-opacity-100">
                <p className="small text-muted fst-italic">
                    ¿Llegaste hasta aquí? Te mereces un descanso...
                </p>
                
                <img 
                    src="/img/paletas.gif"
                    alt="Easter Egg??" 
                    className="img-fluid rounded"
                    style={{ maxWidth: '300px', transition: 'transform 0.3s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2) rotate(10deg)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                />
            </div>

        </div>
    );
};