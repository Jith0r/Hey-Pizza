"use client"
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import {useProfile} from '../../components/useProfile'

export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const { loading, data } = useProfile();

    // Récupérer tous les utilisateurs
    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users); // On attribut les valeurs à setUsers
            })
        })
    })

    if (loading) {
        return <div className='flex justify-center'>
              <BeatLoader
                    color="#d63644"
                    size={15}
                />
        </div>
    }

    if (!data.admin) {
        return "Vous n'êtes pas administrateur"
    }



    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                {users.length > 0 && users.map(user => (
                    <div key={user._id} className="bg-gray-100 rounded-lg mb-2 p-1 px-4 md:flex items-center gap-4">
                        
                        <div className="flex gap-2 grow">
                            <span>{user.name || 'Pas de nom'}</span> -
                            <span className="text-gray-500">{user.email}</span>
                        </div>

                        <div>
                            <Link className="button" href={'/users/'+user._id}>Editer</Link>
                        </div>

                    </div>
                )) }
            </div>
        </section>
    )
}