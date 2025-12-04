'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

const cabTypes = ['sedan', 'suv', 'hatchback', 'luxury']
const features = ['AC', 'GPS', 'Music System', 'WiFi', 'Phone Charger', 'Water Bottles']

export default function EditCabPage() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    pricePerKm: '',
    image: '',
    features: [] as string[],
    available: true
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const router = useRouter()
  const params = useParams()
  const cabId = params.id as string

  useEffect(() => {
    if (cabId) {
      fetchCab()
    }
  }, [cabId])

  const fetchCab = async () => {
    try {
      console.log('Fetching cab with ID:', cabId)
      
      const response = await fetch(`/api/cabs/${cabId}`)
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const cab = await response.json()
        console.log('Fetched cab data:', cab)
        
        setFormData({
          name: cab.name || '',
          type: cab.type || '',
          capacity: cab.capacity ? cab.capacity.toString() : '',
          pricePerKm: cab.pricePerKm ? cab.pricePerKm.toString() : '',
          image: cab.image || '',
          features: cab.features ? JSON.parse(cab.features) : [],
          available: cab.available !== undefined ? cab.available : true
        })
      } else {
        console.error('Failed to fetch cab:', response.statusText)
        alert('Failed to load cab data')
      }
    } catch (error) {
      console.error('Failed to fetch cab:', error)
      alert('Failed to load cab data')
    } finally {
      setFetching(false)
    }
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter(f => f !== feature)
      }))
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, image: data.imageUrl }))
      } else {
        const error = await response.json()
        alert(error.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/cabs/${cabId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Cab updated successfully!')
        router.push('/admin/cabs')
      } else {
        alert('Failed to update cab')
      }
    } catch (error) {
      console.error('Failed to update cab:', error)
      alert('Failed to update cab')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <div className="text-center py-12">Loading cab data...</div>
  }

  if (!cabId) {
    return <div className="text-center py-12">Invalid cab ID</div>
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Cab (ID: {cabId})</h1>
      
      {/* Debug info - remove this later */}
      <div className="bg-gray-100 p-4 rounded text-sm">
        <strong>Debug Info:</strong>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>

      <Card className="p-6 rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Cab Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-lg"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Cab Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select cab type" />
                </SelectTrigger>
                <SelectContent>
                  {cabTypes.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="rounded-lg"
                required
              />
            </div>

            <div>
              <Label htmlFor="pricePerKm">Price per KM (₹)</Label>
              <Input
                id="pricePerKm"
                type="number"
                step="0.01"
                value={formData.pricePerKm}
                onChange={(e) => setFormData({ ...formData, pricePerKm: e.target.value })}
                className="rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image">Cab Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="rounded-lg"
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-32 h-24 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) => setFormData({ ...formData, available: checked as boolean })}
            />
            <Label htmlFor="available">Available for booking</Label>
          </div>

          <div>
            <Label>Features</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={formData.features.includes(feature)}
                    onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                  />
                  <Label htmlFor={feature} className="text-sm">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 rounded-lg"
            >
              {uploading ? 'Uploading...' : loading ? 'Updating...' : 'Update Cab'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}