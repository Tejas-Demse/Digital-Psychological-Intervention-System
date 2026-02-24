import { useState, useEffect } from 'react';
import { Play, Headphones, BookOpen, Download, Globe, Search, Loader2 } from 'lucide-react';
import api from '../api/axios';

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'guide';
  category: string;
  language: string;
  duration?: string;
  description: string;
}

const CATEGORIES = ['All', 'Stress Management', 'Relaxation', 'Mindfulness', 'Academic Stress', 'Wellness', 'Anxiety', 'Personal Growth'];
const LANGUAGES = ['All', 'English', 'Hindi', 'Tamil', 'Bengali'];

export function ResourceHub() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get('/resources/');
        setResources(res.data.map((r: any) => ({
            id: r.id.toString(),
            title: r.title,
            type: r.type === 'article' || r.type === 'guide' || r.type === 'exam_tip' || r.type === 'wellness_guide' ? 'guide' : r.type,
            category: r.category || 'Wellness',
            language: 'English',
            description: r.description || r.content?.substring(0, 100) || '',
        })));
      } catch (err) {
        console.error("Failed to fetch resources", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'All' || resource.language === selectedLanguage || resource.language === 'All';
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLanguage && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'audio': return Headphones;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-700 bg-red-50';
      case 'audio': return 'text-green-700 bg-green-50';
      default: return 'text-blue-700 bg-blue-50';
    }
  };

  if (loading) {
     return (
       <div className="flex justify-center items-center py-20">
         <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
         <span className="ml-3 text-gray-500 font-medium">Loading educational resources...</span>
       </div>
     );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Psychoeducational Resource Hub</h2>
        <p className="text-gray-600">
          Access videos, relaxation audio, and mental wellness guides in multiple regional languages.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              {LANGUAGES.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-gray-900">Available Materials</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => {
            const Icon = getIcon(resource.type);
            const typeColor = getTypeColor(resource.type);
            
            return (
              <div
                key={resource.id}
                className="border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:border-blue-300 hover:shadow-md transition-all bg-white"
              >
                {/* Header Icon Area */}
                <div className={`p-4 flex items-center justify-between border-b border-gray-100 ${typeColor}`}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold text-sm capitalize">{resource.type}</span>
                  </div>
                  {resource.duration && (
                    <span className="text-sm font-medium opacity-80">{resource.duration}</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="text-gray-900 font-medium mb-2 line-clamp-2 title-font">{resource.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{resource.description}</p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <Globe className="w-3 h-3" />
                      {resource.language}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {resource.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      {resource.type === 'guide' ? 'Read' : 'Play'}
                    </button>
                    {resource.type === 'guide' && (
                      <button className="px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredResources.length === 0 && (
          <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-lg mt-6">
            <p className="text-gray-500">No resources found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
