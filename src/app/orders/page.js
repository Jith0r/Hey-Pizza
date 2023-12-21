"use client"
import { format } from 'date-fns';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';


export default function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true); // Chargement
    const {loading, data} = useProfile()

    //Récupérer les commandes
    useEffect(() => {
        fetchOrders();
    }, [])
    
    function fetchOrders() {
        setLoadingOrders(true);
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse()) // Pour afficher du plus recent au plus ancien
                setLoadingOrders(false);
            })
        })
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={data.admin }/>

            <div className="mt-8">
                {loadingOrders && (
                   <div className='flex justify-center'>
                        <BeatLoader
                                color="#d63644"
                                size={15}
                            />
                    </div>
                )}


                 {orders?.length > 0 && orders.map(order => (
                     <div key={order._id} className="bg-gray-100 mb-2 p-4 rounded-lg md:flex items-center gap-4 ">
                         
                         <div className='grow flex items-center gap-3'>
                             <div>
                                <div className={
                                    (order.paid ? 'bg-green-500' : 'bg-red-500')
                                    + ' p-2 rounded-md text-white w-24 text-center'}>
                                    {order.paid ? 'Payé' : 'Impayé'}
                                </div>
                             </div>
                         </div>

                         <div>
                            <div>{order.userEmail}</div>
                            <div className='text-gray-500 text-sm'>{order.cartProducts.map(p => p.name).join(', ')}</div>
                         </div>

                         <div>
                              {format(new Date(order.createdAt), "dd/MM/yyyy à HH:mm")}
                        </div>

                         
                         <div className="">
                             <Link className='button' href={'/orders/'+order._id}>Voir commande</Link>
                         </div>
                     
                     </div>
                ))}
            </div>
        </section>
    )
}