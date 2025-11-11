import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'HP Dev Agent - Analysis Dashboard',
  tagline: 'Multi-Persona AI Agent System for JIRA Issue Analysis & Implementation',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://localhost',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hp-dev-agent', // HP Dev Agent organization
  projectName: 'analysis-workspace', // Analysis workspace

  onBrokenLinks: 'warn', // Changed to warn to allow development flexibility

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
          routeBasePath: '/', // Make docs the root path
          sidebarPath: './sidebars.ts',
          // editUrl removed - no edit links needed
        },
        blog: false, // Disable blog functionality
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'HP Dev Agent',
      logo: {
        alt: 'HP Dev Agent Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'issuesSidebar',
          position: 'left',
          label: 'Issues',
        },
        {
          type: 'docSidebar',
          sidebarId: 'documentationSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'developmentSidebar',
          position: 'left',
          label: 'Development',
        },
        {
          type: 'docSidebar',
          sidebarId: 'analyticsSidebar',
          position: 'left',
          label: 'Analytics',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Analysis Dashboard',
          items: [
            {
              label: 'All Issues',
              to: '/',
            },
          ],
        },
        {
          title: 'HP Dev Agent',
          items: [
            {
              label: 'Constitution',
              to: '/constitution',
            },
            {
              label: 'Workflows',
              to: '/workflows',
            },
            {
              label: 'Architecture',
              to: '/architecture',
            },
          ],
        },
      ],
      copyright: `HP Dev Agent © ${new Date().getFullYear()} - Multi-Persona AI Agent System`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
