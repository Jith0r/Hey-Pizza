"use client"
import { useSession } from 'next-auth/react'
import EditImage from '../../components/layout/EditImage'
import UserTabs from '../../components/layout/UserTabs'
import UserForm from '../../components/layout/UserForm'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners'

export default function ProfilePage() {

    // On récupere la session avec useSession()
    const session = useSession();

    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false); // Pour voir les onglet en même temps

    // On grabb le status de la session et on l'attribut à status pour les vérifications
    const status = session.status;

    // Pour afficher le nom et prénom etc.. à chaque rechargement de page ainsi que l'image
    useEffect(() => {

        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data)
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }

    }, [session, status])
    

    // Chargement si le status est loading ou le profil n'est pas encore fetch
    if (status === 'loading' || !profileFetched) {
        return <div className='flex justify-center'>
              <BeatLoader
                    color="#d63644"
                    size={15}
                />
        </div>
    }
    
    // On redirige sur la page de connexion si on est pas authentifier
    if (status === 'unauthenticated') {
       return redirect('/login');
    }



    // Fonction pour mettre à jour le profil
    async function handleProfileUpdate(e, data) {
        e.preventDefault();

        //Pour afficher les toast à chaque cas après le fetch
        const savingPromise = new Promise(async (resolve, reject) => {
            
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            // Si c'est bon on envoi resolve() [success] sinon reject()
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Chargement...',
            success: 'Le profil a été mis à jour !',
            error: 'Oops un problème est survenue !'
        })
    }


    return (
        <section className="mt-8">

            <UserTabs isAdmin={isAdmin} />

            <div className='max-w-2xl mx-auto'>
                <UserForm user={user} onSave={handleProfileUpdate} />
            </div>
        </section>
    )
}