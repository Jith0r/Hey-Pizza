// Numéro de téléphone, adresse, ville, code postale
export default function AddressInputs({addressProps, setAddressProps, disabled=false}) {

    const { phone, streetAddress, city, postalCode } = addressProps;


    return (
        <>
         {/* Adresse form */}
                        <label>Numéro de téléphone</label>
                        <input disabled={disabled} type="tel" value={phone || ''} onChange={e => setAddressProps('phone', e.target.value)} placeholder='Numéro de téléphone' />
                        
                        <label>Adresse</label>
                        <input disabled={disabled} type="text" value={streetAddress || ''} onChange={e => setAddressProps('streetAddress', e.target.value)} placeholder='Adresse' />

                        <label>Ville</label>
                        <input disabled={disabled}  type="text" value={city || ''} onChange={e => setAddressProps('city', e.target.value)} placeholder='Ville' />
                            
                        <label>Code Postal</label>
                        <input disabled={disabled} type="text" value={postalCode || ''} onChange={e => setAddressProps('postalCode', e.target.value)} placeholder='Code postal' />

        </>
    )
}