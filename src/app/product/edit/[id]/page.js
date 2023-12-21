"use client";
import { useState } from 'react';
import { useProfile } from '../../../../components/useProfile'
import toast from 'react-hot-toast';
import UserTabs from '../../../../components/layout/UserTabs'
import Link from 'next/link';
import Fleche2 from '@/components/icons/Fleche2';
import { redirect, useParams }  from 'next/navigation'
import { useEffect } from 'react';
import ProductForm from '../../../../components/layout/ProductForm';
import DeleteButton from '../../../../components/DeleteButton'

export default function EditProductPage() {

    // Récupérer l'id via l'url
    const {id} = useParams();

    const [productItem, setProductItem] = useState(null)
    const [redirectSuccess, setRedirectSuccess] = useState(false);
    const { loading, data } = useProfile();

    //Fetch les données du produit en question
    useEffect(() => {
        fetch('/api/product').then(res => {
            res.json().then(products => {
                // Le produit a t-il le même id que dans l'url /edit/id
                const product = products.find(p => p._id === id);
                setProductItem(product)
            })
        })
    },[])

    if (loading) {
        return 'Chargement...'
    }

    if (!data.admin) {
        return "Vous n'êtes pas administrateur !"
    }





     //Fonction au soumission du formulaire
    async function handleFormSubmit(e, data) {
        e.preventDefault();

        // On récupere toute les information de data + l'id qu'on récupere via l'url product/edit/id/
        data = {...data, _id:id}

        // On stock dans un promesse pour utiliser les alertes toasts
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/product', {
                method: 'PUT',
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
            loading: 'En cours de modification...',
            success: 'Produit modifié avec succès !',
            error: 'Oops une erreur est survenue..'
        })

        setRedirectSuccess(true)
    }

    //Fonction pour supprimer le produit
    async function handleDelete() {
        const promiseDelete = new Promise(async (resolve, reject) => {
            
            const response = await fetch('/api/product?_id=' + id, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
            
        });

        await toast.promise(promiseDelete, {
            loading: 'Suppression en cours...',
            success: 'Suppression avec succès',
            error: 'Oops une erreur est survenue'
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

            <ProductForm onSubmit={handleFormSubmit} productItem={productItem} />
            <div className='max-w-md mx-auto mt-2'>
                <div className='max-w-xs ml-auto pl-4'>
                    <DeleteButton
                        label="Supprimer ce produit"
                        onDelete={handleDelete} // On attribut handleDelete à onDelete props
                    />
                </div>
            </div>
        </section>
    )
}