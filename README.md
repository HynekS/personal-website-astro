# My personal website

This repo contains the source code of my personal blog/portfolio. This is  roughly the third iteration; the first was built with Jekyll and probably never shipped. The second was built with Next.js. I initially used Sanity.io as a CMS, but, however neat Sanity is, the WYSIWYG editor always derailed my train of thought somehow. Nowadays, I write the posts in Markdown, but since I am the cool kid (or am I?) I am _obliged_ to use MDX.

The Next.js + MDX was not bad, but it has issues, and these issues gradually piled up and the project ceased to spark joy (I started a blog post about that but haven't finished it yet). There were a lot of rumors about the great, shiny new framework, Astro. So one day, I decided to migrate and do a complete rewrite.

The great thing about Astro is that most of the APIs are very similar to those used by Next.js. What's even cooler is that Astro allows you to include React components, so I was able to reuse a lot of my old code.

So now the site runs on Astro. Is it all moonlight and roses? Mainly, yes. There _are_ some issues that nudge me towards a mental asylum, though, especially the "relative paths to resources" hell. But I can imagine that this is a tough one to do right, so I can live with it and hope it will be resolved soon.

The site is deployed to Netlify using the GitHub CI/CD pipeline.
