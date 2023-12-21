"use client"
import AddressInputs from '@/components/layout/AddressInputs'
import CartProduct from '@/components/menu/CartProduct'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import {CartContext, cartProductPrice} from '../../../components/AppContext'
import SectionHeaders from '../../../components/layout/SectionHeaders'

export default function OrderPage() {

    const { clearCart } = useContext(CartContext)
    const { id } = useParams();

    const [order, setOrder] = useState()

    //Pour clear le panier
    useEffect(() => {
        if (typeof window.console !== "undefined") {
            if (window.location.href.includes('?clear-cart=1')) {
                clearCart();
            }
        }
        if (id) {
            fetch('/api/orders?_id='+id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData)
                })
            })
        }
    }, [])
    
    // Prix de départ
    let subtotal = 0;
    if (order?.cartProducts) {
        for (const product of order?.cartProducts) {
            subtotal += cartProductPrice(product);
        }
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">

            <div className="text-center">
                <SectionHeaders mainHeader={"Patience.. ça arrive !"} />
                <div className="mt-4 mb-8">
                    <p>Merci pour votre commande !</p>
                    <p>Vérifiez votre téléphone, le livreur va vous appeler une fois arriver à votre adresse !</p>
                </div>
            </div>

            {order && (
                <div className='md:grid grid-cols-2 gap-16'>
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProduct key={product._id} product={product} />
                        ))}
                        <div className='text-right py-2 text-gray-500'>
                            Prix : <span className="text-black font-bold inline-block w-8">{subtotal}€</span><br />
                            Frais de livraison : <span className="text-black font-bold inline-block w-8 ">5€</span><br />
                            Prix total : <span className="text-black font-bold inline-block w-8">{subtotal + 5}€</span>
                            <Image src={'/pizzalivraison.png'} width={200} height={200} alt={'Pizza'} />
                        </div>
                    </div>

                    <div>
                        <div className='bg-gray-100 p-4 rounded-lg'>
                            <AddressInputs disabled={true} addressProps={...order}/>
                        </div>
                    </div>
                </div>
            )}
            
        </section>
    )
}