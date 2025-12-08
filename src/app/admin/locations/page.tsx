'use client'

import { useState, useEffect } from 'react'
import { Card } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Checkbox } from '../../../components/ui/checkbox'
import { useToast } from '../../../hooks/use-toast'

interface Location {
  id: number
  name: string // This is what comes from the API
  cityName?: string // Fallback
  state: string | null
  isAirport: boolean
  _count?: {
    oneWaySource: number
    oneWayDestination: number
    bookingsPick: number
    bookingsDrop: number
  }
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    cityName: '',
    state: '',
    isAirport: false,
    customCity: false
  })
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)
  const { toast } = useToast()

  const states = [
    'Gujarat', 'Maharashtra', 'Rajasthan', 'Madhya Pradesh', 'Karnataka',
    'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Punjab',
    'Haryana', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Odisha'
  ]

  const commonCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
    'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi',
    'Srinagar', 'Dhanbad', 'Jodhpur', 'Amritsar', 'Raipur', 'Allahabad', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada'
  ]

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/cities')
      if (response.ok) {
        const data = await response.json()
        setLocations(data)
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const url = editingLocation ? `/api/admin/locations/${editingLocation.id}` : '/api/admin/locations'
      const method = editingLocation ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityName: formData.cityName,
          state: formData.state,
          isAirport: formData.isAirport
        })
      })

      if (response.ok) {
        setFormData({ cityName: '', state: '', isAirport: false, customCity: false })
        setShowForm(false)
        setEditingLocation(null)
        fetchLocations()
        toast({
          title: "Success",
          description: `Location ${editingLocation ? 'updated' : 'created'} successfully.`,
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || 'Failed to save location',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Failed to save location:', error)
      toast({
        title: "Error",
        description: 'Failed to save location',
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (location: Location) => {
    setEditingLocation(location)
    setFormData({
      cityName: location.name || location.cityName || '',
      state: location.state || '',
      isAirport: location.isAirport,
      customCity: !commonCities.includes(location.name || location.cityName || '')
    })
    setShowForm(true)
  }

  const handleDelete = async (locationId: number) => {
    if (!confirm('Are you sure you want to delete this location?')) return
    
    try {
      const response = await fetch(`/api/admin/locations/${locationId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchLocations()
        toast({
          title: "Success",
          description: "Location deleted successfully.",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || 'Failed to delete location',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Failed to delete location:', error)
      toast({
        title: "Error",
        description: 'Failed to delete location',
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading locations...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Locations</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 rounded-full"
        >
          {showForm ? 'Cancel' : 'Add Location'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold mb-4">
            {editingLocation ? 'Edit Location' : 'Add New Location'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cityName">City Name</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="customCity"
                      checked={formData.customCity}
                      onCheckedChange={(checked) => {
                        setFormData({ 
                          ...formData, 
                          customCity: checked as boolean,
                          cityName: checked ? formData.cityName : ''
                        })
                      }}
                    />
                    <Label htmlFor="customCity" className="text-sm">Enter custom city name</Label>
                  </div>
                  
                  {formData.customCity ? (
                    <Input
                      id="cityName"
                      value={formData.cityName}
                      onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                      placeholder="Enter custom city name"
                      required
                    />
                  ) : (
                    <Select
                      value={formData.cityName}
                      onValueChange={(value) => setFormData({ ...formData, cityName: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {commonCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => setFormData({ ...formData, state: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAirport"
                checked={formData.isAirport}
                onCheckedChange={(checked) => setFormData({ ...formData, isAirport: checked as boolean })}
              />
              <Label htmlFor="isAirport">This is an airport location</Label>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="flex-1" disabled={submitting}>
                {submitting ? 'Saving...' : (editingLocation ? 'Update Location' : 'Add Location')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowForm(false)
                  setEditingLocation(null)
                  setFormData({ cityName: '', state: '', isAirport: false, customCity: false })
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Card key={location.id} className="p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {location.name || location.cityName}
                  </h3>
                  {location.isAirport && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      Airport
                    </span>
                  )}
                </div>
                {location.state && (
                  <p className="text-sm text-muted-foreground">{location.state}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Source Routes</p>
                  <p className="font-medium text-foreground">{location._count?.oneWaySource || 0}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Destination Routes</p>
                  <p className="font-medium text-foreground">{location._count?.oneWayDestination || 0}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pickup Bookings</p>
                  <p className="font-medium text-foreground">{location._count?.bookingsPick || 0}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Drop Bookings</p>
                  <p className="font-medium text-foreground">{location._count?.bookingsDrop || 0}</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  onClick={() => handleEdit(location)}
                  variant="secondary"
                  size="sm"
                  className="flex-1 rounded-full"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(location.id)}
                  variant="destructive"
                  size="sm"
                  className="flex-1 rounded-full"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {locations.length === 0 && (
        <Card className="p-12 text-center rounded-xl border border-border">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">No locations found</h3>
            <p className="text-muted-foreground">Get started by adding your first location.</p>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-all duration-200 hover:shadow-lg">
              Add Location
            </button>
          </div>
        </Card>
      )}
    </div>
  )
}