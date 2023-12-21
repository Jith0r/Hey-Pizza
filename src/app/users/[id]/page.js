"use client"
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useProfile} from '../../../components/useProfile'


export default function EditUserPage() {

    const { loading, data } = useProfile();
    const [user, setUser] = useState(null)
    const { id } = useParams(); // Récupérer l'id via l'url


    useEffect(() => {
        fetch('/api/profile?_id='+id).then(response => {
            response.json().then(user => {
                setUser(user);
            })
        })
    }, []);

    async function handleSaveButtonClick(e, data) {
        e.preventDefault();

        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...data, _id:id}),
                })
            
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        })

        await toast.promise(promise, {
            loading: 'Enregistrement en cours...',
            success: 'Enregistrement avec succès',
            error: 'Oops une erreur est survenue'
        })

    }


    if (loading) {
        return 'Chargement en cours...'
    }

    if (!data.admin) {
        return "Vous n'êtes pas administrateur"
    }



    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true} />

            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>

        </section>
    )
}