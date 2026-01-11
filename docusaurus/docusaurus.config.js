
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Aaliya Raheem Physical Humanize AI Robot',
  tagline: 'The complete book on Physical AI and Humanoid Robotics',
  url: 'https://example.com', // Replace with your actual hosting URL
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico', // You would need to create this file

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Edit this to point to your repo.
          editUrl:
            'https://github.com/your-username/your-repo/tree/main/',
        },
        blog: false, // Optional: disable the blog plugin
        theme: {
          customCss: require.resolve('./src/css/custom.css'), // You would need to create this file
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Aaliya Raheem AI Book',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg', // You would need to create this file
        },
        items: [
          {
            type: 'doc',
            docId: 'chapter1', // Entry point to your docs
            position: 'left',
            label: 'Book',
          },
          // {href: 'https://github.com/facebook/docusaurus', label: 'GitHub', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Aaliya Raheem Project. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
