import Swal from 'sweetalert2';

const showConfirmationDialog = (message) => {
    return Swal.fire({
        title: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        return result.isConfirmed;
    });
};


export default showConfirmationDialog