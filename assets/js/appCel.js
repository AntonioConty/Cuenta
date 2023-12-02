const agregarCelular= async()=>{
    var marca=document.querySelector("#marca").value;
    var ram=document.querySelector("#ram").value;
    var rom=document.querySelector("#rom").value;
    var sistema=document.querySelector("#sistema").value;
    var procesador=document.querySelector("#procesador").value;
    

    if(marca.trim()==='' || ram.trim()==='' || rom.trim()==='' || sistema.trim()==='' || procesador.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Llena todos los Campos',
            footer: 'CRUD CELULAR'
        })  
        return;       
    }

    // INSERTAR A LA BASE DE DATOS
    const datos=new FormData();
    datos.append("marca",marca);
    datos.append("ram",ram);
    datos.append("rom",rom);
    datos.append("sistema",sistema);
    datos.append("procesador",procesador);

    var respuesta=await fetch("php/celular/agregarCelular.php",{
        method:'POST',
        body:datos
    });

    var resultado=await respuesta.json();

    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO!',
            text: resultado.mensaje,
            footer: 'CRUD CELULAR'
          }) 
          document.querySelector("#formAgregar").reset();
         
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD AUTOS'
          }) 
    }
    document.querySelector("#agregarModal").click();
    cargarCelulares();
}

const cargarCelulares=async()=>{

    var respuesta=await fetch("php/celular/cargarCelulares.php",{});
    var registrosHTML=``;
    var resultado=await respuesta.json();

    //console.log(resultado);

    resultado.data.forEach(fila=>{
        registrosHTML+=`
        <tr>
        <td>${fila[1]}</td>
        <td>${fila[2]}</td>
        <td>${fila[3]}</td>
        <td>${fila[4]}</td>
        <td>${fila[5]}</td>
        <td><button class="btn btn-dark "  data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarCelular(${fila[0]})"><i class="bi bi-pencil-square p-1"></i>Editar</button></td>
        <td><button class="btn btn-primary" onclick="eliminarCelular(${fila[0]})"> <i class="bi bi-trash p-1"></i>Eliminar</button></td>
      </tr>
        `;
    });
    document.querySelector("#registros").innerHTML=registrosHTML;

}

const eliminarCelular=(celularid)=>{
    Swal.fire({
        title: '¿Estás seguro de eliminar este Celular?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        confirmButtonColor: '#0d6efd',
        denyButtonText: 'NO',
      }).then(async(result) => {
        if (result.isConfirmed) {

            const datos=new FormData();
                datos.append("celularid",celularid);

            var respuesta=await fetch("php/celular/eliminarCelular.php",{
                method:'POST',
                body:datos
            });
        
            var resultado=await respuesta.json();
        
            if(resultado.success==true){
                Swal.fire({
                    icon: 'success',
                    title: 'EXITO!',
                    text: resultado.mensaje,
                    footer: 'CRUD CELULAR'
                  }) 
                 
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: resultado.mensaje,
                    footer: 'CRUD CELULAR'
                  }) 
            }
            cargarCelulares();         
        } 
      })
}

const cargarCelular=async(celularid)=>{
    const datos=new FormData();
    datos.append("celularid",celularid);
    
    var respuesta=await fetch("php/celular/cargarCelular.php",{
        method:'POST',
        body:datos
    });
    
    var resultado=await respuesta.json();
    document.querySelector("#celularid").value=resultado.celularid;
    document.querySelector("#zmarca").value=resultado.marca;
    document.querySelector("#zram").value=resultado.ram;
    document.querySelector("#zrom").value=resultado.rom;
    document.querySelector("#zsistema").value=resultado.sistema;
    document.querySelector("#zprocesador").value=resultado.procesador;

}

const editarCelular=async()=>{
    var celularid=document.querySelector("#celularid").value;
    var marca=document.querySelector("#zmarca").value;
    var ram=document.querySelector("#zram").value;
    var rom=document.querySelector("#zrom").value;
    var sistema=document.querySelector("#zsistema").value;
    var procesador=document.querySelector("#zprocesador").value;

    if(marca.trim()==='' || ram.trim()==='' || rom.trim()==='' || sistema.trim()==='' || procesador.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Llena todos los Campos',
            footer: 'CRUD CELULAR'
          })  
        return;       
    }

     // MODIFICAR EN LA BASE DE DATOS
     const datos=new FormData();
     datos.append("celularid",celularid);
     datos.append("marca",marca);
     datos.append("ram",ram);
     datos.append("rom",rom);
     datos.append("sistema",sistema);
     datos.append("procesador",procesador);
     
 
     var respuesta=await fetch("php/celular/editarCelular.php",{
         method:'POST',
         body:datos
     });
 
     var resultado=await respuesta.json();
     document.querySelector("#editarModal").click();
     if(resultado.success==true){        
         Swal.fire({
             icon: 'success',
             title: 'EXITO!',
             text: resultado.mensaje,
             footer: 'CRUD CELULAR'
           }) 
           document.querySelector("#formEditar").reset();
          
     }else{
         Swal.fire({
             icon: 'error',
             title: 'ERROR',
             text: resultado.mensaje,
             footer: 'CRUD CELULAR'
           }) 
     }     
     cargarCelulares();

}