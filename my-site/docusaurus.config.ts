import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Aaliya Raheem – Humanized AI Robot Hakatoon Book',
  tagline: 'Physical AI and Humanoid Robotics Course Textbook',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com', // TODO: Update with your GitHub pages URL
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'your-github-org', // TODO: Update with your GitHub org/user name.
  projectName: 'aaliya-raheem-hakatoon-book', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/your-github-org/aaliya-raheem-hakatoon-book/tree/main/', // TODO: Update with your repo URL
        },
        blog: false, // Optional: disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg', // TODO: Update with a custom social card
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Aaliya Raheem Hakatoon Book',
      logo: {
        alt: 'Aaliya Raheem Hakatoon Book Logo',
        src: 'img/logo.svg', // TODO: Update with a custom logo
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'bookSidebar',
          position: 'left',
          label: 'Home',
        },
        {to: '/docs/chapter1', label: 'Chapter 1', position: 'left'},
        {to: '/docs/chapter2', label: 'Chapter 2', position: 'left'},
        {to: '/docs/chapter3', label: 'Chapter 3', position: 'left'},
        {to: '/docs/chapter4', label: 'Chapter 4', position: 'left'},
        {to: '/docs/chapter5', label: 'Chapter 5', position: 'left'},
        {to: '/docs/chapter6', label: 'Chapter 6', position: 'left'},
        {
          href: 'https://github.com/your-github-org/aaliya-raheem-hakatoon-book', // TODO: Update with your repo URL
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Chapters',
          items: [
            { label: 'Chapter 1', to: '/docs/chapter1' },
            { label: 'Chapter 2', to: '/docs/chapter2' },
            { label: 'Chapter 3', to: '/docs/chapter3' },
            { label: 'Chapter 4', to: '/docs/chapter4' },
            { label: 'Chapter 5', to: '/docs/chapter5' },
            { label: 'Chapter 6', to: '/docs/chapter6' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/your-github-org/aaliya-raheem-hakatoon-book', // TODO: Update with your repo URL
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Aaliya Raheem. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
