import { useState } from "react"

//Composant du boutton de suppression avec confirmation
export default function DeleteButton({ label, onDelete }) {

    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="fixed bg-black/50 inset-0 flex items-center h-full justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <div>Voulez-vous vraiment supprimer ?</div>
                    <div className="flex gap-2 mt-1">
                        <button type="button" onClick={() => { onDelete(); setShowConfirm(false) }} className="primary">Supprimer</button>
                        <button type='button' onClick={() => setShowConfirm(false)}>Annuler</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <button onClick={() => setShowConfirm(true)} type="button">{label}</button>
    )
}