// Browse.jsx
// Copy the complete code from your original document here
// This file contains the Browse page component with all imports and logic

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import FilterPanel from '../components/FilterPanel';
import ServiceDetailsModal from '../components/ServiceDetailsModal';

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    minRating: 0,
    maxPrice: 50,
    platforms: []
  });
  const [selectedService, setSelectedService] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => base44.entities.Service.list('-rating', 100),
  });

  const updateServiceMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Service.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });

  const handleFavoriteToggle = (service) => {
    updateServiceMutation.mutate({
      id: service.id,
      data: { is_favorite: !service.is_favorite }
    });
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setDetailsOpen(true);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = !searchQuery || 
      service.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filters.type === 'all' || service.type === filters.type;
    const matchesRating = (service.rating || 0) >= filters.minRating;
    const matchesPrice = (service.price_monthly || 0) <= filters.maxPrice;
    const matchesPlatform = filters.platforms.length === 0 || 
      filters.platforms.some(p => service.platforms?.includes(p));

    return matchesSearch && matchesType && matchesRating && matchesPrice && matchesPlatform;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Browse Services</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search VPNs, Ad Blockers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-12 text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredServices.length > 0 ? (
              <>
                <div className="mb-4 text-slate-400">
                  Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onFavoriteToggle={handleFavoriteToggle}
                      onCompare={() => {}}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No services match your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ServiceDetailsModal
        service={selectedService}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </div>
  );
}
