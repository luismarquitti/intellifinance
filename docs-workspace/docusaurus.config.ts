// analysis-workspace/docusaurus.config.ts

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'IntelliFinance AI',
  tagline: 'Documentação e Memória Persistente do Agente',
  favicon: 'img/favicon.ico',

  // Configuração para publicação no GitHub Pages
  url: 'https://your-github-org.github.io', // TODO: Substitua 'your-github-org' pelo nome da sua organização/usuário no GitHub
  baseUrl: '/intellifinance/', // O nome do seu repositório
  organizationName: 'your-github-org', // TODO: Substitua pelo nome da sua organização/usuário
  projectName: 'intellifinance', // O nome do seu repositório
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Aponta para o diretório de documentação correto
          path: 'docs',
          routeBasePath: '/', // Serve os docs na raiz do site
        },
        blog: false, // Desabilitado, pois não é necessário
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Habilita o suporte para diagramas Mermaid
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    // TODO: Adicionar imagem do logo
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'IntelliFinance AI',
      logo: {
        alt: 'IntelliFinance Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar', // Use the new unified sidebar
          position: 'left',
          label: 'Documentation', // More encompassing label
        },
        {
          href: 'https://github.com/your-org/intellifinance', // Generic placeholder
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Development Control Files',
              to: '/development/plan',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/your-org/intellifinance', // Generic placeholder
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} IntelliFinance Project. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;