import React, { useState } from 'react';
import { Newspaper, Search, Clock, User, ArrowRight, ArrowLeft, MessageSquare, Share2, Heart, ChevronRight } from 'lucide-react';
import { BlogPost as BlogPostType, Page } from '../types';
import { blogPosts } from '../data';

interface BlogPageProps {
  setPage: (p: Page) => void;
  selectedBlogPost: number | null;
  setSelectedBlogPost: (id: number | null) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ setPage, selectedBlogPost, setSelectedBlogPost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');

  const blogCategories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const filtered = blogPosts.filter(p => {
    if (category !== 'All' && p.category !== category) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const selectedPost = selectedBlogPost ? blogPosts.find(p => p.id === selectedBlogPost) : null;

  if (selectedPost) {
    return (
      <div className="page-container">
        <button className="back-btn" onClick={() => setSelectedBlogPost(null)}>
          <ArrowLeft size={16}/> Back to Blog
        </button>
        <article className="blog-article">
          <div className="blog-article-hero">
            <img src={selectedPost.img} alt={selectedPost.title} className="blog-article-img"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div className="blog-article-content">
            <span className="blog-tag">{selectedPost.category}</span>
            <h1 className="blog-article-title">{selectedPost.title}</h1>
            <div className="blog-meta">
              <span><User size={14}/> {selectedPost.author}</span>
              <span><Clock size={14}/> {selectedPost.date}</span>
              <span><Clock size={14}/> {selectedPost.readTime} read</span>
            </div>
            <div className="blog-body">
              <p>{selectedPost.excerpt}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <h2>Key Highlights</h2>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
              <h2>What We Recommend</h2>
              <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.</p>
            </div>
            <div className="blog-actions">
              <button className="btn-outline"><Heart size={14}/> Like</button>
              <button className="btn-outline"><Share2 size={14}/> Share</button>
              <button className="btn-outline"><MessageSquare size={14}/> Comments (12)</button>
            </div>

            {/* Comments Section */}
            <div className="blog-comments">
              <h3>Comments (3)</h3>
              {[
                { name: 'Ahmed M.', text: 'Great article! Very helpful and informative.', date: '2 days ago' },
                { name: 'Sara K.', text: 'I loved this. Please write more articles like this!', date: '1 day ago' },
                { name: 'Omar H.', text: 'Very detailed review. Thank you for the recommendations.', date: '5 hours ago' },
              ].map((c, i) => (
                <div key={i} className="blog-comment">
                  <div className="blog-comment-avatar">{c.name[0]}</div>
                  <div className="blog-comment-body">
                    <div className="blog-comment-header">
                      <strong>{c.name}</strong>
                      <span>{c.date}</span>
                    </div>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  const featuredPost = filtered.find(p => p.featured) || filtered[0];
  const otherPosts = filtered.filter(p => p !== featuredPost);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title"><Newspaper size={24}/> Blog</h1>
          <p className="page-subtitle">Tips, guides, and the latest trends</p>
        </div>
        <div className="blog-search">
          <Search size={16}/>
          <input placeholder="Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className="blog-categories">
        {blogCategories.map(c => (
          <button key={c} className={`filter-chip${category === c ? ' active' : ''}`}
            onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {featuredPost && (
        <div className="blog-featured" onClick={() => setSelectedBlogPost(featuredPost.id)}>
          <div className="blog-featured-img-wrap">
            <img src={featuredPost.img} alt={featuredPost.title} className="blog-featured-img"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div className="blog-featured-content">
            <span className="blog-tag">{featuredPost.category}</span>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.excerpt}</p>
            <div className="blog-meta">
              <span><User size={14}/> {featuredPost.author}</span>
              <span><Clock size={14}/> {featuredPost.readTime} read</span>
            </div>
            <button className="btn-read-more">Read More <ChevronRight size={14}/></button>
          </div>
        </div>
      )}

      <div className="blog-grid">
        {otherPosts.map(post => (
          <div key={post.id} className="blog-card" onClick={() => setSelectedBlogPost(post.id)}>
            <div className="blog-card-img-wrap">
              <img src={post.img} alt={post.title} className="blog-card-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div className="blog-card-content">
              <span className="blog-tag">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-meta">
                <span><Clock size={14}/> {post.readTime}</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
