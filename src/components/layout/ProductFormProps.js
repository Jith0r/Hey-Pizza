import Trash from '../../components/icons/Trash'
import Plus from '../../components/icons/Plus'
import ChevronBas from '../../components/icons/ChevronBas'
import ChevronHaut from '../../components/icons/ChevronHaut'
import { useState } from 'react'

// Ce composant est l'endroit où on ajoute les taille et les prix correspondant
// Dans le formulaire ProductForm.js
export default function ProductFormProps({ name, addLabel, props, setProps }) {
    
    const [isOpen, setIsOpen] = useState(false); // Pour le chevron ouvert ou pas

 
    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }];
        })
    }

    
    function editProp(e, index, prop) {
        const newValue = e.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    
    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((value, index) => index !== indexToRemove));
    }

    return (
         <div className="bg-gray-300 p-2 rounded-md mb-2">
                    
            <button onClick={() => setIsOpen(prev => !prev)} className='inline-flex p-1 border-0 justify-start' type="button">
                {isOpen && (
                    <ChevronHaut />
                )}
                {!isOpen && (
                     <ChevronBas />
                )}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>
           
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div className="flex items-end gap-2">
                        <div>
                            <label>Nom</label>
                            <input value={size.name}
                                onChange={e => editProp(e, index, 'name')}
                                type="text" placeholder="" />
                        </div>

                        <div>
                            <label>Prix</label>
                            <input
                                value={size.price} onChange={e => editProp(e, index, 'price')}
                                type="text" placeholder="Extra price" />
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={() => removeProp(index)}
                                className="bg-white mb-2 px-2"><Trash/></button>
                        </div>
                    </div>
                ))}
                
                <button
                    type="button"
                    onClick={addProp}
                    className="bg-white items-center">
                    <Plus/>
                    <span>{addLabel}</span>
                </button>
                    
            </div>
        </div>
    )
}
