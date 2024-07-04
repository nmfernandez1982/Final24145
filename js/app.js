document.addEventListener('DOMContentLoaded', function() 
{
const form = document.getElementById('itemForm');
const itemsTableBody = document.getElementById('itemsTableBody');

form.addEventListener('submit', function(event) 
{
    event.preventDefault();

    const formData = new FormData(form);
    const itemId = formData.get('id');

    // Construir objeto con los datos del formulario
    const data = {
        id: formData.get('id'),
        titulo: formData.get('titulo'),
        fecha_lanzamiento: formData.get('fecha_lanzamiento'),
        genero: formData.get('genero'),
        duracion: formData.get('duracion'),
        director: formData.get('director'),
        reparto: formData.get('reparto'),
        sinopsis: formData.get('sinopsis')      
    }; 

    if (itemId) 
        {
        updateItem(data);
    } else {
        createItem(data);
    }
});

function createItem(data) 
{
    fetch('http://localhost/_Final2024php/api/api.php', 
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => 
        {
        if (!response.ok) 
            {
            throw new Error('Network response was not ok');
            }
        return response.json();
    })
    .then(result => {
        console.log('Success:', result);
        
        // Aquí podrías mostrar un mensaje de éxito al usuario, por ejemplo
        loadItems();  // Supongo que esta función carga los items actualizados
        form.reset();
    })
    .catch(error => 
        {
        console.error('Error:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
        alert('Error al ingresar el item');
    });
}

   
// Función para cargar los elementos desde la API
function loadItems() {
    fetch('http://localhost/_Final2024php/api/api.php')
    .then(response => response.json())
    .then(data => {
        itemsTableBody.innerHTML = '';
        if (data.peliculas) 
            {
            data.peliculas.forEach(pelicula => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pelicula.id}</td>
                    <td>${pelicula.titulo}</td>
                    <td>${pelicula.fecha_lanzamiento}</td>
                    <td>${pelicula.genero}</td>
                    <td>${pelicula.duracion}</td>
                    <td>${pelicula.director}</td>
                    <td>${pelicula.reparto}</td>
                    <td>${pelicula.sinopsis}</td>                    
                    <td>
                        <button class="btn btn-danger" onclick="deleteItem(${pelicula.id})">Eliminar</button>
                    </td>
                    <td>
                        <button class="btn btn-success" onclick="editItem(
                        ${pelicula.id}, 
                        '${pelicula.titulo}', 
                        '${pelicula.fecha_lanzamiento}', 
                        '${pelicula.genero}', 
                        '${pelicula.duracion}', 
                        '${pelicula.director}', 
                        '${pelicula.reparto}',
                        '${pelicula.sinopsis}')">Editar</button>
                    </td>
                `;
                itemsTableBody.appendChild(row);
            });
        } 
        else 
        {
            console.error('No se encontraron películas');
        }
    })
    .catch(error => console.error('Error:', error));
}
   

  // Función para borrar una pelicula
  function deleteItem(id) 
  {
    fetch(`http://localhost/_Final2024php/api/api.php?id=${id}`, 
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => 
        {            
            loadItems();   
               
        })
    ;
    loadItems();
}



function updateItem(data) 
    {
        fetch(`http://localhost/_Final2024php/api/api.php?id=${data.id}`, 
            {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => 
            {
            if (!response.ok) 
                {
                throw new Error('Network response was not ok');
                }
            return response.json();
        })
        .then(result => {
            console.log('Success:', result);   
           
            loadItems();  // Supongo que esta función carga los items actualizados
            form.reset();
        })
        .catch(error => 
            {
            console.error('Error:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
            alert('Error al actualizar el item');
        });
    }



  window.editItem = function(id, titulo, fecha_lanzamiento,genero,duracion,director,reparto,sinopsis) 
  {
    document.getElementById('id').value = id;
    document.getElementById('titulo').value = titulo;
    document.getElementById('fecha_lanzamiento').value = fecha_lanzamiento;
    document.getElementById('genero').value = genero;
    document.getElementById('duracion').value = duracion;
    document.getElementById('director').value = director;
    document.getElementById('reparto').value = reparto;
    document.getElementById('sinopsis').value = sinopsis;
  };
  
   window.deleteItem = deleteItem;
    loadItems();
});