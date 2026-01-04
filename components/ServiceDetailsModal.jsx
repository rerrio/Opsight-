// ServiceDetailsModal.jsx
// Copy the complete code from your original document here
// This file contains the ServiceDetailsModal component with all imports and logic
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Shield, Zap, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ServiceDetailsModal({ service, open, onClose }) {
  if (!service) return null;

  const typeColor = service.type === 'VPN' ? 'from-cyan-500 to-blue-600' : 'from-purple-500 to-pink-600';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold mb-2">{service.name}</DialogTitle>
              <Badge className={cn("bg-gradient-to-r text-white border-0", typeColor)}>
                {service.type}
              </Badge>
            </div>
            {service.website_url && (
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300"
                onClick={() => window.open(service.website_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Site
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description */}
          <div>
            <p className="text-slate-300 leading-relaxed">{service.description}</p>
          </div>

          {/* Ratings */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-2xl font-bold">{service.rating || 'N/A'}</span>
              </div>
              <p className="text-sm text-slate-400">Overall Rating</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Shield className="w-5 h-5" />
                <span className="text-2xl font-bold">{service.privacy_rating || 'N/A'}</span>
              </div>
              <p className="text-sm text-slate-400">Privacy Score</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Zap className="w-5 h-5" />
                <span className="text-2xl font-bold">{service.performance_rating || 'N/A'}</span>
              </div>
              <p className="text-sm text-slate-400">Performance</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
            <h4 className="text-sm font-semibold text-slate-400 mb-3">Pricing</h4>
            <div className="flex items-baseline gap-4">
              <div>
                <span className="text-3xl font-bold text-white">${service.price_monthly || '?'}</span>
                <span className="text-slate-400 ml-2">/month</span>
              </div>
              {service.price_yearly && (
                <div className="text-cyan-400">
                  <span className="text-xl font-semibold">${service.price_yearly}</span>
                  <span className="text-slate-400 ml-2">/year</span>
                </div>
              )}
            </div>
          </div>

          {/* Platforms */}
          {service.platforms && service.platforms.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Supported Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {service.platforms.map((platform, idx) => (
                  <Badge key={idx} variant="outline" className="border-slate-600 text-slate-300">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {service.key_features && service.key_features.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Key Features</h4>
              <div className="space-y-2">
                {service.key_features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-4">
            {service.pros && service.pros.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-green-400 mb-3">Pros</h4>
                <div className="space-y-2">
                  {service.pros.map((pro, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {service.cons && service.cons.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-3">Cons</h4>
                <div className="space-y-2">
                  {service.cons.map((con, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
