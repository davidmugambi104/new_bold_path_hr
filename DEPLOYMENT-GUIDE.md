# Bold Path HR Website Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the Bold Path HR website to various hosting platforms. The website is built with static HTML, CSS, and JavaScript, making it compatible with virtually any web hosting service.

## Prerequisites
- All website files (HTML, CSS, JavaScript, images, etc.)
- A hosting account (free or paid)
- Basic knowledge of file management (uploading files via FTP or file manager)

## Deployment Options

### Option 1: GitHub Pages (Free)
GitHub Pages is a free hosting service for static websites.

#### Steps:
1. Create a GitHub account if you don't have one
2. Create a new repository named `boldpathhr` (or any name you prefer)
3. Upload all website files to the repository
4. Go to repository Settings > Pages
5. Select "Deploy from a branch" and choose the main branch
6. Your website will be available at `https://[username].github.io/boldpathhr`

### Option 2: Netlify (Free)
Netlify offers free hosting with additional features like continuous deployment.

#### Steps:
1. Create a Netlify account
2. Drag and drop the entire website folder to Netlify's deployment area
3. Netlify will automatically deploy your site
4. You'll receive a unique URL for your website

### Option 3: Vercel (Free)
Vercel is another excellent option for static site hosting.

#### Steps:
1. Create a Vercel account
2. Import the website files or connect to your Git repository
3. Vercel will automatically build and deploy your site
4. You'll receive a unique URL for your website

### Option 4: Traditional Web Hosting
Most traditional web hosting providers support static websites.

#### Steps:
1. Upload all website files to your hosting account using:
   - FTP client (FileZilla, Cyberduck, etc.)
   - Hosting provider's file manager
2. Make sure `index.html` is in the root directory (public_html or www)
3. Your website should be accessible via your domain name

## File Structure for Deployment
Ensure all files are uploaded maintaining the following structure:
```
/
├── index.html
├── services.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── logo.svg
│   ├── hero-bg.jpg
│   ├── case-study-1.jpg
│   ├── case-study-2.jpg
│   └── case-study-3.jpg
├── start-server.sh
├── README.md
└── DEPLOYMENT-GUIDE.md
```

## Post-Deployment Checklist

### 1. Verify Website Functionality
- [ ] Check that all pages load correctly
- [ ] Verify navigation works properly
- [ ] Test all forms (contact, newsletter)
- [ ] Check mobile responsiveness
- [ ] Verify all images load correctly
- [ ] Test interactive elements (FAQ accordion, etc.)

### 2. Update Contact Information
- [ ] Replace placeholder contact information with actual details
- [ ] Update social media links
- [ ] Verify phone numbers and email addresses

### 3. SEO Optimization
- [ ] Add Google Analytics tracking code
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta descriptions
- [ ] Check alt text for images

### 4. Performance Optimization
- [ ] Optimize images for web use
- [ ] Minify CSS and JavaScript files
- [ ] Enable browser caching
- [ ] Use a Content Delivery Network (CDN) if available

## Domain Configuration (Optional)
If you want to use a custom domain:

### For GitHub Pages:
1. Purchase a domain from a registrar (Namecheap, GoDaddy, etc.)
2. In your GitHub repository settings, add your custom domain
3. Update DNS settings with your domain registrar

### For Netlify/Vercel:
1. Purchase a domain from a registrar
2. Add the domain to your Netlify/Vercel project settings
3. Update DNS settings as provided by the platform

## Troubleshooting Common Issues

### Website Not Loading
- Ensure `index.html` is in the root directory
- Check file permissions (should be readable)
- Verify all file paths are correct

### Images Not Displaying
- Check that image files are uploaded
- Verify file names and extensions match references
- Ensure images are in the correct directory

### Forms Not Working
- Forms require server-side processing
- Implement a form handling service (Formspree, Netlify Forms, etc.)
- Or set up your own server-side script

### Mobile Responsiveness Issues
- Test on actual mobile devices
- Check CSS media queries
- Verify viewport meta tag is present

## Maintenance Recommendations

### Regular Updates
- Update content regularly
- Add new case studies and testimonials
- Refresh statistics and achievements
- Keep contact information current

### Security
- Keep hosting platform updated
- Use HTTPS (most platforms provide free SSL)
- Regularly check for broken links
- Monitor website performance

### Backups
- Regularly backup website files
- Keep a local copy of all files
- Consider version control (Git)

## Support
For technical issues with the website:
1. Check browser console for error messages
2. Verify all files are uploaded correctly
3. Ensure file paths are correct
4. Contact your hosting provider for server-related issues

For content updates and enhancements:
1. Refer to the README.md file for project documentation
2. Contact the development team for significant changes

## Additional Resources
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Google Analytics](https://analytics.google.com/)
- [Google Search Console](https://search.google.com/search-console)

## Contact Information
For questions about this deployment guide:
- Email: info@boldpathhrandbusinesssolutions.co.ke
- Phone: 0795959416

---
© 2026 Bold Path HR & Business Solutions. All rights reserved.