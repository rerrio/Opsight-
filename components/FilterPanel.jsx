// FilterPanel.jsx
// Copy the complete code from your original document here
// This file contains the FilterPanel component with all imports and logic

import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FilterPanel({ filters, setFilters }) {
  const platforms = ['Windows', 'Mac', 'iOS', 'Android', 'Linux', 'Browser Extension'];
  
  const resetFilters = () => {
    setFilters({
      type: 'all',
      minRating: 0,
      maxPrice: 50,
      platforms: []
    });
  };

  const togglePlatform = (platform) => {
    setFilters(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Service Type */}
        <div>
          <Label className="text-slate-300 mb-2 block">Service Type</Label>
          <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
            <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="VPN">VPN Only</SelectItem>
              <SelectItem value="AdBlocker">Ad Blockers Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div>
          <Label className="text-slate-300 mb-3 block">
            Minimum Rating: <span className="text-cyan-400 font-semibold">{filters.minRating}</span>
          </Label>
          <Slider
            value={[filters.minRating]}
            onValueChange={([value]) => setFilters(prev => ({ ...prev, minRating: value }))}
            min={0}
            max={5}
            step={0.5}
            className="cursor-pointer"
          />
        </div>

        {/* Price Filter */}
        <div>
          <Label className="text-slate-300 mb-3 block">
            Max Monthly Price: <span className="text-cyan-400 font-semibold">${filters.maxPrice}</span>
          </Label>
          <Slider
            value={[filters.maxPrice]}
            onValueChange={([value]) => setFilters(prev => ({ ...prev, maxPrice: value }))}
            min={0}
            max={50}
            step={5}
            className="cursor-pointer"
          />
        </div>

        {/* Platform Filter */}
        <div>
          <Label className="text-slate-300 mb-3 block">Platforms</Label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Badge
                key={platform}
                variant={filters.platforms.includes(platform) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  filters.platforms.includes(platform)
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0'
                    : 'border-slate-600 text-slate-400 hover:border-cyan-500 hover:text-cyan-400'
                }`}
                onClick={() => togglePlatform(platform)}
              >
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
