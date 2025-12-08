'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Car, Users, Luggage, Upload, X } from 'lucide-react';
import { DeleteConfirmation } from '@/components/ui/delete-confirmation';

interface Cab {
  id: number;
  name: string;
  type: string;
  capacityPassengers: number;
  capacityLuggage: number;
  features: string[];
  baseImageUrl: string;
  description: string;
}

export default function CabsPage() {
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCab, setEditingCab] = useState<Cab | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacityPassengers: 4,
    capacityLuggage: 2,
    features: [] as string[],
    baseImageUrl: '',
    description: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Delete modal state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      const response = await fetch('/api/cabs');
      const data = await response.json();
      setCabs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching cabs:', error);
      setCabs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCabs = cabs.filter(cab => {
    if (filterType && cab.type !== filterType) return false;
    return true;
  });

  const uniqueCabTypes = Array.from(new Set(cabs.map(cab => cab.type)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.baseImageUrl;

      // Upload file if selected
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', selectedFile);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          imageUrl = uploadResult.imageUrl;
        } else {
          throw new Error('Failed to upload image');
        }
      }

      const url = editingCab ? `/api/cabs/${editingCab.id}` : '/api/cabs';
      const method = editingCab ? 'PUT' : 'POST';

      const requestData = {
        ...formData,
        capacityPassengers: Number(formData.capacityPassengers),
        capacityLuggage: Number(formData.capacityLuggage),
        baseImageUrl: imageUrl
      };

      console.log('Sending request:', { url, method, data: requestData });

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        await fetchCabs();
        closeModal();
        alert('Cab saved successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(errorData.error || 'Failed to save cab');
      }
    } catch (error) {
      console.error('Error saving cab:', error);
      alert('Error saving cab. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      console.log('Deleting cab with ID:', deleteId);
      const response = await fetch(`/api/cabs/${deleteId}`, { method: 'DELETE' });

      console.log('Delete response status:', response.status);

      if (response.ok) {
        await fetchCabs();
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        alert('Cab deleted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Delete error response:', errorData);
        alert(errorData.error || 'Failed to delete cab');
      }
    } catch (error) {
      console.error('Error deleting cab:', error);
      alert('Error deleting cab. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const openModal = (cab?: Cab) => {
    if (cab) {
      setEditingCab(cab);
      setFormData({
        name: cab.name || '',
        type: cab.type || '',
        capacityPassengers: cab.capacityPassengers || 4,
        capacityLuggage: cab.capacityLuggage || 2,
        features: cab.features || [],
        baseImageUrl: cab.baseImageUrl || '',
        description: cab.description || ''
      });
    } else {
      setEditingCab(null);
      setFormData({
        name: '',
        type: '',
        capacityPassengers: 4,
        capacityLuggage: 2,
        features: [],
        baseImageUrl: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCab(null);
    setSelectedFile(null);
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
        <h1 className="text-2xl font-bold text-foreground">Manage Cabs</h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-input rounded-full text-sm bg-background text-foreground appearance-none cursor-pointer hover:border-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="">All Types</option>
              {uniqueCabTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
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
            Add Cab
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(filteredCabs) && filteredCabs.map((cab) => (
          <div
            key={cab.id}
            className="bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-border"
          >
            <div className="h-48 bg-muted relative overflow-hidden">
              {cab.baseImageUrl ? (
                <img
                  src={cab.baseImageUrl}
                  alt={cab.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car size={48} className="text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-card-foreground">{cab.name}</h3>
                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${cab.type === 'Premium' || cab.type === 'Luxury'
                  ? 'bg-primary-light text-primary-foreground'
                  : cab.type === 'SUV' || cab.type === 'Sedan'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground'
                  }`}>
                  {cab.type}
                </span>
              </div>

              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users size={16} />
                  <span>{cab.capacityPassengers}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Luggage size={16} />
                  <span>{cab.capacityLuggage}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{cab.description}</p>

              {cab.features && cab.features.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {cab.features.slice(0, 3).map((feature: string) => {
                      const featureIcons: { [key: string]: string } = {
                        'AC': '❄️',
                        'GPS': '🗺️',
                        'Music System': '🎵',
                        'WiFi': '📶',
                        'Charging Port': '🔌',
                        'First Aid Kit': '🏥',
                        'Water Bottles': '💧',
                        'Sanitizer': '🧴',
                        'Bluetooth': '📱',
                        'Leather Seats': '🪑'
                      };
                      return (
                        <span key={feature} className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full flex items-center gap-1 border border-border">
                          <span>{featureIcons[feature] || '✨'}</span>
                          {feature}
                        </span>
                      );
                    })}
                    {cab.features.length > 3 && (
                      <div className="relative group/tooltip inline-block">
                        <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full border border-border cursor-help hover:bg-muted/80 transition-colors">
                          +{cab.features.length - 3} more
                        </span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-48 bg-popover text-popover-foreground p-3 rounded-lg shadow-xl border border-border z-50 animate-in fade-in zoom-in-95 duration-200">
                          <div className="flex flex-wrap gap-1.5">
                            {cab.features.slice(3).map((feature) => (
                              <span key={feature} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-[10px] rounded-full border border-border/50">
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

              {/* Collapsible Actions */}
              <div className="mt-auto border-t border-border/50 pt-2">
                <button
                  onClick={() => setExpandedId(expandedId === cab.id ? null : cab.id)}
                  className="w-full text-xs font-medium text-primary hover:text-primary-dark transition-colors flex items-center justify-center gap-1 py-1"
                >
                  <span>{expandedId === cab.id ? 'Hide Actions' : 'View Actions'}</span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${expandedId === cab.id ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex gap-2 pb-1">
                      <button
                        onClick={() => openModal(cab)}
                        className="flex-1 bg-background hover:bg-muted text-foreground border border-border px-3 py-2 rounded-full flex items-center justify-center gap-1.5 transition-all duration-200 text-xs font-medium hover:shadow-sm"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cab.id)}
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

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-card rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-card-foreground">
                  {editingCab ? 'Edit Cab' : 'Add New Cab'}
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
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 bg-background text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground transition-all duration-200"
                    required
                  >
                    <option value="">Select cab type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Premium">Premium</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Passengers
                    </label>
                    <input
                      type="number"
                      value={formData.capacityPassengers}
                      onChange={(e) => setFormData({ ...formData, capacityPassengers: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 bg-background text-foreground"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Luggage
                    </label>
                    <input
                      type="number"
                      value={formData.capacityLuggage}
                      onChange={(e) => setFormData({ ...formData, capacityLuggage: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-input rounded-full focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 bg-background text-foreground"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Features
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      'AC', 'GPS', 'Music System', 'WiFi',
                      'Charging Port', 'First Aid Kit', 'Water Bottles',
                      'Sanitizer', 'Bluetooth', 'Leather Seats'
                    ].map((feature) => (
                      <label key={feature} className={`
                        flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all duration-200
                        ${formData.features.includes(feature)
                          ? 'bg-primary/10 border-primary text-primary font-medium shadow-sm'
                          : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:bg-accent'}
                      `}>
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                features: [...formData.features, feature]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                features: formData.features.filter(f => f !== feature)
                              });
                            }
                          }}
                          className="hidden"
                        />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Select the features available in this cab
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cab Image
                  </label>

                  <div className="flex gap-4 items-start">
                    {(formData.baseImageUrl || selectedFile) && (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border shrink-0">
                        <img
                          src={selectedFile ? URL.createObjectURL(selectedFile) : formData.baseImageUrl}
                          alt="Cab preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <label className="flex-1 flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-input rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-primary">Click to upload</span> or drag and drop
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                  {selectedFile && (
                    <p className="text-xs text-green-600 mt-2 ml-1">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-input rounded-2xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 bg-background text-foreground"
                    rows={3}
                  />
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
                    disabled={uploading}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                  >
                    {uploading ? 'Uploading...' : (editingCab ? 'Update' : 'Create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Cab"
        description="Are you sure you want to delete this cab? This action cannot be undone."
        loading={isDeleting}
      />
    </div>
  );
}