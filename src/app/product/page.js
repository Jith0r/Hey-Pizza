"use client";
import Fleche from '@/components/icons/Fleche';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/useProfile'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';


export default function ProductPage() {

    const [productItems, setProductItems] = useState([]); // Pour lister les produits

    const { loading, data } = useProfile();

    // Pour lister tous les produits quand la page se charge
    // On va fetch l'endpoint
    // On récupere la response en json
    // On attribut à setProductItems les produits en question
    useEffect(() => {
        fetch('/api/product').then(res => {
            res.json().then(data => {
                setProductItems(data)
            })
        })
    },[])

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
        <section className='mt-8 max-w-2xl mx-auto'>
            <UserTabs isAdmin={true} />

            <div className='mt-8'>
                <Link className='button' href={'/product/new'}>
                    Crée un nouveau produit
                    <Fleche/>
                </Link>
            </div>

            {/* Tous les produits */}

            <h2 className='text-sm text-gray-500 mt-8 mb-2'>Gérer les produits</h2>
            <div className='grid grid-cols-3 gap-2'>
                {productItems?.length > 0 && productItems.map(item => (
                    /* éditer un produit */
                    <Link key={item._id} href={'/product/edit/' + item._id} className='button mb-1 flex-col'>
                        <div className="relative">
                            <Image src={item.image} alt={item.name} width={100} height={100} />
                        </div>
                        <div className='text-center'>
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
       </section>
    )
}