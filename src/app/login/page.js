"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false); // Pour disable les boutton

    async function handleFormSubmit(e) {
        e.preventDefault();

        setLoginInProgress(true); // Il passe à true

        signIn('credentials', {email, password, callbackUrl:'/'}) //callbackUrl sert à rediriger une fois connecter
        
        setLoginInProgress(false); // On est connecter donc false
    }

    return (
        <section className="mt-8">
            <h1 className="flex flex-col justify-center items-center font-bold text-center text-primary text-4xl mb-5">
                <Image src={'/pizzaanim2.jpg'} width={100} height={100} alt={'Pizza'} /> 
                Connexion
            </h1>

            <form onSubmit={handleFormSubmit} className="block max-w-sm mx-auto">
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Votre Adresse e-mail"
                    disabled={loginInProgress} /* Si creatingUser est true alors on disable */
                />
                
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    disabled={loginInProgress}
                />
                
                <button disabled={loginInProgress} type="submit">Connexion</button>
                <button onClick={() => signIn('google', {callbackUrl:'/'}) } className="mt-2 flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={'Connexion avec Google'} width={24} height={24} />
                    Connexion avec Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Vous n&apos;êtes pas membre ? <Link className="underline" href={'/register'}>Inscrivez-vous !</Link>
                </div>
            </form>
        </section>
    );
}
