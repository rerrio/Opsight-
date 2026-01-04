// Home.jsx
// Copy the complete code from your original document here
// This file contains the Home page component with all imports and logic

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Search, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ServiceCard from '../components/ServiceCard';
import ServiceDetailsModal from '../components/ServiceDetailsModal';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => base44.entities.Service.list('-rating', 50),
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

  const topRated = services
    .filter(s => s.rating >= 4)
    .slice(0, 6);

  const vpnServices = services.filter(s => s.type === 'VPN').length;
  const adBlockerServices = services.filter(s => s.type === 'AdBlocker').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE5MjIzYSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="w-12 h-12 text-cyan-400" />
              <Zap className="w-12 h-12 text-purple-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400">
              Privacy Command Center
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Compare, analyze, and choose the perfect VPN and Ad Blocker for your digital security
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to={createPageUrl('Browse')}>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-6 text-lg">
                  <Search className="w-5 h-5 mr-2" />
                  Explore Services
                </Button>
              </Link>
              <Link to={createPageUrl('Compare')}>
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg">
                  Compare Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{vpnServices}</p>
                <p className="text-sm text-slate-400">VPN Services</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{adBlockerServices}</p>
                <p className="text-sm text-slate-400">Ad Blockers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-yellow-500/10 rounded-xl">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{topRated.length}</p>
                <p className="text-sm text-slate-400">Top Rated</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Top Rated Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Top Rated Services</h2>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : topRated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRated.map((service) => (
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
          <div className="text-center py-12">
            <p className="text-slate-400">No services available yet</p>
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
