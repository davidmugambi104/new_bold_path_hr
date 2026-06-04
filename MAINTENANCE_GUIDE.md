# Bold Path HR Website Maintenance Guide

## Overview
This guide provides instructions for maintaining and updating the Bold Path HR website, including both the public-facing marketing site and the HR Management System (HRMS).

## Website Structure

### Public Website Pages
All public-facing pages are located in the root directory:
- `index.html` - Main landing page
- `company-profile.html` - Company information
- `our-services.html` - HR services details
- `contact-us.html` - Contact information and form
- `client-success.html` - Case studies and testimonials
- `hr-resources.html` - Downloadable resources
- `hr-blog.html` - HR insights and articles
- `careers-opportunities.html` - Career opportunities
- `pricing-plans.html` - Pricing information
- `user-login.html` - User login page
- `user-register.html` - User registration page

### HRMS Admin Pages
Admin pages are located in the `admin` directory:
- `dashboard.html` - Main dashboard
- `employees.html` - Employee management
- `departments.html` - Department management
- `positions.html` - Position management
- `attendance.html` - Attendance tracking
- `leave.html` - Leave management

### Assets
- `css/` - Stylesheets
- `js/` - JavaScript files
- `assets/` - Images and other media
- `docs/` - Documentation files

## Updating Content

### Text Content
To update text content on any page:
1. Open the relevant HTML file
2. Locate the text you want to change
3. Edit the text directly in the HTML
4. Save the file

### Images
To update images:
1. Replace the image file in the `assets/` directory
2. Update the `src` attribute in the HTML if the filename changes
3. Ensure new images are properly optimized for web use

### Links
To update links:
1. Find the `<a>` tag with the link you want to change
2. Update the `href` attribute with the new URL
3. Update the link text if needed

## Adding New Pages

### Creating a New Public Page
1. Create a new HTML file in the root directory
2. Copy the header and footer structure from an existing page
3. Add your new content in the main section
4. Update the navigation if needed
5. Add the new page to `sitemap.xml`

### Creating a New Admin Page
1. Create a new HTML file in the `admin/` directory
2. Copy the admin layout structure from an existing admin page
3. Add your new functionality
4. Update the sidebar navigation in all admin pages

## Styling Updates

### CSS Files
- `css/style.css` - Main stylesheet for public pages
- `css/admin.css` - Stylesheet for admin pages

### Making Style Changes
1. Locate the relevant CSS rule in the appropriate stylesheet
2. Modify the CSS properties as needed
3. Test changes across different browsers and devices
4. Use browser developer tools to debug styling issues

### Adding New Styles
1. Add new CSS rules to the appropriate stylesheet
2. Use descriptive class names following BEM methodology
3. Ensure new styles are responsive
4. Test with existing content to avoid conflicts

## JavaScript Functionality

### Main JavaScript Files
- `js/main.js` - JavaScript for public pages
- `js/admin.js` - JavaScript for admin pages

### Adding New Functionality
1. Identify where the new functionality should be added
2. Write JavaScript code following existing patterns
3. Add event listeners as needed
4. Test functionality across different browsers

### Debugging JavaScript
1. Use browser developer tools console
2. Add `console.log()` statements to track execution
3. Check for JavaScript errors in the console
4. Use breakpoints to step through code

## User Authentication

### Login System
The login system uses:
- `user-login.html` - Login form
- `user-register.html` - Registration form
- Backend authentication via Node.js/Express

### Modifying Authentication
1. Update form fields in the HTML files
2. Modify validation in the JavaScript files
3. Update backend authentication routes as needed

## SEO and Performance

### Sitemap
- `sitemap.xml` contains all public pages
- Update when adding or removing pages
- Submit to search engines regularly

### Meta Tags
Each page includes:
- `<title>` tag for page title
- `<meta name="description">` for search snippets
- Open Graph tags for social sharing

### Performance Optimization
1. Optimize images before uploading
2. Minify CSS and JavaScript for production
3. Use browser caching headers
4. Enable gzip compression on the server

## Security Considerations

### Form Security
- All forms use client-side validation
- Server-side validation is required for production
- Use HTTPS for all form submissions

### Authentication Security
- Passwords should be hashed before storage
- Use secure session management
- Implement rate limiting for login attempts

### Data Protection
- Follow GDPR and local data protection laws
- Implement proper data backup procedures
- Regularly update dependencies to patch vulnerabilities

## Backup and Deployment

### Backup Procedures
1. Regularly backup the entire website directory
2. Backup the database separately
3. Store backups in multiple locations
4. Test backup restoration procedures

### Deployment Process
1. Test all changes in a staging environment
2. Deploy to production during low-traffic periods
3. Monitor the website after deployment
4. Have a rollback plan in case of issues

## Troubleshooting Common Issues

### Pages Not Loading
1. Check file permissions
2. Verify file paths in HTML
3. Check server configuration
4. Review server error logs

### Styling Issues
1. Check browser developer tools for CSS errors
2. Verify CSS file paths
3. Check for conflicting CSS rules
4. Test in different browsers

### JavaScript Errors
1. Check browser console for error messages
2. Verify JavaScript file paths
3. Check for syntax errors
4. Ensure dependencies are loaded in correct order

### Form Submission Issues
1. Check browser console for JavaScript errors
2. Verify form action URLs
3. Check server-side error logs
4. Test form validation

## Regular Maintenance Tasks

### Weekly Tasks
- Check all links for broken URLs
- Review website performance metrics
- Check server logs for errors
- Update content as needed

### Monthly Tasks
- Update dependencies and plugins
- Review and update SEO metadata
- Check website security
- Backup website files and database

### Quarterly Tasks
- Review and update content
- Analyze website traffic and user behavior
- Update case studies and testimonials
- Review and optimize images

## Support and Resources

### Documentation
- This maintenance guide
- `README.md` for setup instructions
- `WEBSITE_SUMMARY.md` for page overview

### Developer Resources
- MDN Web Docs for HTML/CSS/JavaScript
- Node.js documentation for backend
- Express.js documentation for routing

### External Tools
- Browser developer tools for debugging
- Online SEO tools for optimization
- Image optimization tools for performance

## Contact Information

For additional support:
- Website developer: [Your Name/Company]
- Email: support@boldpathhr.com
- Phone: +1 (555) 123-4567

## Version Control

This website should be maintained in a version control system (Git) with:
- Regular commits with descriptive messages
- Branching for feature development
- Pull requests for code review
- Tagging for releases

## Future Enhancements

Consider adding:
- Blog content management system
- Advanced analytics integration
- Multi-language support
- Mobile app integration
- API for third-party integrations