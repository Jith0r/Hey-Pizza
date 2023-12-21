"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import Panier from '../icons/Panier'
import Hamburger from '../icons/Hamburger'

// Fonction pour afficher les liens dans la navBAR
function AuthLinks({ status, userName}) {
    {/* Si on est authentifier alors on affiche déconnexion */}
    if (status === 'authenticated') {
        return (
            <>
                {/* whitespace-nowrap => pour pas couper les mots et l'avoir sur une seule ligne */}
                 <Link href={'/profile'} className='whitespace-nowrap'>
                    Bienvenue, {userName}
                </Link>
                <button onClick={() => signOut()} className='bg-primary rounded-full text-white px-8 py-2'>
                Déconnexion
                </button>
            </>
        );
    }
    
     {/* Si on est pas authentifier alors on affiche connexion et inscription */}
    if (status === 'unauthenticated') {
        return (
            <>
                <Link href={'/login'}>Connexion</Link>
                    
                <Link href={'/register'} className='bg-primary rounded-full text-white px-8 py-2'>
                    Inscription
                </Link>
            </>
        )
    }
}

export default function Header() {

    const session = useSession(); // On grabb la session avec useSession()
    const status = session.status; // On grabb status dans la réponse de session (authenticated ou unauthenticated)
    const userData = session.data?.user; // On grabb l'utilisateur dans session.data.user
    let userName = userData?.name || userData?.email; // Le nom de l'utilisateur ou l'email et on affiche ceci plus bas

    // On grabb les produits du panier
    const { cartProducts } = useContext(CartContext)
    
    //Toggle pour mobile
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    // Est-ce qu'il y a un UserName si oui
    // On utilise la méthode includes & split pour avoir que le Name et pas le nom et prénom
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    return (
        <header>
    
            {/* Navbar Mobile */}
            <div className="flex justify-between items-center md:hidden">

               <Link className="text-primary font-semibold text-2xl" href={'/'}>
                    Hey Pizza
                </Link>

                <div className="flex gap-7 items-center">
                    
                    <Link href={'/cart'} className='relative'>
                        <Panier />
                        {cartProducts?.length > 0 && (
                        <span className="
                        absolute
                        -top-2
                        -right-4
                        bg-primary
                        text-white
                        text-xs
                        py-1
                        px-1
                        rounded-full
                        leading-3
                        ">
                            {cartProducts.length}
                        </span>
                        )}
                        
                    </Link>
                    
                    {/* prev est l'état précédent qui est false on lui attribut true */}
                    <button onClick={() => setMobileNavOpen(prev => !prev)} className="p-1">
                        <Hamburger/>
                    </button>

                </div>
            </div>
            
            
            {mobileNavOpen && (
                <div onClick={() => setMobileNavOpen(false)} className="p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center md:hidden">
                    <Link href={'/'}>ACCUEIL</Link>
                    <Link href={'/menu'}>CARTE</Link>
                    <AuthLinks status={status} userName={userName} />
                </div>

            )}
            

            {/* Navbar Desktop */}
            <div className="hidden md:flex items-center justify-between">
                <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                    <Link className="text-primary font-semibold text-2xl" href={'/'}>
                    Hey Pizza
                    </Link>
                    <Link href={'/'}>ACCUEIL</Link>
                    <Link href={'/menu'}>CARTE</Link>
                </nav>
                <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                    
                    <AuthLinks status={status} userName={userName} />

                    <Link href={'/cart'} className='relative'>
                        <Panier />
                        {cartProducts?.length > 0 && (
                        <span className="
                        absolute
                        -top-2
                        -right-4
                        bg-primary
                        text-white
                        text-xs
                        py-1
                        px-1
                        rounded-full
                        leading-3
                        ">
                            {cartProducts.length}
                        </span>
                        )}
                        
                    </Link>
                    
                </nav>
            </div>
      </header>
    )
}

// Component Header avec le logo et la barre de navigation