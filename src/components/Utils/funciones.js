import Swal from 'sweetalert2';
import axios from 'axios';

export function showAlert(title, icon, focus=''){
    if(focus !== '') document.getElementById(focus).focus();

    Swal.fire({
        title: title,
        icon: icon,
        customClass: {confirmButton: 'px-4 py-2 bg-blue-500 text-white', popup: 'animated zoonIn'},
        buttonsStyling: false,
    });
}

export function showConfirmAlert(url, id, title, message){
    var url = url + id;
    const swalWithTailwindButtons = Swal.mixin({
        customClass: {confirmButton: 'px-4 py-2 bg-green-500 text-white m-3', cancelButton: 'px-4 py-2 bg-red-500 text-white m-3'},
        buttonsStyling: false,
    });

    swalWithTailwindButtons.fire({
        title: title,
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
    }).then((result) => {
        if(result.isConfirmed){
            sendResultResponse('DELETE', {id: id}, url, 'Eliminado con exito');
        }
        else{
            showAlert('operación cancelada', 'info');
        }
    });
}

export function sendResultResponse(method, params, url, message){
    axios({
        method: method,
        url: url,
        data: params
    }).then(response => {
        if(response.status == 200){
            showAlert(message, 'success');
            window.setTimeout(() => {
                window.location.href='/';
            }, 1000);
        }else{
            showAlert('No se puedo recuperar la respuesta', 'error');
        }       
    }).catch(error => {
        showAlert('Ha ocurrido un error', 'error');
    });
}