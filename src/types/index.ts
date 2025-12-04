export interface Car {
  id: number
  name: string
  type: string
  capacity: number
  pricePerKm: number
  image?: string
  features?: string
  available: boolean
  createdAt: Date
  updatedAt: Date
}

export interface City {
  id: number
  name: string
  state: string
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: number
  tripType: string
  pickupCityId: number
  dropCityId?: number
  pickupDate?: Date
  pickupTime?: string
  journeyDays?: number
  location?: string
  customerName: string
  mobile: string
  email?: string
  cabId: number
  totalPrice: number
  status: string
  createdAt: Date
  updatedAt: Date
  pickupCity?: City
  dropCity?: City
  cab?: Car
}

export interface Admin {
  id: number
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}