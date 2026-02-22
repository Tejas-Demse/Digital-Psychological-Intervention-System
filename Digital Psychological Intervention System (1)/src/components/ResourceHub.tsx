import { useState } from 'react';
import { Play, Headphones, BookOpen, Download, Globe, Search } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'guide';
  category: string;
  language: string;
  duration?: string;
  description: string;
}

const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Understanding Stress: A Student\'s Guide',
    type: 'video',
    category: 'Stress Management',
    language: 'English',
    duration: '12:30',
    description: 'Learn about stress triggers and evidence-based coping mechanisms.'
  },
  {
    id: '2',
    title: 'Progressive Muscle Relaxation',
    type: 'audio',
    category: 'Relaxation',
    language: 'English',
    duration: '15:00',
    description: 'Guided audio for deep relaxation and tension release.'
  },
  {
    id: '3',
    title: 'Mindfulness Meditation for Beginners',
    type: 'audio',
    category: 'Mindfulness',
    language: 'Hindi',
    duration: '10:00',
    description: 'शुरुआती लोगों के लिए माइंडफुलनेस मेडिटेशन'
  },
  {
    id: '4',
    title: 'Exam Anxiety Management Toolkit',
    type: 'guide',
    category: 'Academic Stress',
    language: 'English',
    description: 'Practical strategies to manage exam-related anxiety and improve performance.'
  },
  {
    id: '5',
    title: 'Sleep Hygiene for Better Mental Health',
    type: 'video',
    category: 'Wellness',
    language: 'English',
    duration: '8:45',
    description: 'Understanding the connection between sleep quality and mental wellbeing.'
  },
  {
    id: '6',
    title: 'Deep Breathing Exercises',
    type: 'audio',
    category: 'Relaxation',
    language: 'Tamil',
    duration: '8:00',
    description: 'மன அமைதிக்கான ஆழ்ந்த சுவாசப் பயிற்சிகள்'
  },
  {
    id: '7',
    title: 'Building Resilience: A Comprehensive Guide',
    type: 'guide',
    category: 'Personal Growth',
    language: 'English',
    description: 'Develop mental toughness and bounce back from challenges stronger.'
  },
  {
    id: '8',
    title: 'Social Anxiety: Understanding & Coping',
    type: 'video',
    category: 'Anxiety',
    language: 'Bengali',
    duration: '14:20',
    description: 'সামাজিক উদ্বেগ বোঝা এবং মোকাবেলা করা'
  },
  {
    id: '9',
    title: 'Evening Relaxation Soundscape',
    type: 'audio',
    category: 'Relaxation',
    language: 'All',
    duration: '20:00',
    description: 'Calming nature sounds and gentle music for evening relaxation.'
  },
  {
    id: '10',
    title: 'Self-Care Strategies for Students',
    type: 'guide',
    category: 'Wellness',
    language: 'English',
    description: 'Practical daily self-care routines tailored for student life.'
  }
];

const CATEGORIES = ['All', 'Stress Management', 'Relaxation', 'Mindfulness', 'Academic Stress', 'Wellness', 'Anxiety', 'Personal Growth'];
const LANGUAGES = ['All', 'English', 'Hindi', 'Tamil', 'Bengali'];

export function ResourceHub() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = RESOURCES.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'All' || resource.language === selectedLanguage || resource.language === 'All';
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLanguage && matchesSearch;
  });

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return Play;
      case 'audio':
        return Headphones;
      case 'guide':
        return BookOpen;
    }
  };

  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-700';
      case 'audio':
        return 'bg-green-100 text-green-700';
      case 'guide':
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Psychoeducational Resource Hub</h2>
        <p className="text-gray-600">
          Access videos, relaxation audio, and mental wellness guides in multiple regional languages.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-1" />
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {LANGUAGES.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => {
          const Icon = getIcon(resource.type);
          return (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Thumbnail */}
              <div className="h-40 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                <Icon className="w-16 h-16 text-white" />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs ${getTypeColor(resource.type)}`}>
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                  {resource.duration && (
                    <span className="text-gray-500 text-sm">{resource.duration}</span>
                  )}
                </div>

                <h3 className="text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {resource.language}
                  </span>
                  <span>{resource.category}</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
                    {resource.type === 'guide' ? 'Read' : 'Play'}
                  </button>
                  {resource.type === 'guide' && (
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-500">No resources found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
