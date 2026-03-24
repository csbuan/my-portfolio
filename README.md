# My Portfolio

A modern portfolio website built with Next.js and React, ready for deployment on Vercel.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Deployment**: Vercel

## Features

- 🎨 Modern, responsive design
- ⚡ Fast performance with Next.js
- 📱 Mobile-friendly
- 🎯 Easy to customize
- 🚀 Ready for Vercel deployment

## Project Structure

```
my-portfolio/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── page.module.css      # Home page styles
│   ├── about/
│   │   ├── page.tsx         # About page
│   │   └── about.module.css # About page styles
│   ├── projects/
│   │   ├── page.tsx         # Projects page
│   │   └── projects.module.css # Projects page styles
│   └── contact/
│       ├── page.tsx         # Contact page
│       └── contact.module.css # Contact page styles
├── public/                  # Static assets
├── package.json
├── next.config.js
├── tsconfig.json
└── vercel.json             # Vercel configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with create-next-app.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Adding Your Content

1. **Home Page**: Edit `app/page.tsx` to add your hero section and featured projects
2. **Projects**: Edit `app/projects/page.tsx` and update the `projects` array with your work
3. **About**: Edit `app/about/page.tsx` to add your bio, skills, and experience
4. **Contact**: Edit `app/contact/page.tsx` to add your contact information

### Styling

All pages use CSS Modules for scoped styling. Each page has a corresponding `.module.css` file where you can customize colors, fonts, and layout.

Global styles are in `app/globals.css`.

## Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Next.js project
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. From the project directory, run:
```bash
vercel
```

3. Follow the prompts to deploy

## Environment Variables

If you need environment variables, create a `.env.local` file in the root directory:

```
# Example
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Form Submission (Contact Page)

The contact form currently logs to the console. To enable actual email functionality, you can:

1. Integrate with services like:
   - Emailjs
   - SendGrid
   - Nodemailer
   - Firebase

2. Create an API route in `app/api/` to handle form submissions

## Performance Optimization

This portfolio is optimized for:
- Fast loading times with Next.js image optimization
- Responsive design that works on all devices
- SEO-friendly with proper meta tags

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Next Steps

1. Customize the content with your information
2. Add your project details and images
3. Update contact information
4. Deploy to Vercel
5. Set up a custom domain

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)

---

Happy coding! 🚀
