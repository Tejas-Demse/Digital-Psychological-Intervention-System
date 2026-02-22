import { useState } from 'react';
import { MessageCircle, ThumbsUp, Clock, Shield, Plus, Search } from 'lucide-react';

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

const POSTS: Post[] = [
  {
    id: '1',
    author: 'Anonymous Student',
    isVolunteer: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    topic: 'Managing Exam Stress',
    content: 'I have final exams coming up and feeling really overwhelmed. How do you all manage exam stress? Any tips would be helpful.',
    likes: 12,
    replies: 5,
    tags: ['Stress', 'Exams', 'Academic']
  },
  {
    id: '2',
    author: 'Peer Volunteer Maya',
    isVolunteer: true,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    topic: 'Self-Care During Busy Times',
    content: 'Hi everyone! As a peer volunteer, I wanted to share some self-care tips that helped me during busy periods: 1) Schedule breaks, 2) Stay hydrated, 3) Connect with friends, 4) Practice 5-min meditation. What works for you?',
    likes: 24,
    replies: 8,
    tags: ['Self-Care', 'Wellness', 'Tips']
  },
  {
    id: '3',
    author: 'Anonymous Student',
    isVolunteer: false,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    topic: 'Feeling Isolated',
    content: 'Is anyone else feeling disconnected from their peers? I moved to campus recently and finding it hard to make connections.',
    likes: 8,
    replies: 12,
    tags: ['Social', 'Loneliness', 'Support']
  },
  {
    id: '4',
    author: 'Peer Volunteer Raj',
    isVolunteer: true,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    topic: 'Breathing Exercise for Anxiety',
    content: 'Quick breathing technique for when anxiety hits: Box Breathing - Inhale for 4, Hold for 4, Exhale for 4, Hold for 4. Repeat 4 times. This activates your parasympathetic nervous system and helps calm you down. Try it!',
    likes: 35,
    replies: 6,
    tags: ['Anxiety', 'Techniques', 'Mindfulness']
  },
  {
    id: '5',
    author: 'Anonymous Student',
    isVolunteer: false,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    topic: 'Sleep Schedule Struggling',
    content: 'My sleep schedule is completely messed up. I stay up late studying and then can\'t wake up for morning classes. Any advice on fixing sleep patterns?',
    likes: 15,
    replies: 9,
    tags: ['Sleep', 'Wellness', 'Academic']
  }
];

const TAGS = ['All', 'Stress', 'Anxiety', 'Academic', 'Social', 'Wellness', 'Self-Care'];

export function PeerSupport() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const filteredPosts = POSTS.filter(post => {
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
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Topic</label>
              <input
                type="text"
                placeholder="What would you like to discuss?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Content</label>
              <textarea
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
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Post Anonymously
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
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  post.isVolunteer ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <MessageCircle className={`w-5 h-5 ${
                    post.isVolunteer ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">{post.author}</span>
                    {post.isVolunteer && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                        Volunteer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{getTimeAgo(post.timestamp)}</span>
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
                <span>{post.replies} Replies</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-500">No posts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
