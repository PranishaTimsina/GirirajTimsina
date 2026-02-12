# SEO Meta Tags & What They Do

## Understanding the Changes Made

### 1. Title Tag
```html
<title>Giri Raj Timshina - Yoga, Meditation & Wellness Master | International Teacher</title>
```
**Why it matters**: This is what appears in Google search results and browser tab
**Best practices**: 
- Start with your name/keyword
- Keep under 60 characters
- Include your specialty

---

### 2. Meta Description
```html
<meta name="description" content="Giri Raj Timshina is an International Yoga, Meditation & Wellness Master...">
```
**Why it matters**: This 155 character preview appears under your title in Google results
**Best practices**:
- Include your name
- Mention key services
- Make it compelling (people click on good descriptions)
- Keep around 155 characters

---

### 3. Keywords Meta Tag
```html
<meta name="keywords" content="Giri Raj Timshina, Yoga Master, Yoga Teacher Vietnam...">
```
**Why it matters**: Tells Google what your page is about
**Best practices**:
- Include main keyword first (your name)
- Add service keywords
- Add location keywords
- Separated by commas

---

### 4. Robots Meta Tag
```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
```
**Why it matters**: Tells Google's crawler what to do
**What it means**:
- `index` = Index this page
- `follow` = Follow links on this page
- `max-snippet:-1` = Show full snippet in results
- `max-image-preview:large` = Show large images in results
- `max-video-preview:-1` = Show video previews

---

### 5. Canonical URL
```html
<link rel="canonical" href="https://girajtimshina.com">
```
**Why it matters**: Tells Google this is the official version of the page
**Use when**:
- Preventing duplicate content issues
- Multiple URLs lead to same content
- Mobile and desktop versions

---

### 6. Open Graph Tags
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="website">
<meta property="og:url" content="https://girajtimshina.com">
<meta property="og:image" content="...">
```
**Why it matters**: Controls how your page looks when shared on Facebook, Instagram, etc.
**Example**:
- When someone shares your link on Facebook
- A nice preview card appears with title, description, and image
- Improves sharing and visibility

---

### 7. Twitter Card Tags
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```
**Why it matters**: Controls how your page looks when shared on Twitter/X
**Benefits**:
- Better looking share on Twitter
- Increases click-through rate
- More visibility on social platforms

---

## Schema.org Structured Data (JSON-LD)

### What is it?
Structured data is like giving Google a roadmap of your content. It says "This is a person named Giri Raj Timshina, they teach yoga, they live in Da Nang, etc."

### Three Types Added:

#### 1. Person Schema
```json
{
  "@type": "Person",
  "name": "Giri Raj Timshina",
  "jobTitle": "International Yoga, Meditation & Wellness Master",
  "yearsOfExperience": 20,
  "knowsAbout": ["Yoga", "Meditation", "Reiki", ...]
}
```
**Why**: Establishes your expertise and identity

#### 2. LocalBusiness Schema
```json
{
  "@type": "LocalBusiness",
  "name": "Giri Raj Timshina Wellness",
  "address": {
    "addressLocality": "Da Nang",
    "addressCountry": "Vietnam"
  },
  "knowsAbout": ["Yoga", "Meditation", "Reiki", ...]
}
```
**Why**: Helps with local SEO and "Near Me" searches

#### 3. BreadcrumbList Schema
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "position": 1,
      "name": "Home",
      "item": "https://girajtimshina.com"
    }
  ]
}
```
**Why**: Shows navigation structure to Google

---

## Sitemap.xml

**What it is**: A file listing all pages on your website

**Looks like**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://girajtimshina.com</loc>
    <lastmod>2026-02-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Why you need it**:
- Helps Google find all your pages
- Tells Google which pages are important
- Speeds up indexing

**How to submit**:
1. Go to Google Search Console
2. Click "Sitemaps"
3. Add: `https://girajtimshina.com/sitemap.xml`

---

## Robots.txt

**What it is**: A file that tells search engine bots how to behave

**Looks like**:
```
User-agent: *
Allow: /
Sitemap: https://girajtimshina.com/sitemap.xml
```

**What it does**:
- `Allow: /` = Google can crawl everything
- `Disallow: /private/` = Don't crawl private folders
- `Sitemap:` = Location of your sitemap

---

## Summary

| Tag | Purpose | Example |
|-----|---------|---------|
| Title | Appears in search results | "Giri Raj Timshina - Yoga Master" |
| Meta Description | Search result preview | "20+ years teaching yoga..." |
| Keywords | Topics of the page | "Yoga, Meditation, Da Nang" |
| Canonical | Official page version | Prevents duplicate content |
| Open Graph | Social media preview | Title, image when shared |
| Schema | Structured data for Google | Person, LocalBusiness info |
| Sitemap | List of all pages | Helps Google crawl efficiently |
| Robots.txt | Crawler instructions | Which pages to index |

---

## How Long Until You Rank #1?

**Timeline**:
- **Week 1-2**: Google discovers your page
- **Week 2-4**: Initial indexing
- **Month 1-3**: Rankings start appearing
- **Month 3-6**: Better rankings with backlinks
- **Month 6+**: Top rankings (if you do backlinks + content)

**Factors affecting speed**:
- Age of domain
- Quality of backlinks
- Amount of content
- Social signals
- Reviews and ratings

---

## Most Important Reminder

Your name "Giri Raj Timshina" is your #1 keyword. Make sure it appears:
- ✅ In your page title
- ✅ In your meta description
- ✅ In H1 tags
- ✅ Throughout your content naturally
- ✅ In image alt text
- ✅ In schema markup

This ensures Google knows that YOUR website is about YOU! 🎯
