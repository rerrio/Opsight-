// Favorites.jsx
// Copy the complete code from your original document here
// This file contains the Favorites page component with all imports and logic
// Favorites.jsx
// Copy the complete code from your original document here
// This file contains the Favorites page component with all imports and logic
import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import ServiceDetailsModal from '../components/ServiceDetailsModal';

export default function Favorites() {
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

  const favorites = services.filter(s => s.is_favorite);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
          <h1 className="text-4xl font-bold text-white">My Favorites</h1>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onFavoriteToggle={handleFavoriteToggle}
                onCompare={() => {}}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No favorites yet</p>
            <p className="text-slate-500 text-sm mt-2">Start adding services to your favorites!</p>
          </div>
        )}
      </div>

      <ServiceDetailsModal
        service={selectedService}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </div>
  );
}
