import { useEffect, useState } from "react";
import EditImage from "./EditImage";
import ProductFormProps from '../../components/layout/ProductFormProps'

//Formulaire pour crée ou modifier (produits)

export default function ProductForm({onSubmit, productItem}) {

    const [image, setImage] = useState(productItem?.image || '');
    const [name, setName] = useState(productItem?.name || '');
    const [description, setDescription] = useState(productItem?.description || '');
    const [basePrice, setBasePrice] = useState(productItem?.basePrice || '');
    const [sizes, setSizes] = useState(productItem?.sizes || []);
    const [extraIngredient, setExtraIngredient] = useState(productItem?.extraIngredient || []);
    const [category, setCategory] = useState(productItem?.category || []);
    const [listCategories, setListCategories] = useState([])

    //Fetch les catégorie pour la liste de select
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setListCategories(categories)
            })
        })

    },[])




    return (
        <form
            onSubmit={e => onSubmit(e, {image, name, description, basePrice, sizes, extraIngredient, category})}

            className='mt-8 max-w-2xl mx-auto'>
                <div className="grid items-start gap-4" style={{gridTemplateColumns: '.3fr .7fr'}}>

                    <div>
                        <EditImage link={image} setLink={setImage} />
                    </div>

                    <div className='grow'>

                        <label>Item name</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" />

                        <label>Description</label>
                        <input value={description} onChange={e => setDescription(e.target.value)} type="text" />
                    
                        <label>Catégorie</label>
                        <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        {listCategories?.length > 0 && listCategories.map(categorie => (
                            <option key={categorie._id} value={categorie._id}>{categorie.name}</option>
                            ))}
                        </select>
                        
                        <label>Prix de base</label>
                        <input value={basePrice} onChange={e => setBasePrice(e.target.value)} type="text" />

                        <ProductFormProps
                            name={'Tailles'}
                            addLabel={'Ajouter une taille'}
                            props={sizes}
                            setProps={setSizes}
                        />

                        <ProductFormProps
                            name={'Extra ingrédients'}
                            addLabel={'Ajouter des ingrédients'}
                            props={extraIngredient}
                            setProps={setExtraIngredient}
                        />
                        
                        <button type='submit'>Enregistrer</button>
                    </div>
    
                </div>
        </form>
    )
}