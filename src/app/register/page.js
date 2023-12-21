"use client" // c'est un component client
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [creatingUser, setCreatingUser] = useState(false); // Création de l'utilisateur
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false)
    
    // Fonction pour l'inscription, une fois le formulaire soumis
    // On fait appel à la route de notre api (register)
    async function handleFormSubmit(e) {
        e.preventDefault();

        setCreatingUser(true);
        setError(false);
        setUserCreated(false);

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        //console.log(response) on retrouve la key "ok:true ou false"
        // si la réponse est ok donc true
        if (response.ok) {
            setUserCreated(true); // L'utilisateur a été crée 
            setEmail(''); //  Les champs deviennent vide
            setPassword('');
        } else {
            setError(true)
            setEmail(''); //  Les champs deviennent vide
            setPassword('');
        }
                   
        setCreatingUser(false);
    }


    return (
        <section className="mt-8">

            <h1 className="flex flex-col justify-center items-center text-center text-primary font-bold text-4xl mb-5">
                <Image src={'/pizzaanim.jpg'} width={100} height={100} alt={'Pizza'} /> 
                Inscription 
            </h1>
            
            {userCreated && (
                <div className="my-4 text-center">
                    Utilisateur crée avec succès ! <br />
                    Cliquez-
                    <Link className="underline" href={'/login'}>ici</Link>{' '}
                    pour vous connecter !
                </div>
            )}

            {error && (
                 <div className="my-4 text-center">
                    Une erreur est survenue.. <br />
                    Cet adresse e-mail éxiste déjà !
                </div>
            )}

            <form onSubmit={handleFormSubmit} className="block max-w-sm mx-auto">

                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Votre Adresse e-mail"
                    disabled={creatingUser} /* Si creatingUser est true alors on disable */
                />
                
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    disabled={creatingUser}
                />
                
                <button disabled={creatingUser} type="submit">Inscription</button>
                <button onClick={() => signIn('google', {callbackUrl:'/'}) } className="mt-2 flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={'Connexion avec Google'} width={24} height={24} />
                    Connexion avec Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Vous êtes déjà membre ? <Link className="underline" href={'/login'}>Connectez-vous !</Link>
                </div>
            </form>
        </section>
    )
}