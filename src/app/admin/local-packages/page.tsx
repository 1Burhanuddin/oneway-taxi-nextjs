'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Car, Clock, MapPin, DollarSign } from 'lucide-react';
import { toast } from "sonner";

interface Cab {
  id: string;
  name: string;
  type: string;
}

interface LocalPackage {
  id: string;
  cabId: string;
  hoursIncluded: number;
  kmIncluded: number;
  priceFixed: number;
  extraKmRate: number;
  extraHourRate: number;
  cab: Cab;
}

export default function LocalPackagesPage() {
  const [packages, setPackages] = useState<LocalPackage[]>([]);
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<LocalPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    cabId: '',
    hoursIncluded: 0,
    kmIncluded: 0,
    priceFixed: 0,
    extraKmRate: 0,
    extraHourRate: 0
  });

  // Filters and Pagination State
  const [filterCabType, setFilterCabType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchData();
  }, []);

  // Filter and Paginate Packages
  const filteredPackages = packages.filter(pkg => {
    if (filterCabType && String(pkg.cabId) !== String(filterCabType)) return false;
    return true;
  }).sort((a, b) => a.cab.name.localeCompare(b.cab.name));

  const totalItems = filteredPackages.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCabType]);

  const fetchData = async () => {
    try {
      const [packagesRes, cabsRes] = await Promise.all([
        fetch('/api/admin/local-packages'),
        fetch('/api/cabs')
      ]);

      const [packagesData, cabsData] = await Promise.all([
        packagesRes.json(),
        cabsRes.json()
      ]);

      setPackages(Array.isArray(packagesData) ? packagesData : []);
      setCabs(Array.isArray(cabsData) ? cabsData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setPackages([]);
      setCabs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingPackage ? `/api/admin/local-packages/${editingPackage.id}` : '/api/admin/local-packages';
      const method = editingPackage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchData();
        await fetchData();
        closeModal();
        toast.success(editingPackage ? 'Package updated successfully' : 'Package created successfully');
      }
    } catch (error) {
      console.error('Error saving package:', error);
      toast.error('Failed to save package');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const response = await fetch(`/api/admin/local-packages/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchData();
        toast.success('Package deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      toast.error('Failed to delete package');
    }
  };

  const openModal = (pkg?: LocalPackage) => {
    if (pkg) {
      setEditingPackage(pkg);
      setFormData({
        cabId: pkg.cabId,
        hoursIncluded: pkg.hoursIncluded,
        kmIncluded: pkg.kmIncluded,
        priceFixed: pkg.priceFixed,
        extraKmRate: pkg.extraKmRate,
        extraHourRate: pkg.extraHourRate
      });
    } else {
      setEditingPackage(null);
      setFormData({
        cabId: '',
        hoursIncluded: 0,
        kmIncluded: 0,
        priceFixed: 0,
        extraKmRate: 0,
        extraHourRate: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
  };

  // Removed getAvailableCabs restriction to allow multiple packages per cab
  const getAvailableCabs = () => {
    return cabs;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-muted rounded-xl h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-foreground">Local Packages</h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
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
            Add Package
          </button>
        </div>
      </div>

      {packages.length === 0 ? (
        <div className="text-center py-12">
          <Car size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No local packages configured</h3>
          <p className="text-muted-foreground mb-4">Add packages for your cabs to enable local bookings</p>
          <button
            onClick={() => openModal()}
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-4 py-2 rounded-full"
            disabled={cabs.length === 0}
          >
            Add First Package
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {paginatedPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-card rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-primary p-4 text-primary-foreground">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-transparent border border-primary-foreground/20 rounded-lg">
                    <Car size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-tight">{pkg.cab.name}</h3>
                    <p className="text-primary-foreground/80 text-xs mt-0.5">{pkg.cab.type}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                {/* Price Section */}
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-primary mb-0.5">₹{pkg.priceFixed.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground font-medium">Fixed Package Price</p>
                </div>

                {/* Package Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center group">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 group-hover:text-primary transition-colors">
                      <Clock size={14} />
                      Hours Included
                    </span>
                    <span className="font-bold text-foreground text-sm">{pkg.hoursIncluded}h</span>
                  </div>

                  <div className="flex justify-between items-center group">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 group-hover:text-primary transition-colors">
                      <MapPin size={14} />
                      KM Included
                    </span>
                    <span className="font-bold text-foreground text-sm">{pkg.kmIncluded} km</span>
                  </div>
                </div>

                {/* Extra Charges */}
                <div className="mb-4 pt-3 border-t border-border/50">
                  <h4 className="text-xs font-bold text-foreground mb-2">Extra Charges</h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-medium">Extra KM</span>
                      <span className="text-xs font-bold text-foreground">₹{pkg.extraKmRate}/km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-medium">Extra Hour</span>
                      <span className="text-xs font-bold text-foreground">₹{pkg.extraHourRate}/hr</span>
                    </div>
                  </div>
                </div>

                {/* Collapsible Actions */}
                <div className="mt-auto border-t border-border/50 pt-2">
                  <button
                    onClick={() => setExpandedId(expandedId === pkg.id ? null : pkg.id)}
                    className="w-full text-xs font-medium text-primary hover:text-primary-dark transition-colors flex items-center justify-center gap-1 py-1"
                  >
                    <span>{expandedId === pkg.id ? 'Hide Actions' : 'View Actions'}</span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${expandedId === pkg.id ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex gap-2 pb-1">
                        <button
                          onClick={() => openModal(pkg)}
                          className="flex-1 bg-background hover:bg-muted text-foreground border border-border px-3 py-2 rounded-full flex items-center justify-center gap-1.5 transition-all duration-200 text-xs font-medium hover:shadow-sm"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(pkg.id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">

              <h2 className="text-xl font-semibold mb-4">
                {editingPackage ? 'Edit Local Package' : 'Add Local Package'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Cab
                  </label>
                  <select
                    value={formData.cabId}
                    onChange={(e) => setFormData({ ...formData, cabId: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select Cab</option>
                    {getAvailableCabs().map((cab) => (
                      <option key={cab.id} value={cab.id}>
                        {cab.name} ({cab.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Hours Included
                    </label>
                    <input
                      type="number"
                      value={formData.hoursIncluded}
                      onChange={(e) => setFormData({ ...formData, hoursIncluded: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-input rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      KM Included
                    </label>
                    <input
                      type="number"
                      value={formData.kmIncluded}
                      onChange={(e) => setFormData({ ...formData, kmIncluded: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-input rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Fixed Price (₹)
                  </label>
                  <input
                    type="number"
                    value={isNaN(formData.priceFixed) ? '' : formData.priceFixed}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setFormData({ ...formData, priceFixed: isNaN(value) ? 0 : value });
                    }}
                    className="w-full px-3 py-2 border border-input rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Extra KM Rate (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.extraKmRate}
                      onChange={(e) => setFormData({ ...formData, extraKmRate: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-input rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Extra Hour Rate (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.extraHourRate}
                      onChange={(e) => setFormData({ ...formData, extraHourRate: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-input rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                {formData.priceFixed > 0 && formData.hoursIncluded > 0 && formData.kmIncluded > 0 && (
                  <div className="bg-primary/10 rounded-full p-3">
                    <p className="text-sm text-primary font-medium mb-2">Package Summary</p>
                    <div className="text-xs text-primary/80 space-y-1">
                      <p>• {formData.hoursIncluded} hours + {formData.kmIncluded} km = ₹{formData.priceFixed}</p>
                      <p>• Extra charges: ₹{formData.extraKmRate}/km, ₹{formData.extraHourRate}/hr</p>
                    </div>
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
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-colors"
                  >
                    {editingPackage ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}