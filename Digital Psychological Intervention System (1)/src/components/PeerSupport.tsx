import { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, Clock, Shield, Plus, Search, Loader2 } from 'lucide-react';
import api from '../api/axios';

interface Post {
  id: string;
  author: string;
  isVolunteer: boolean;
  timestamp: Date;
  topic: string;
  content: string;
  likes: number;
  replies: number;
  tags: string[];
}

interface ApiPost {
  id: string | number;
  author_name: string;
  is_volunteer: boolean;
  topic: string;
  content: string;
  created_at: string;
  likes: number;
  tags: string[];
}

const TAGS = ['All', 'Stress', 'Anxiety', 'Academic', 'Social', 'Wellness', 'Self-Care'];

export function PeerSupport() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New Post State
  const [newTopic, setNewTopic] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [selectedTag]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = selectedTag === 'All' ? '/community/posts/' : `/community/posts/?tag=${encodeURIComponent(selectedTag)}`;
      const response = await api.get(url);
      setPosts(response.data);
    } catch (err) {
      console.error('Failed to load posts', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesSearch = post.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Peer Support Platform</h2>
        <p className="text-gray-600">
          Connect with fellow students in a safe, moderated environment. Trained peer volunteers are here to support you.
        </p>
      </div>

      {/* Guidelines Banner */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-purple-900 mb-1">Community Guidelines</p>
            <p className="text-purple-800 text-sm">
              Be respectful, supportive, and kind. All posts are moderated by trained volunteers. 
              If you need urgent help, please contact a professional counsellor or call 1-800-HELP-NOW.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedTag === tag
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowNewPost(!showNewPost)}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Post
        </button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-gray-900 mb-4">Create New Post</h3>
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              if (!newTopic.trim() || !newContent.trim()) return;
              setIsSubmitting(true);
              try {
                await api.post('/community/posts/', {
                  topic: newTopic,
                  content: newContent,
                  tags: newTags,
                  is_anonymous: true
                });
                setNewTopic('');
                setNewContent('');
                setNewTags([]);
                setShowNewPost(false);
                fetchPosts();
              } catch (err) {
                console.error('Failed to create post', err);
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-700 mb-2">Topic</label>
              <input
                type="text"
                required
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="What would you like to discuss?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Content</label>
              <textarea
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Share your thoughts... (Posts are anonymous)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {TAGS.slice(1).map(tag => (
                  <label key={tag} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={newTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) setNewTags(prev => [...prev, tag]);
                        else setNewTags(prev => prev.filter(t => t !== tag));
                      }}
                    />
                    <span className="text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Post Anonymously'}
              </button>
              <button
                type="button"
                onClick={() => setShowNewPost(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts */}
      {loading ? (
        <div className="flex items-center justify-center p-12">
           <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      ) : (
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  post.is_volunteer ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <MessageCircle className={`w-5 h-5 ${
                    post.is_volunteer ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">{post.author_name}</span>
                    {post.is_volunteer && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                        Volunteer / Admin
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{getTimeAgo(new Date(post.created_at))}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <h3 className="text-gray-900 mb-2">{post.topic}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span>{post.likes} Likes</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>0 Replies</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {(!loading && filteredPosts.length === 0) && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-500">No posts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
