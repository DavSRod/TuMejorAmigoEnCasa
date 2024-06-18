import React, { useState, useEffect } from 'react'

const ConfirmacionModal = ({ show, onConfirm, onCancel }) => {

    if (!show) {
        return null
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50'>
            <div className='bg-blue-900 p-6 rounded shadow-lg'>
                <p className='text-white'>¿Estás seguro de que quieres eliminar esta mascota?</p>
                <div className='flex justify-end space-x-2 mt-5'>
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Confirmar</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmacionModal
