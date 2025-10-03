import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, ChevronUp, Filter, Search, Sparkles, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

interface GlowUpRequest {
  id: string;
  title: string;
  description: string;
  category: 'fashion' | 'fitness' | 'skincare';
  image?: string;
  author: {
    username: string;
    avatar?: string;
  };
  created_at: string;
  upvotes: number;
  responses: Response[];
}

interface Response {
  id: string;
  content: string;
  links?: string[];
  author: {
    username: string;
    avatar?: string;
    level?: string;
  };
  upvotes: number;
  created_at: string;
}

const mockRequests: GlowUpRequest[] = [
  {
    id: '1',
    title: 'Need affordable sneakers for daily wear',
    description: 'Looking for comfortable sneakers under $100 that go with everything. I mostly wear jeans and casual outfits.',
    category: 'fashion',
    author: { username: 'styleseeker', avatar: '' },
    created_at: '2 hours ago',
    upvotes: 12,
    responses: [
      {
        id: '1',
        content: 'Check out Adidas Stan Smiths! They\'re classic, versatile, and usually around $80. Perfect for casual wear.',
        links: ['https://adidas.com/stan-smith'],
        author: { username: 'sneakerhead_sam', level: 'Glow Master' },
        upvotes: 8,
        created_at: '1 hour ago'
      }
    ]
  },
  {
    id: '2',
    title: 'Best serum for acne-prone skin?',
    description: 'I have combination skin with occasional breakouts. Looking for a serum that won\'t clog pores but still moisturizes.',
    category: 'skincare',
    author: { username: 'clearskin_goals', avatar: '' },
    created_at: '4 hours ago',
    upvotes: 24,
    responses: [
      {
        id: '2',
        content: 'The Ordinary Niacinamide 10% + Zinc is amazing for this! Super affordable and really helps with oil control.',
        links: ['https://theordinary.com/niacinamide'],
        author: { username: 'skincare_guru', level: 'Stylist' },
        upvotes: 15,
        created_at: '3 hours ago'
      },
      {
        id: '3',
        content: 'I second The Ordinary! Also try CeraVe PM Facial Moisturizing Lotion - it has niacinamide and hyaluronic acid.',
        author: { username: 'beauty_lover', level: 'Helper' },
        upvotes: 7,
        created_at: '2 hours ago'
      }
    ]
  }
];

const categoryColors = {
  fashion: 'from-pink-500 to-purple-500',
  fitness: 'from-green-500 to-blue-500',
  skincare: 'from-yellow-500 to-orange-500'
};

const categoryIcons = {
  fashion: '👗',
  fitness: '💪',
  skincare: '✨'
};

export function GlowUpFeed() {
  const [requests, setRequests] = useState<GlowUpRequest[]>(mockRequests);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedResponses, setExpandedResponses] = useState<Set<string>>(new Set());
  const [newResponse, setNewResponse] = useState<{ [key: string]: string }>({});
  const [referralLink, setReferralLink] = useState<string>('');

  useEffect(() => {
    // Build referral link from stored user or guest
    try {
      const stored = localStorage.getItem('glowup:user');
      const user = stored ? JSON.parse(stored) : null;
      const code = user?.referralCode || 'GLOWUP';
      setReferralLink(`${window.location.origin}?ref=${code}`);
    } catch {
      setReferralLink(window.location.origin);
    }
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesFilter = filter === 'all' || request.category === filter;
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpvote = async (requestId: string, responseId?: string) => {
    // In a real app, this would make an API call
    setRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        if (responseId) {
          return {
            ...request,
            responses: request.responses.map(response =>
              response.id === responseId
                ? { ...response, upvotes: response.upvotes + 1 }
                : response
            )
          };
        } else {
          return { ...request, upvotes: request.upvotes + 1 };
        }
      }
      return request;
    }));
    toast('Upvoted! ✨');
  };

  const handleAddResponse = async (requestId: string) => {
    const content = newResponse[requestId];
    if (!content?.trim()) return;

    const response: Response = {
      id: Date.now().toString(),
      content,
      author: { username: 'current_user', level: 'Helper' },
      upvotes: 0,
      created_at: 'just now'
    };

    setRequests(prev => prev.map(request =>
      request.id === requestId
        ? { ...request, responses: [...request.responses, response] }
        : request
    ));

    setNewResponse(prev => ({ ...prev, [requestId]: '' }));
    toast('Response added! You earned 10 points! 🌟');
  };

  const toggleResponsesExpanded = (requestId: string) => {
    setExpandedResponses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(requestId)) {
        newSet.delete(requestId);
      } else {
        newSet.add(requestId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Referral CTA */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6"
      >
        <Card className="bg-[#1B1D22] border-white/10">
          <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1">
              <div className="text-sm text-gray-300">Earn rewards by referring friends</div>
              <div className="text-xs text-gray-400 truncate">{referralLink}</div>
            </div>
            <Button
              onClick={() => { navigator.clipboard.writeText(referralLink); toast('Referral link copied'); }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Copy Referral Link
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          GlowUp Feed
        </h1>
        <p className="text-gray-300">Discover requests and help others glow up</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-black/20 border-white/10 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fashion">👗 Fashion</SelectItem>
              <SelectItem value="fitness">💪 Fitness</SelectItem>
              <SelectItem value="skincare">✨ Skincare</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Feed */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-black/20 backdrop-blur-lg border-white/10 hover:border-purple-400/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={request.author.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                          {request.author.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{request.author.username}</span>
                          <Badge className={`bg-gradient-to-r ${categoryColors[request.category]} text-white text-xs`}>
                            {categoryIcons[request.category]} {request.category}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-400">{request.created_at}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpvote(request.id)}
                      className="flex items-center gap-1 text-gray-300 hover:text-purple-400"
                    >
                      <ChevronUp className="w-4 h-4" />
                      {request.upvotes}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{request.title}</h3>
                    <p className="text-gray-300">{request.description}</p>
                  </div>

                  {request.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img src={request.image} alt="Request" className="w-full h-48 object-cover" />
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleResponsesExpanded(request.id)}
                      className="text-gray-300 hover:text-purple-400"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {request.responses.length} responses
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-purple-400">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>

                  {/* Responses */}
                  <AnimatePresence>
                    {expandedResponses.has(request.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 pt-4"
                      >
                        <Separator className="bg-white/10" />
                        
                        {request.responses.map((response) => (
                          <motion.div
                            key={response.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-black/10 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={response.author.avatar} />
                                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-xs">
                                    {response.author.username[0].toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-white">{response.author.username}</span>
                                    {response.author.level && (
                                      <Badge variant="outline" className="text-xs border-purple-400 text-purple-400">
                                        <Star className="w-3 h-3 mr-1" />
                                        {response.author.level}
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-400">{response.created_at}</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUpvote(request.id, response.id)}
                                className="text-gray-300 hover:text-purple-400"
                              >
                                <ChevronUp className="w-3 h-3 mr-1" />
                                {response.upvotes}
                              </Button>
                            </div>
                            
                            <p className="text-gray-200 mb-2">{response.content}</p>
                            
                            {response.links && response.links.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {response.links.map((link, linkIndex) => (
                                  <Button
                                    key={linkIndex}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                                    onClick={() => window.open(link, '_blank')}
                                  >
                                    View Product
                                  </Button>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}

                        {/* Add Response */}
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Share your recommendation..."
                            value={newResponse[request.id] || ''}
                            onChange={(e) => setNewResponse(prev => ({ ...prev, [request.id]: e.target.value }))}
                            className="bg-black/20 border-white/10 text-white placeholder-gray-400 resize-none"
                            rows={3}
                          />
                          <Button
                            onClick={() => handleAddResponse(request.id)}
                            disabled={!newResponse[request.id]?.trim()}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Help Them Glow Up
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-white mb-2">No requests found</h3>
          <p className="text-gray-400">
            {searchQuery ? 'Try a different search term' : 'Be the first to post a glow-up request!'}
          </p>
        </motion.div>
      )}
    </div>
  );
}