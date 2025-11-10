
export const translateText = <
  Component extends keyof (typeof UIText)["en"],
  Label extends keyof (typeof UIText)["en"][Component]
>(
  component: Component,
  label: Label,
  lang: keyof typeof UIText
) =>
  (UIText[lang] as (typeof UIText)["en"])[component][label];

export const UIText = {
  en: {
    footer: {
      codeGitHub: 'Code on GitHub'
    },
    navBar: {
      recipe: 'Recipe',
      list: 'List'
    },
    navMenu: {
      home: 'Recipes',
      admin: 'Admin'
    },
    modal: {
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    filter: {
      cuisines: 'Cuisines',
      category: 'Category',
      sort: 'Sort By'
    },
    metadata: {
      weekly: 'Weekly list inclusion',
      title: 'Recipe title',
      description: 'Short description',
      selectCategory: 'Select category',
      selectCuisine: 'Select cuisines'
    },
    buttons: {
      next: 'Next',
    },    
  },
  sv: {
    footer: {
      codeGitHub: 'Länk till GitHub'
    },
    navBar: {
      recipe: 'Recipe',
      list: 'List'
    },
    navMenu: {
      home: 'Recept',
      admin: 'Admin'
    },
    modal: {
      confirm: 'Bekräfta',
      cancel: 'Avbryt'
    },
    filter: {
      cuisines: 'Kök',
      kategori: 'Kategori',
      sort: 'Sortera'
    },
    metadata: {
      weekly: 'Inkludera i veckolistor:',
      title: 'Recepttitel',
      description: 'Kort beskrivning',
      selectCategory: 'Välj kategori',
      selectCuisine: 'Välj kök'
    },
    buttons: {

    },
  }
} as const

