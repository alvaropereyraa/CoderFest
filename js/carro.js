function agregarAlCarrito(entrada) {
    const memoriaCarrito = localStorage.getItem("entradas")
    if(!memoriaCarrito) {
        const nuevoProducto = entrada;
        nuevoProducto.cantidad = 1;
        localStorage.setItem("entradas", JSON.stringify([nuevoProducto]));
    }}