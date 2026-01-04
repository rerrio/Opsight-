// ServiceCard.jsx
// Copy the complete code from your original document here
// This file contains the ServiceCard component  p

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, Shield, Zap, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ServiceCard({ service, onFavoriteToggle, onCompare, onViewDetails }) {
  const typeColor = service.type === 'VPN' ? 'from-cyan-500 to-blue-600' : 'from-purple-500 to-pink-600';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 backdrop-blur-sm group">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity", typeColor)} />
        
        <div className="p-6 relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-white">{service.name}</h3>
                <Badge className={cn("bg-gradient-to-r text-white border-0", typeColor)}>
                  {service.type}
                </Badge>
              </div>
              <p className="text-sm text-slate-400 line-clamp-2">{service.description}</p>
            </div>
            <button
              onClick={() => onFavoriteToggle(service)}
              className="ml-4 p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Heart 
                className={cn(
                  "w-5 h-5 transition-colors",
                  service.is_favorite ? "fill-red-500 text-red-500" : "text-slate-500"
                )}
              />
            </button>
          </div>

          {/* Ratings */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
              <div className="flex items-center gap-1 text-yellow-400 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{service.rating || 'N/A'}</span>
              </div>
              <p className="text-xs text-slate-500">Rating</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
              <div className="flex items-center gap-1 text-cyan-400 mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">{service.privacy_rating || 'N/A'}</span>
              </div>
              <p className="text-xs text-slate-500">Privacy</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
              <div className="flex items-center gap-1 text-purple-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-semibold">{service.performance_rating || 'N/A'}</span>
              </div>
              <p className="text-xs text-slate-500">Speed</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                ${service.price_monthly || '?'}
              </span>
              <span className="text-sm text-slate-400">/month</span>
              {service.price_yearly && (
                <span className="text-xs text-cyan-400 ml-auto">
                  ${service.price_yearly}/year
                </span>
              )}
            </div>
          </div>

          {/* Platforms */}
          {service.platforms && service.platforms.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-slate-500 mb-2">Platforms:</p>
              <div className="flex flex-wrap gap-1">
                {service.platforms.slice(0, 4).map((platform, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs border-slate-600 text-slate-300">
                    {platform}
                  </Badge>
                ))}
                {service.platforms.length > 4 && (
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                    +{service.platforms.length - 4}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => onViewDetails(service)}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-0"
            >
              Details
            </Button>
            <Button
              onClick={() => onCompare(service)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Compare
            </Button>
            {service.website_url && (
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800"
                onClick={() => window.open(service.website_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
