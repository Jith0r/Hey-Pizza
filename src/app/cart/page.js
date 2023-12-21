"use client"
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useProfile } from "@/components/useProfile";
import CartProduct from '../../components/menu/CartProduct'
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function CartPage() {

    //Grabb les products du panier avec cartContext
    const { cartProducts, removeCartProduct } = useContext(CartContext)
    const [address, setAddress] = useState({});
    
    const { data: profileData } = useProfile();
    

    //Paiement non réussie
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error("Oops.. le paiement a échoué")
            }
        }
    },[])
    
    // Pour avoir les information de livraison si on a déjà ces informations dans le profil
    useEffect(() => {
        if (profileData?.city) {
            //On grabb que téléphone, adresse de profileData
            const { phone, streetAddress, city, postalCode } = profileData;
            // On attribut ces valeurs à addressFromProfile
            const addressFromProfile = {phone, streetAddress, city, postalCode};
            setAddress(addressFromProfile)
        }
    },[profileData])
    
    //Calculer le total du panier
    let subTotal = 0;
    for (const product of cartProducts) {
        subTotal += cartProductPrice(product);
    }

    function handleAddressChange(propName, value) {
        setAddress(prevAddress => {
            return {...prevAddress, [propName]:value}
        })
    }

    //Fonction pour passer à stripe au paiement
    async function stripeCheckout(e) {
        e.preventDefault();

        const promiseCheckout = new Promise(async (resolve, reject) => {
            //Grabb les information de livraison + les produit de la carte
            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    cartProducts
                }),
            }).then(async (response) => {
                if (response.ok) {
                    resolve()
                    window.location = await response.json() // Redirection vers stripe
                } else {
                    reject();
                }
                
            });
        });

        await toast.promise(promiseCheckout, {
            loading: 'En cours de chargement...',
            success: 'Redirection vers le paiement',
            error: 'Oops une erreur est survenue'
        })

    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 flex flex-col justify-center items-center text-center ">
                <SectionHeaders mainHeader={"Votre Panier"} />
                <p className="mt-4">
                    Oops.. votre panier est vide..
                    <Image src={'/pizzavide.png'} width={600} height={600} alt={'Pizza'} />
                   
                </p>
            </section>
        );
    }

    return (
        <section className="mt-8">

            <div className="text-center">
                <SectionHeaders mainHeader={'Votre Panier'}/>
            </div>

            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>

                    {cartProducts?.length === 0 && (
                        <div>Pas de produit dans votre panier</div>
                    )}

                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct key={index} product={product} index={index} onRemove={removeCartProduct} />
                    ))}
                    <div className="py-4 pr-16 flex justify-end items-center">
                        <div className="text-gray-500">
                            Prix :<br />
                            Frais de livraison :<br />
                            Total :
                        </div>
                        <div className="font-semibold pl-2 text-right">
                            {subTotal}€<br/>
                            5€<br />
                            {subTotal + 5}€
                        </div>
                    </div>
                </div>

                {/* Côté droit du panier */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="mb-2">Information de livraison</h2>   
                    <form onSubmit={stripeCheckout}>
                         <AddressInputs
                            addressProps={address}
                            setAddressProps={handleAddressChange}
                         />
                        <button type="submit">Payer {subTotal + 5}€</button>
                    </form>
                </div>  

            </div>
        </section>
    )
}