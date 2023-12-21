"use client";
import { useState } from 'react';
import { useProfile } from '../../../components/useProfile'
import toast from 'react-hot-toast';
import UserTabs from '../../../components/layout/UserTabs'
import ProductForm from '../../../components/layout/ProductForm';
import Link from 'next/link';
import Fleche2 from '@/components/icons/Fleche2';
import { redirect }  from 'next/navigation'

export default function NewProductPage() {


    const [redirectSuccess, setRedirectSuccess] = useState(false);
    const { loading, data } = useProfile();

    if (loading) {
        return 'Chargement...'
    }

    if (!data.admin) {
        return "Vous n'êtes pas administrateur !"
    }

     //Fonction au soumission du formulaire // voir data => ProductForm.js
    async function handleFormSubmit(e, data) {
        e.preventDefault();

        // On stock dans un promesse pour utiliser les alertes toasts
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/product', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'En cours de création...',
            success: 'Produit crée avec succès !',
            error: 'Oops une erreur est survenue..'
        })

        setRedirectSuccess(true)
    }

    if (redirectSuccess) {
        return redirect('/product');
    }

    return (
        <section className="mt-8">

            <UserTabs isAdmin={true} />

            <div className='max-w-2xl mx-auto mt-8'>
                <Link href={'/product'} className='button'>
                    <Fleche2/>
                    <span>Voir tous les produits</span>
                </Link>
            </div>

            <ProductForm onSubmit={handleFormSubmit} productItem={null}  />
           
        </section>
    )
}