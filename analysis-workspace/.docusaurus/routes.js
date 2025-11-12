import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/analytics',
    component: ComponentCreator('/analytics', '86e'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '284'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '8c0'),
        routes: [
          {
            path: '/tags',
            component: ComponentCreator('/tags', 'ce1'),
            exact: true
          },
          {
            path: '/tags/analysis',
            component: ComponentCreator('/tags/analysis', 'a74'),
            exact: true
          },
          {
            path: '/tags/bug',
            component: ComponentCreator('/tags/bug', '3ce'),
            exact: true
          },
          {
            path: '/tags/example',
            component: ComponentCreator('/tags/example', 'b3e'),
            exact: true
          },
          {
            path: '/tags/p-2',
            component: ComponentCreator('/tags/p-2', 'a2a'),
            exact: true
          },
          {
            path: '/',
            component: ComponentCreator('/', '223'),
            routes: [
              {
                path: '/analytics',
                component: ComponentCreator('/analytics', 'c59'),
                exact: true,
                sidebar: "analyticsSidebar"
              },
              {
                path: '/development/',
                component: ComponentCreator('/development/', '230'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/changelog',
                component: ComponentCreator('/development/changelog', 'f4b'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/code-state',
                component: ComponentCreator('/development/code-state', '384'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/dev_tools_integration',
                component: ComponentCreator('/development/dev_tools_integration', '940'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/plan',
                component: ComponentCreator('/development/plan', '5fa'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/sdd-workflow',
                component: ComponentCreator('/development/sdd-workflow', '5c5'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/specs',
                component: ComponentCreator('/development/specs', 'cad'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/summaries/docusaurus-concepts',
                component: ComponentCreator('/development/summaries/docusaurus-concepts', '136'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/summaries/init-concepts',
                component: ComponentCreator('/development/summaries/init-concepts', 'cc3'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/summaries/phase-5-summary',
                component: ComponentCreator('/development/summaries/phase-5-summary', '607'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/todo',
                component: ComponentCreator('/development/todo', 'a20'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/development/tool-analysis',
                component: ComponentCreator('/development/tool-analysis', 'c81'),
                exact: true,
                sidebar: "developmentSidebar"
              },
              {
                path: '/documentation',
                component: ComponentCreator('/documentation', 'd5d'),
                exact: true,
                sidebar: "documentationSidebar"
              },
              {
                path: '/jira-issues',
                component: ComponentCreator('/jira-issues', 'f51'),
                exact: true,
                sidebar: "issuesSidebar"
              },
              {
                path: '/jira-issues/HPXAPPS-47475/',
                component: ComponentCreator('/jira-issues/HPXAPPS-47475/', 'ccb'),
                exact: true,
                sidebar: "issuesSidebar"
              },
              {
                path: '/jira-issues/HPXAPPS-47475/epic-comparison',
                component: ComponentCreator('/jira-issues/HPXAPPS-47475/epic-comparison', '0c0'),
                exact: true,
                sidebar: "issuesSidebar"
              },
              {
                path: '/jira-issues/HPXAPPS-47475/feature-flags-evidence',
                component: ComponentCreator('/jira-issues/HPXAPPS-47475/feature-flags-evidence', '9b2'),
                exact: true,
                sidebar: "issuesSidebar"
              },
              {
                path: '/jira-issues/HPXAPPS-47475/issue-description',
                component: ComponentCreator('/jira-issues/HPXAPPS-47475/issue-description', '977'),
                exact: true,
                sidebar: "issuesSidebar"
              },
              {
                path: '/jira-issues/HPXAPPS-47475/quick-reference',
                component: ComponentCreator('/jira-issues/HPXAPPS-47475/quick-reference', '3b9'),
                exact: true,
                sidebar: "issuesSidebar"
              },
              {
                path: '/jira-issues/HPXAPPS-EXAMPLE/',
                component: ComponentCreator('/jira-issues/HPXAPPS-EXAMPLE/', '654'),
                exact: true,
                sidebar: "issuesSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', '697'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
