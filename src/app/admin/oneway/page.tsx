'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, MapPin, Car, Clock, Route } from 'lucide-react';
import { DeleteConfirmation } from '@/components/ui/delete-confirmation';

interface Location {
  id: string;
  cityName: string;
}

interface Cab {
  id: string;
  name: string;
  type: string;
}

interface OneWayPackage {
  id: string;
  sourceId: string;
  destinationId: string;
  cabId: string;
  priceFixed: number;
  distanceKm: number | null;
  estimatedHours: number | null;
  estimatedMinutes: number | null;
  packageFeatures: string[];
  source: Location;
  destination: Location;
  cab: (Cab & { features: string[] }) | null;
}

export default function OneWayPackagesPage() {
  const [packages, setPackages] = useState<OneWayPackage[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<OneWayPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [groupedPackages, setGroupedPackages] = useState<Record<string, OneWayPackage[]>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filters and Pagination State
  const [filterSource, setFilterSource] = useState('');
  const [filterDestination, setFilterDestination] = useState('');
  const [filterCabType, setFilterCabType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items per page

  const [formData, setFormData] = useState({
    sourceId: '',
    destinationId: '',
    cabId: '',
    price: 0,
    estimatedHours: 0,
    estimatedMinutes: 0
  });

  // Delete modal state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // 1. Filter packages
  const filteredPackages = packages.filter(pkg => {
    if (filterSource && pkg.sourceId.toString() !== filterSource) return false;
    if (filterDestination && pkg.destinationId.toString() !== filterDestination) return false;
    if (filterCabType && pkg.cabId?.toString() !== filterCabType) return false;
    return true;
  }).sort((a, b) => {
    const sourceA = a.source?.cityName || '';
    const sourceB = b.source?.cityName || '';
    return sourceA.localeCompare(sourceB);
  });

  // 2. Paginate filtered packages
  const totalItems = filteredPackages.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 3. Group paginated packages for display
  const groupedDisplay = paginatedPackages.reduce((acc, pkg) => {
    const sourceName = pkg.source?.cityName || 'Unknown';
    if (!acc[sourceName]) {
      acc[sourceName] = [];
    }
    acc[sourceName].push(pkg);
    return acc;
  }, {} as Record<string, OneWayPackage[]>);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterSource, filterDestination, filterCabType]);

  const fetchData = async () => {
    try {
      const [packagesRes, locationsRes, cabsRes] = await Promise.all([
        fetch('/api/admin/oneway-packages'),
        fetch('/api/admin/locations'),
        fetch('/api/cabs')
      ]);

      const [packagesData, locationsData, cabsData] = await Promise.all([
        packagesRes.json(),
        locationsRes.json(),
        cabsRes.json()
      ]);

      setPackages(Array.isArray(packagesData) ? packagesData : []);
      setLocations(Array.isArray(locationsData) ? locationsData : []);
      setCabs(Array.isArray(cabsData) ? cabsData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setPackages([]);
      setLocations([]);
      setCabs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingPackage ? `/api/admin/oneway-packages/${editingPackage.id}` : '/api/admin/oneway-packages';
      const method = editingPackage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchData();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/oneway-packages/${deleteId}`, { method: 'DELETE' });

      if (response.ok) {
        await fetchData();
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        alert('Package deleted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Delete error response:', errorData);
        alert(errorData.error || 'Failed to delete package');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Error deleting package. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const openModal = (pkg?: OneWayPackage) => {
    if (pkg) {
      setEditingPackage(pkg);
      setFormData({
        sourceId: pkg.sourceId.toString(),
        destinationId: pkg.destinationId.toString(),
        cabId: pkg.cabId ? pkg.cabId.toString() : '',
        price: pkg.priceFixed || 0,
        estimatedHours: pkg.estimatedHours || 0,
        estimatedMinutes: pkg.estimatedMinutes || 0
      });
    } else {
      setEditingPackage(null);
      setFormData({
        sourceId: '',
        destinationId: '',
        cabId: '',
        price: 0,
        estimatedHours: 0,
        estimatedMinutes: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
  };



  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-6 bg-muted rounded w-1/6 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="bg-muted rounded-xl h-48"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">One-Way Packages</h1>
        <button
          onClick={() => openModal()}
          className="bg-primary hover:bg-primary-dark text-primary-foreground px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-200 hover:shadow-lg"
        >
          <Plus size={20} />
          Add Package
        </button>
      </div>



      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center bg-card p-3 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-2">
          <MapPin size={16} />
          Filters:
        </div>
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          className="px-3 py-1.5 border border-input rounded-full text-sm bg-background text-foreground hover:border-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        >
          <option value="">All Sources</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>{loc.cityName}</option>
          ))}
        </select>
        <select
          value={filterDestination}
          onChange={(e) => setFilterDestination(e.target.value)}
          className="px-3 py-1.5 border border-input rounded-full text-sm bg-background text-foreground hover:border-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        >
          <option value="">All Destinations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>{loc.cityName}</option>
          ))}
        </select>
        <select
          value={filterCabType}
          onChange={(e) => setFilterCabType(e.target.value)}
          className="px-3 py-1.5 border border-input rounded-full text-sm bg-background text-foreground hover:border-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        >
          <option value="">All Cabs</option>
          {cabs.map((cab) => (
            <option key={cab.id} value={cab.id}>{cab.name} ({cab.type})</option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        {Object.keys(groupedDisplay).length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No packages found matching your filters.
          </div>
        ) : (
          Object.entries(groupedDisplay).map(([sourceName, sourcePackages]) => (
            <div key={sourceName}>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-primary" />
                From {sourceName}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sourcePackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 border border-border"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                          <Route size={16} className="text-green-600" />
                          {pkg.destination.cityName}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Car size={14} />
                          {pkg.cab ? pkg.cab.name : <span className="text-destructive">Cab Removed</span>}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">₹{pkg.priceFixed}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Route size={14} />
                        <span>{pkg.distanceKm ? `${pkg.distanceKm} km` : 'Distance TBD'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={14} />
                        <span>
                          {pkg.estimatedHours || pkg.estimatedMinutes
                            ? `${pkg.estimatedHours || 0}h ${pkg.estimatedMinutes || 0}m`
                            : 'Time TBD'
                          }
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="space-y-2">
                        {/* Package Features */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Package Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {(pkg.packageFeatures || []).slice(0, 2).map((feature, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full border border-border"
                              >
                                {feature}
                              </span>
                            ))}
                            {(pkg.packageFeatures || []).length > 2 && (
                              <div className="relative group/tooltip inline-block">
                                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border cursor-help hover:bg-muted/80 transition-colors">
                                  +{(pkg.packageFeatures || []).length - 2} more
                                </span>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-48 bg-popover text-popover-foreground p-3 rounded-lg shadow-xl border border-border z-50 animate-in fade-in zoom-in-95 duration-200">
                                  <div className="flex flex-wrap gap-1.5">
                                    {(pkg.packageFeatures || []).slice(2).map((feature, idx) => (
                                      <span key={idx} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] rounded-full border border-border/50">
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-popover"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Cab Features */}
                        {pkg.cab && pkg.cab.features && pkg.cab.features.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Cab Features:</p>
                            <div className="flex flex-wrap gap-1">
                              {pkg.cab.features.slice(0, 3).map((feature, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full border border-border"
                                >
                                  {feature}
                                </span>
                              ))}
                              {pkg.cab.features.length > 3 && (
                                <div className="relative group/tooltip inline-block">
                                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border cursor-help hover:bg-muted/80 transition-colors">
                                    +{pkg.cab.features.length - 3} more
                                  </span>
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-48 bg-popover text-popover-foreground p-3 rounded-lg shadow-xl border border-border z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex flex-wrap gap-1.5">
                                      {pkg.cab.features.slice(3).map((feature, idx) => (
                                        <span key={idx} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] rounded-full border border-border/50">
                                          {feature}
                                        </span>
                                      ))}
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-popover"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
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
                ))}
              </div>
            </div>
          ))
        )}
      </div>

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
      {
        isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-border shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-card-foreground">
                  {editingPackage ? 'Edit Package' : 'Add New Package'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Source City
                      </label>
                      <select
                        value={formData.sourceId}
                        onChange={(e) => setFormData({ ...formData, sourceId: e.target.value })}
                        className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-all duration-200"
                        required
                      >
                        <option value="">Select Source</option>
                        {Array.isArray(locations) && locations.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.cityName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Destination City
                      </label>
                      <select
                        value={formData.destinationId}
                        onChange={(e) => setFormData({ ...formData, destinationId: e.target.value })}
                        className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-all duration-200"
                        required
                      >
                        <option value="">Select Destination</option>
                        {locations.filter(loc => loc.id !== formData.sourceId).map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.cityName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Cab
                    </label>
                    <select
                      value={formData.cabId}
                      onChange={(e) => setFormData({ ...formData, cabId: e.target.value })}
                      className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-all duration-200"
                      required
                    >
                      <option value="">Select Cab</option>
                      {Array.isArray(cabs) && cabs.map((cab) => (
                        <option key={cab.id} value={cab.id}>
                          {cab.name} ({cab.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={isNaN(formData.price) ? '' : formData.price}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setFormData({ ...formData, price: isNaN(value) ? 0 : value });
                      }}
                      className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-all duration-200"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Estimated Travel Time
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Hours</label>
                        <select
                          value={isNaN(formData.estimatedHours) ? 0 : formData.estimatedHours}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setFormData({ ...formData, estimatedHours: isNaN(value) ? 0 : value });
                          }}
                          className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-all duration-200"
                        >
                          {Array.from({ length: 25 }, (_, i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Minutes</label>
                        <select
                          value={isNaN(formData.estimatedMinutes) ? 0 : formData.estimatedMinutes}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setFormData({ ...formData, estimatedMinutes: isNaN(value) ? 0 : value });
                          }}
                          className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-all duration-200"
                        >
                          {Array.from({ length: 60 }, (_, i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Distance will be calculated automatically. You can adjust the estimated time if needed.
                    </p>
                  </div>

                  <div className="bg-muted rounded-lg p-4 border border-border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Package Features (Included)</h4>
                    <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        <span>Assured Cab (Confirmed Cab Arrival)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        <span>Verified Driver</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        <span>Door-to-Door Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        <span>Fixed Fare – No KMs Limitations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        <span>24*7 Customer Support</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      + Additional cab-specific features will be included automatically
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 border border-input text-foreground rounded-full hover:bg-accent transition-all duration-200 hover:border-ring"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-all duration-200 hover:shadow-lg"
                    >
                      {editingPackage ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Package"
        description="Are you sure you want to delete this package? This action cannot be undone."
        loading={isDeleting}
      />
    </div >
  );
}