import React, { useEffect, useState } from 'react'
import LoggedInNavBar from '../../components/LoggedInNavBar'
import { apiFetch } from '../../utils/api' // <- the util function

export default function PublierLivrePage() {
  const [listings, setListings] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: ''
  })

  useEffect(() => {
    fetchListings()
    fetchCategories()
  }, [])

  const fetchListings = async () => {
    try {
      const data = await apiFetch('/api/listings/my')
      setListings(data)
    } catch (err) {
      console.error('Error loading listings', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await apiFetch('/api/categories')
      setCategories(data)
    } catch (err) {
      console.error('Error loading categories', err)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await apiFetch('/api/listings', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      })
      setShowForm(false)
      setFormData({ title: '', description: '', price: '', categoryId: '' })
      fetchListings()
    } catch (err) {
      alert('Erreur lors de la création de l’annonce')
      console.error(err)
    }
  }

  return (
    <div>
      <LoggedInNavBar />
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Mes Annonces</h2>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={() => setShowForm(true)}
          >
            + Ajouter
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : listings.length === 0 ? (
          <p className="text-gray-500">Vous n'avez pas encore d'annonces.</p>
        ) : (
          <div className="space-y-4">
            {listings.map(listing => (
              <div key={listing.listingId} className="p-4 border rounded shadow-sm">
                <h3 className="text-lg font-bold">{listing.title}</h3>
                <p className="text-gray-700">{listing.description}</p>
                <p className="text-blue-600 font-semibold">{listing.price} €</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Nouvelle Annonce</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titre</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Prix ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="" disabled>-- Choisir une catégorie --</option>
                  {categories.map(cat => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
