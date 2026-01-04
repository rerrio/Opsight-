// Compare.jsx
// Copy the complete code from your original document here
// This file contains the Compare page component with all imports and logic

import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Shield, Zap, CheckCircle, XCircle, ArrowLeftRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Compare() {
  const [service1Id, setService1Id] = useState('');
  const [service2Id, setService2Id] = useState('');

  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: () => base44.entities.Service.list('-rating', 100),
  });

  const service1 = services.find(s => s.id === service1Id);
  const service2 = services.find(s => s.id === service2Id);

  const ComparisonCard = ({ service, position }) => {
    if (!service) return null;
    
    const typeColor = service.type === 'VPN' ? 'from-cyan-500 to-blue-600' : 'from-purple-500 to-pink-600';
    
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
            <Badge className={cn("bg-gradient-to-r text-white border-0", typeColor)}>
              {service.type}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30 text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-lg font-semibold">{service.rating || 'N/A'}</span>
              </div>
              <p className="text-xs text-slate-500">Rating</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30 text-center">
              <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-lg font-semibold">{service.privacy_rating || 'N/A'}</span>
              </div>
              <p className="text-xs text-slate-500">Privacy</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30 text-center">
              <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-lg font-semibold">{service.performance_rating || 'N/A'}</span>
              </div>
              <p className="text-xs text-slate-500">Speed</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/30 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Monthly Price</p>
              <p className="text-2xl font-bold text-white">${service.price_monthly || '?'}</p>
            </div>

            {service.price_yearly && (
              <div className="bg-slate-800/30 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">Yearly Price</p>
                <p className="text-2xl font-bold text-cyan-400">${service.price_yearly}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-slate-400 mb-2">Platforms</p>
              <div className="flex flex-wrap gap-1">
                {service.platforms?.map((platform, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs border-slate-600 text-slate-300">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>

            {service.key_features && service.key_features.length > 0 && (
              <div>
                <p className="text-sm text-slate-400 mb-2">Key Features</p>
                <div className="space-y-1">
                  {service.key_features.slice(0, 5).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.pros && service.pros.length > 0 && (
              <div>
                <p className="text-sm text-green-400 mb-2">Pros</p>
                <div className="space-y-1">
                  {service.pros.slice(0, 3).map((pro, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-slate-300">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.cons && service.cons.length > 0 && (
              <div>
                <p className="text-sm text-red-400 mb-2">Cons</p>
                <div className="space-y-1">
                  {service.cons.slice(0, 3).map((con, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <XCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-slate-300">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.website_url && (
              <Button
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
                onClick={() => window.open(service.website_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Website
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ArrowLeftRight className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Compare Services</h1>
          <p className="text-slate-400">Select two services to compare side-by-side</p>
        </div>

        {/* Service Selectors */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6">
            <p className="text-sm text-slate-400 mb-3">Select First Service</p>
            <Select value={service1Id} onValueChange={setService1Id}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Choose a service..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id} disabled={service.id === service2Id}>
                    {service.name} ({service.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6">
            <p className="text-sm text-slate-400 mb-3">Select Second Service</p>
            <Select value={service2Id} onValueChange={setService2Id}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Choose a service..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id} disabled={service.id === service1Id}>
                    {service.name} ({service.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>
        </div>

        {/* Comparison View */}
        {service1 && service2 ? (
          <div className="grid md:grid-cols-2 gap-6">
            <ComparisonCard service={service1} position="left" />
            <ComparisonCard service={service2} position="right" />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">Select two services above to begin comparison</p>
          </div>
        )}
      </div>
    </div>
  );
}
