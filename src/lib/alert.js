import Swal from "sweetalert2"

export const alertSuccess = async (message) => {
    return Swal.fire({
        icon : 'success',
        title : 'Success',
        text : message
    })
}

export const alertError = async (message) => {
    return Swal.fire({
        icon : 'error',
        title : 'Ups..Something Wrong',
        text : message
    })
}

export const alertConfirm = async (message) => {
    const result = await Swal.fire ({
        icon : 'question',
        title : 'Are You Sure',
        text : message,
        showCancelButton : true,
        confirmButtonText : 'YES'
    })

    return result.isConfirmed
}