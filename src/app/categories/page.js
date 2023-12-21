"use client";
import DeleteButton from '@/components/DeleteButton';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';
import UserTabs from '../../components/layout/UserTabs'
import {useProfile} from '../../components/useProfile'

export default function CategoriesPage() {

    const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState(null);

    //Chargement du profil, Chargement des données utilisateurs
    const { loading, data } = useProfile(); // On récupere loading et data

    //Fonction pour récupérer les catégories
    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(data => {
                setCategories(data); // data => catégories
            })
        })
    }
    

    //Quand la page se charge on load les catégories via useEffect()
    useEffect(() => {
        fetchCategories()
    }, [])
    
    //Fonction au soumission du formulaire
    async function handleCategorySubmit(e) {
        e.preventDefault();
        
        const newCategoryPromise = new Promise(async (resolve, reject) => {
            
            // Nouveau catégorie juste le nom et pas d'id car il se crée tout seul
            const data = { name: categoryName };   

            // On récupere l'id de la catégorie si on veut modifier une catégorie déjà éxistante
            if (editedCategory) {
                data._id = editedCategory._id
            }

            const response = await fetch('/api/categories', { //endpoint
                method: editedCategory ? 'PUT' : 'POST', // Si on a editedCategory on va faire un chagement donc PUT sinon POST pou crée
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data) 
            });
            setCategoryName(''); // On clear la barre
            fetchCategories();
            setEditedCategory(null);
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(newCategoryPromise, {
            loading: editedCategory ? 'En cours de modification...' : 'En cours de création...',
            success: editedCategory ? 'Catégorie modifier avec succès' : 'Catégorie crée avec succès !',
            error: 'Oops une erreur est survenue !'
        })
        
    }

    //Fonction pour supprimer
    async function handleDelete(_id) {
        const promiseDelete = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE'
            });

            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        });

        await toast.promise(promiseDelete, {
            loading: 'Suppresion en cours...',
            success: 'Suppression avec succès',
            error: 'Oops une erreur est survenue..'
        });
        
        //Refresh pour afficher les catégorie non supprimer
        fetchCategories();

    }


    if (loading) {
        return <div className='flex justify-center'>
              <BeatLoader
                    color="#d63644"
                    size={15}
                />
        </div>
    }

    //Si on est pas admin
    if (!data.admin) {
        return "Désolé vous n'êtes pas administrateur"
    }


    return (
        <section className="mt-8 max-w-2xl mx-auto">
            
            <UserTabs isAdmin={true} />

            {/* Création d'une catégorie */}
            <form className='mt-8' onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className='grow'>
                        <label>
                            {editedCategory ? 'Mettre à jour la catégorie ' : 'Nom de la catégorie'}
                            {editedCategory && (
                                <>
                                    : <b>{editedCategory.name}</b>
                                </>
                            )}
                        </label>
                        
                        <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                    </div>

                    <div className='pb-2 flex gap-1'>
                        <button type='submit'>
                            {editedCategory ? 'Mettre à jour' : 'Crée'}
                        </button>
                        <button type='button' onClick={() => {
                            setEditedCategory(null)
                            setCategoryName('');
                        }}>
                            Annuler
                        </button>
                    </div>
                </div>
            </form>

            {/* Liste des catégories */}
            <div>

                <h2 className='mt-8 text-sm text-gray-500'>Gérer les catégories</h2>
                {categories?.length > 0 && categories.map(categorie => (
                        <div key={categorie._id} className='bg-gray-100 rounded-lg p-2 px-4 flex gap-1 mb-1 items-center'>
                            <div className='grow'>
                                {categorie.name}
                            </div>

                            <div className='flex gap-1'>
                                <button
                                    onClick={() => {
                                    setEditedCategory(categorie);
                                    setCategoryName(categorie.name) // Avoir le nom de la catégorie
                                    }}
                                    type='button'>
                                    Editer
                                </button>

                                <DeleteButton onDelete={() => handleDelete(categorie._id)} label='Supprimer' />

                            </div>
                        </div>
                ))}
            </div>

        </section>
    )
}