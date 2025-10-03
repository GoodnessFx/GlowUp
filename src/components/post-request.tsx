import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, Sparkles, Tag, Type, FileText } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface PostRequestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  { value: 'fashion', label: 'Fashion', icon: '👗', color: 'from-pink-500 to-purple-500' },
  { value: 'fitness', label: 'Fitness', icon: '💪', color: 'from-green-500 to-blue-500' },
  { value: 'skincare', label: 'Skincare', icon: '✨', color: 'from-yellow-500 to-orange-500' }
];

const budgetRanges = [
  'Under $25',
  '$25 - $50',
  '$50 - $100',
  '$100 - $200',
  '$200 - $500',
  '$500+'
];

export function PostRequest({ open, onOpenChange }: PostRequestProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    tags: '',
    urgent: false
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // In a real app, this would make an API call to create the request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Your glow-up request has been posted! 🌟');
      setForm({
        title: '',
        description: '',
        category: '',
        budget: '',
        tags: '',
        urgent: false
      });
      setImagePreview(null);
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to post request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedCategory = categories.find(cat => cat.value === form.category);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-purple-900 border-purple-400/20 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 text-2xl font-bold"
            >
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Post a GlowUp Request
              </span>
            </motion.div>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Share what you need help with and get personalized recommendations from the community
          </DialogDescription>
        </DialogHeader>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Category Selection */}
          <div className="space-y-3">
            <Label className="text-gray-200 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Category *
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category) => (
                <motion.div
                  key={category.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      form.category === category.value
                        ? 'bg-gradient-to-r ' + category.color + ' border-transparent'
                        : 'bg-black/20 border-white/10 hover:border-purple-400/50'
                    }`}
                    onClick={() => setForm({ ...form, category: category.value })}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="text-sm font-medium text-white">{category.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-200 flex items-center gap-2">
              <Type className="w-4 h-4" />
              What do you need help with? *
            </Label>
            <Input
              id="title"
              placeholder="e.g., Need affordable sneakers for daily wear"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-black/20 border-white/10 text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-200 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Tell us more details *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your style, preferences, skin type, fitness goals, budget constraints, etc."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-black/20 border-white/10 text-white placeholder-gray-400 resize-none min-h-[100px]"
              required
            />
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label className="text-gray-200">Budget Range (Optional)</Label>
            <Select value={form.budget} onValueChange={(value) => setForm({ ...form, budget: value })}>
              <SelectTrigger className="bg-black/20 border-white/10 text-white">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-gray-200">Tags (Optional)</Label>
            <Input
              id="tags"
              placeholder="e.g., casual, comfortable, minimalist (separate with commas)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="bg-black/20 border-white/10 text-white placeholder-gray-400"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-gray-200 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Add Image (Optional)
            </Label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-400/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                {imagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-40 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-400">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="text-gray-300">Click to upload an image</p>
                    <p className="text-sm text-gray-400">Show your current style, skin concern, or fitness goal</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Preview */}
          {(form.title || form.category) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <Label className="text-gray-200">Preview</Label>
              <Card className="bg-black/20 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {selectedCategory && (
                      <Badge className={`bg-gradient-to-r ${selectedCategory.color} text-white text-xs`}>
                        {selectedCategory.icon} {selectedCategory.label}
                      </Badge>
                    )}
                    {form.budget && (
                      <Badge variant="outline" className="text-xs border-gray-400 text-gray-400">
                        {form.budget}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-white mb-1">
                    {form.title || 'Your request title will appear here'}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {form.description || 'Your description will appear here'}
                  </p>
                  {form.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {form.tags.split(',').map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-purple-400 text-purple-400">
                          #{tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || !form.title.trim() || !form.description.trim() || !form.category}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
            ) : (
              <Sparkles className="w-5 h-5 mr-2" />
            )}
            {loading ? 'Posting Your Request...' : 'Post GlowUp Request'}
          </Button>
        </motion.form>

        <div className="text-center text-sm text-gray-400 mt-4">
          💡 Tip: The more details you provide, the better recommendations you'll receive!
        </div>
      </DialogContent>
    </Dialog>
  );
}