'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Car, MapPin, DollarSign, X } from 'lucide-react';
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";

interface Cab {
  id: string;
  name: string;
  type: string;
}

interface RoundTripRate {
  id: string;
  cabId: string;
  ratePerKm: number;
  minimumKm: number;
  driverAllowancePerDay: number;
  cab: Cab;
}

export default function RoundTripPage() {
  const [rates, setRates] = useState<RoundTripRate[]>([]);
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRate, setEditingRate] = useState<RoundTripRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    cabId: '',
    ratePerKm: 0,
    minimumKm: 300, // Default to 300km per day
    driverAllowancePerDay: 0
  });

  // Filters and Pagination State
  const [filterCabType, setFilterCabType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchData();
  }, []);

  // Filter and Paginate Rates
  const filteredRates = rates.filter(rate => {
    if (filterCabType && rate.cabId !== filterCabType) return false;
    return true;
  }).sort((a, b) => a.cab.name.localeCompare(b.cab.name));

  const totalItems = filteredRates.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedRates = filteredRates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCabType]);

  const fetchData = async () => {
    try {
      const [ratesRes, cabsRes] = await Promise.all([
        fetch('/api/admin/roundtrip-rates'),
        fetch('/api/cabs')
      ]);

      const [ratesData, cabsData] = await Promise.all([
        ratesRes.json(),
        cabsRes.json()
      ]);

      setRates(Array.isArray(ratesData) ? ratesData : []);
      setCabs(Array.isArray(cabsData) ? cabsData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setRates([]);
      setCabs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingRate ? `/api/admin/roundtrip-rates/${editingRate.id}` : '/api/admin/roundtrip-rates';
      const method = editingRate ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchData();
        closeModal();
        toast.success(editingRate ? 'Rate updated successfully' : 'Rate created successfully');
      }
    } catch (error) {
      console.error('Error saving rate:', error);
      toast.error('Failed to save rate');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this rate?')) return;

    try {
      const response = await fetch(`/api/admin/roundtrip-rates/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchData();
        toast.success('Rate deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting rate:', error);
      toast.error('Failed to delete rate');
    }
  };

  const openModal = (rate?: RoundTripRate) => {
    if (rate) {
      setEditingRate(rate);
      setFormData({
        cabId: rate.cabId.toString(),
        ratePerKm: rate.ratePerKm || 0,
        minimumKm: rate.minimumKm || 300,
        driverAllowancePerDay: rate.driverAllowancePerDay || 0
      });
    } else {
      setEditingRate(null);
      setFormData({
        cabId: '',
        ratePerKm: 0,
        minimumKm: 300,
        driverAllowancePerDay: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRate(null);
  };

  const getAvailableCabs = () => {
    if (!Array.isArray(rates) || !Array.isArray(cabs)) return [];
    const usedCabIds = rates.map(rate => rate.cabId);
    return cabs.filter(cab => !usedCabIds.includes(cab.id) || (editingRate && cab.id === editingRate.cabId));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-muted rounded-xl h-48"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-foreground">Round Trip Rates</h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <select
              value={filterCabType}
              onChange={(e) => setFilterCabType(e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-full text-sm bg-background text-foreground appearance-none cursor-pointer hover:border-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="">All Cabs</option>
              {cabs.map((cab) => (
                <option key={cab.id} value={cab.id}>{cab.name} ({cab.type})</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <Car size={16} />
            </div>
          </div>

          <button
            onClick={() => openModal()}
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            Add Rate
          </button>
        </div>
      </div>

      {rates.length === 0 ? (
        <div className="text-center py-12">
          <Car size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No round trip rates configured</h3>
          <p className="text-muted-foreground mb-4">Add rates for your cabs to enable round trip bookings</p>
          <button
            onClick={() => openModal()}
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-4 py-2 rounded-full"
            disabled={cabs.length === 0}
          >
            Add First Rate
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {paginatedRates.map((rate) => (
            <div
              key={rate.id}
              className="bg-card rounded-xl border border-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Car size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{rate.cab.name}</h3>
                  <p className="text-sm text-muted-foreground">{rate.cab.type}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin size={14} />
                    Rate per KM
                  </span>
                  <span className="font-semibold text-foreground">₹{rate.ratePerKm}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Max per day KMs</span>
                  <span className="font-semibold text-foreground">{rate.minimumKm || 300} km</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    Driver Allowance/Day
                  </span>
                  <span className="font-semibold text-foreground">₹{rate.driverAllowancePerDay}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Approx cost per day</p>
                  <p className="text-lg font-bold text-primary">
                    ₹{((rate.ratePerKm || 0) * (rate.minimumKm || 300) + (rate.driverAllowancePerDay || 0)).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ({rate.minimumKm || 300} km + driver allowance)
                  </p>
                </div>
              </div>

              {/* Collapsible Actions */}
              <div className="mt-auto border-t border-border/50 pt-2">
                <button
                  onClick={() => setExpandedId(expandedId === rate.id ? null : rate.id)}
                  className="w-full text-xs font-medium text-primary hover:text-primary-dark transition-colors flex items-center justify-center gap-1 py-1"
                >
                  <span>{expandedId === rate.id ? 'Hide Actions' : 'View Actions'}</span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${expandedId === rate.id ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex gap-2 pb-1">
                      <button
                        onClick={() => openModal(rate)}
                        className="flex-1 bg-background hover:bg-muted text-foreground border border-border px-3 py-2 rounded-full flex items-center justify-center gap-1.5 transition-all duration-200 text-xs font-medium hover:shadow-sm"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(rate.id)}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-3 py-2 rounded-full flex items-center justify-center gap-1.5 transition-all duration-200 text-xs font-medium hover:shadow-sm"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 pb-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-input bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-input bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-card rounded-xl border border-border max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {editingRate ? 'Edit Round Trip Rate' : 'Add Round Trip Rate'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Cab
                  </label>
                  {getAvailableCabs().length === 0 && !editingRate ? (
                    <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                      All available cabs already have round trip rates configured.
                    </div>
                  ) : (
                    <Combobox
                      options={getAvailableCabs().map(cab => ({ label: `${cab.name} (${cab.type})`, value: cab.id.toString() }))}
                      value={formData.cabId}
                      onChange={(value) => setFormData({ ...formData, cabId: value })}
                      placeholder="Select Cab"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Rate per KM (₹)
                  </label>
                  <input
                    type="number"
                    value={isNaN(formData.ratePerKm) ? '' : formData.ratePerKm}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setFormData({ ...formData, ratePerKm: isNaN(value) ? 0 : value });
                    }}
                    className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Max per day KMs
                  </label>
                  <input
                    type="number"
                    value={isNaN(formData.minimumKm) ? '' : formData.minimumKm}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setFormData({ ...formData, minimumKm: isNaN(value) ? 300 : value });
                    }}
                    className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                    min="1"
                    placeholder="300"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum kilometers allowed per day for multi-day bookings
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Driver Allowance per Day (₹)
                  </label>
                  <input
                    type="number"
                    value={isNaN(formData.driverAllowancePerDay) ? '' : formData.driverAllowancePerDay}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setFormData({ ...formData, driverAllowancePerDay: isNaN(value) ? 0 : value });
                    }}
                    className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                {formData.ratePerKm > 0 && formData.minimumKm > 0 && (
                  <div className="bg-primary/10 rounded-lg p-3">
                    <p className="text-sm text-primary font-medium">Daily Cost (Max KMs)</p>
                    <p className="text-lg font-bold text-primary-dark">
                      ₹{((formData.ratePerKm || 0) * (formData.minimumKm || 300) + (formData.driverAllowancePerDay || 0)).toLocaleString()}
                    </p>
                    <p className="text-xs text-primary/80">
                      {formData.minimumKm || 300} km × ₹{formData.ratePerKm || 0} + ₹{formData.driverAllowancePerDay || 0} allowance
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-input text-foreground rounded-full hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!editingRate && getAvailableCabs().length === 0}
                  >
                    {editingRate ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}