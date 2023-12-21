"use client"
import { useState } from "react";
import { useProfile } from "../useProfile";
import AddressInputs from "./AddressInputs";
import EditImage from "./EditImage";

export default function UserForm({user, onSave}) {

    // Les states pour le formulaire
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [city, setCity] = useState(user?.city || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [admin, setAdmin] = useState(user?.admin || false);


    // Savoir si on est connecter en tant qu'admin
    // renomme data en loggedUserData
    const { data: loggedUserData } = useProfile();
    
    function handleAddressChange(propName, value) {
        //propName = city, address, phone etc
        if (propName === 'phone') setPhone(value);
        if (propName === 'city') setCity(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'postalCode') setPostalCode(value);
    }


    return (
        <div className='flex flex-col gap-4'>

                    <div className='flex flex-col justify-center items-center'>
                        <EditImage link={image} setLink={setImage} />
                    </div>

            <form
                className='grow'
                onSubmit={e => onSave(e, {name:userName, image, phone, streetAddress, city, postalCode, admin})} 
            >
                
                        <label>Adresse e-mail</label>
                        <input type="email" disabled={true} value={user?.email} />
                        
                        <label>Nom et prénom </label>
                        <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder='Votre nom et prénom' />
                        
                <AddressInputs
                    addressProps={{ phone, streetAddress, city, postalCode }}
                    setAddressProps={handleAddressChange}
                />
                       
                        {loggedUserData.admin && (
                                <div className="flex gap-2 p-2">
                                            <input
                                                value={'1'}
                                                checked={admin}
                                                onChange={e => setAdmin(e.target.checked)}
                                                id="adminCheckBox"
                                                type="checkbox"
                                            />
                                            <label htmlFor="adminCheckBox">Administrateur</label>
                                </div>
                        )}

                        
                        <button className='mt-3' type='submit'>Enregistrer</button>
            </form>

        </div>
    )
}