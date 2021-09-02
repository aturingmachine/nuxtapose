module.exports = {
  base: '/nuxtapose/',
  theme: 'default-prefers-color-scheme',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/getting-started' },
      { text: 'Config', link: '/config' },
      { text: 'API', items: [
        { text: 'Configuration Glossary', link: '/config-glossary' },
        { text: 'Commands', link: '/commands' },
        { text: 'Options', link: '/options' },
        { text: 'Custom Templates', link: '/custom-templates' },
      ]}
    ],
    repo: 'aturingmachine/nuxtapose',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help improve these docs!',
    searchPlaceholder: 'Search These Docs'
  },
  title: 'nuxtapose',
  description: 'nuxtapose - the cli nuxt file generator'
}