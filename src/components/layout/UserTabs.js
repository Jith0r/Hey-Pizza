"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

//Onglet utilisateur (mon profil)
export default function UserTabs({ isAdmin }) {
    
    const path = usePathname(); // Pour savoir quel est le lien et pour rendre les bouton active ou non

    return (
            <div className='flex justify-center gap-2 my-5 tabs flex-wrap'>
                
            <Link
                /* Si le path est /profile alors on est dans la page donc le bouton devient active */
                className={path === '/profile' ? 'active' : ''}
                href={'/profile'}
            >
                Mon compte
            </Link>
                
            
            {isAdmin && (
                    <>
                        <Link className={path === '/categories' ? 'active' : ''} href={'/categories'}>Catégories</Link>
                        <Link className={path.includes('product') ? 'active' : ''} href={'/product'}>Produits</Link>
                        <Link className={path.includes('/users') ? 'active' : ''} href={'/users'}>Utilisateurs</Link>
                    </>
            )}

            <Link className={path === '/orders' ? 'active' : ''} href={'/orders'}>Commandes</Link>
            
            </div>
    )
}