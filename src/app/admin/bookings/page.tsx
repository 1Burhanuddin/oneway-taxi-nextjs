'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, MapPin, Car, Phone, Mail, Clock, DollarSign, Filter, X, Eye } from 'lucide-react';

interface TripBooking {
  id: string;
  bookingNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  pickupLocation?: {
    id: string;
    cityName: string;
    state: string;
  };
  dropLocation?: {
    id: string;
    cityName: string;
    state: string;
  };
  pickupDate: string;
  pickupTime: string;
  type: 'ONEWAY' | 'ROUNDTRIP' | 'LOCAL';
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  estimatedPrice: number;
  createdAt: string;
  cab?: {
    name: string;
    type: string;
  };
  oneWayPackage?: {
    source: { name: string };
    destination: { name: string };
    distanceKm: number;
    estimatedTime: string;
  };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<TripBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<TripBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedBooking, setSelectedBooking] = useState<TripBooking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, selectedType, selectedStatus]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (selectedType !== 'ALL') {
      filtered = filtered.filter(booking => booking.type === selectedType);
    }

    if (selectedStatus !== 'ALL') {
      filtered = filtered.filter(booking => booking.status === selectedStatus);
    }

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = async (bookingId: string, newStatus: 'CONFIRMED' | 'CANCELLED') => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        await fetchBookings();
        if (selectedBooking?.id === bookingId) {
          const updatedBooking = bookings.find(b => b.id === bookingId);
          if (updatedBooking) {
            setSelectedBooking({ ...updatedBooking, status: newStatus });
          }
        }
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const openDrawer = (booking: TripBooking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedBooking(null), 300);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-primary-light text-primary-foreground border border-primary/20';
      case 'CONFIRMED': return 'bg-green-50 text-green-700 border border-green-200';
      case 'CANCELLED': return 'bg-destructive/10 text-destructive border border-destructive/20';
      case 'COMPLETED': return 'bg-secondary text-secondary-foreground border border-border';
      default: return 'bg-muted text-muted-foreground border border-border';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ONEWAY': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'ROUNDTRIP': return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'LOCAL': return 'bg-green-50 text-green-700 border border-green-200';
      default: return 'bg-muted text-muted-foreground border border-border';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-muted rounded-xl h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bookings Management</h1>
        <div className="flex gap-2">
          <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-border">
            Total: {bookings.length}
          </span>
          <span className="px-4 py-2 bg-primary-light text-primary-foreground rounded-full text-sm font-medium">
            Pending: {bookings.filter(b => b.status === 'PENDING').length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl shadow-sm p-6 mb-6 border border-border">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-input rounded-full text-sm focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-all duration-200"
            >
              <option value="ALL">All Types</option>
              <option value="ONEWAY">One Way</option>
              <option value="ROUNDTRIP">Round Trip</option>
              <option value="LOCAL">Local</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-input rounded-full text-sm focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-all duration-200"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <span className="text-sm text-muted-foreground">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </span>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12">
          <Car size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {bookings.length === 0 ? 'No bookings yet' : 'No bookings match your filters'}
          </h3>
          <p className="text-muted-foreground">
            {bookings.length === 0
              ? 'Bookings will appear here when customers make reservations'
              : 'Try adjusting your filters to see more results'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {Array.isArray(filteredBookings) && filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 border border-border"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                    <User size={20} />
                    {booking.firstName} {booking.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">#{booking.bookingNumber}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getTypeColor(booking.type)}`}>
                    {booking.type}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  <span className="truncate">{booking.pickupLocation?.cityName || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  <span className="truncate">{booking.dropLocation?.cityName || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>{new Date(booking.pickupDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} />
                  <span>{booking.pickupTime}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign size={16} />
                    <span className="font-semibold text-lg text-primary">₹{booking.estimatedPrice}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  {booking.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'CONFIRMED')}
                        className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-200 text-sm hover:shadow-md"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'CANCELLED')}
                        className="px-4 py-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-all duration-200 text-sm hover:shadow-md"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => openDrawer(booking)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-all duration-200 text-sm flex items-center gap-1 hover:shadow-md"
                  >
                    <Eye size={16} />
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Details Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeDrawer}></div>
          <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-card shadow-xl transform transition-transform duration-300 border-l border-border ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-card-foreground">Booking Details</h2>
                <button
                  onClick={closeDrawer}
                  className="p-2 hover:bg-accent rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {selectedBooking && (
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      #{selectedBooking.bookingNumber}
                    </h3>
                    <div className="flex gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedBooking.type)}`}>
                        {selectedBooking.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Customer Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <User size={16} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="break-words">{selectedBooking.firstName} {selectedBooking.lastName || ''}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone size={16} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="break-words">{selectedBooking.phone || selectedBooking.mobile}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail size={16} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="break-words">{selectedBooking.email || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Trip Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="break-words">From: {selectedBooking.pickupLocation?.cityName || 'N/A'}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="break-words">To: {selectedBooking.dropLocation?.cityName || 'N/A'}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar size={16} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="break-words">{new Date(selectedBooking.pickupDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock size={16} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="break-words">{selectedBooking.pickupTime}</span>
                      </div>
                    </div>
                  </div>

                  {selectedBooking.cab && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Vehicle</h4>
                      <div className="flex items-start gap-3 text-sm">
                        <Car size={16} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="break-words">{selectedBooking.cab.name} ({selectedBooking.cab.type})</span>
                      </div>
                    </div>
                  )}

                  {selectedBooking.oneWayPackage && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Package Details</h4>
                      <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-2">
                        <p className="break-words"><strong>Route:</strong> {selectedBooking.oneWayPackage.source.name} → {selectedBooking.oneWayPackage.destination.name}</p>
                        <p><strong>Distance:</strong> {selectedBooking.oneWayPackage.distanceKm} km</p>
                        <p><strong>Duration:</strong> {selectedBooking.oneWayPackage.estimatedTime}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Pricing</h4>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">₹{selectedBooking.estimatedPrice}</div>
                      <div className="text-sm text-blue-700">Estimated Price</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Booking Timeline</h4>
                    <div className="text-sm text-gray-600">
                      <p>Created: {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {selectedBooking.status === 'PENDING' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateBookingStatus(selectedBooking.id, 'CONFIRMED')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Confirm Booking
                      </button>
                      <button
                        onClick={() => updateBookingStatus(selectedBooking.id, 'CANCELLED')}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}