export const translateText = <
  Lang extends keyof typeof UIText,
  Component extends keyof typeof UIText[Lang],
  Label extends keyof typeof UIText[Lang][Component]
>(
  component: Component,
  label: Label,
  lang: Lang
) => UIText[lang][component][label];

export const UIText = {
  en: {
    navMenu: {
      home: 'Recipes',
      admin: 'Admin',
      profile: 'Profile'
    },
    buttons: {
      next: "Next",
      back: 'Back',
      preview: 'Preview',
      previewRecipe: 'Preview recipe',
      submit: 'Submit',
      edit: 'Edit recipe',
    },
    footer: {
      codeGitHub: 'Code on GitHub'
    },
    settings: {
      title: 'Select language'
    },
    navBar: {
      recipe: 'Recipe',
      list: 'List'
    },
    modal: {
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
    filter: {
      cuisines: 'Cuisines',
      category: 'Category',
      sort: 'Sort By'
    },
    metadata: {
      create: 'Create recipe',
      weekly: 'Weekly list inclusion',
      title: 'Recipe title',
      description: 'Short description',
      selectCategory: 'Select categories',
      selectCuisine: 'Select cuisines'
    },
    ingredients: {
      title: 'Add ingredients',
      simplify: 'Simplified entry',
      ingredients: 'Ingredients',
      paste: 'Paste the entire ingredient list here',
      parse: 'Parse ingredients',
      ingredient: 'Ingredient',
      amount: 'Amount',
      unit: 'Unit',
      addIngredient: 'Add ingredient',
    },
    instructions: {
      title: 'Add instructions',
      simplify: 'Simplified entry',
      paste: 'Paste the entire instruction set here',
      instructions: 'Instructions',
      parse: 'Parse instructions',
      instruction: 'Instruction',
      addInstruction: 'Add instruction',
    },
    preview: {
      title: 'Preview recipe',
      recipeTitle: 'Title',
      description: 'Description',
      noDescription: 'No description added for this recipe',
      categories: 'Categories',
      cuisines: 'Cuisines',
      includeWeekly: 'Include in weekly suggestions',
      yes: 'Yes',
      no: 'No',
      of: 'of',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
    },
    recipeDetailCard: {
      ingredients: 'Ingredients',
      instructions: 'Instructions',
      of: 'of'
    },
    homePage: {
      recipe: 'Recipes'
    },
  },
  sv: {
    navMenu: {
      home: 'Recept',
      admin: 'Admin',
      profile: 'Profil'
    },
    buttons: {
      next: "Nästa",
      back: 'Bakåt',
      preview: 'Granska',
      previewRecipe: 'Granska recept',
      submit: 'Spara',
      edit: 'Ändra recept',
    },
    footer: {
      codeGitHub: 'Länk till GitHub'
    },
    settings: {
      title: 'Välj språk'
    },
    navBar: {
      recipe: 'Recipe',
      list: 'List'
    },
    modal: {
      confirm: 'Bekräfta',
      cancel: 'Avbryt'
    },
    filter: {
      cuisines: 'Kök',
      category: 'Kategori',
      sort: 'Sortera'
    },
    metadata: {
      create: 'Skapa recept',
      weekly: 'Inkludera i veckolistor:',
      title: 'Recepttitel',
      description: 'Kort beskrivning',
      selectCategory: 'Välj kategorier',
      selectCuisine: 'Välj kök'
    },
    ingredients: {
      title: 'Lägg till',
      simplify: 'Förenklad',
      ingredients: 'Ingredienser',
      paste: 'Klistra in hela ingredienslistan här',
      parse: 'Formatera listan',
      ingredient: 'Ingrediens',
      amount: 'Mängd',
      unit: 'Enhet',
      addIngredient: 'Lägg till ingrediens',
    },
    instructions: {
      title: 'Lägg till',
      simplify: 'Förenklad',
      paste: 'Klistra in hela listan med instruktioner här',
      instructions: 'Instruktioner',
      parse: 'Formatera listan',
      instruction: 'Instruktion',
      addInstruction: 'Lägg till instruktion',
    },
    preview: {
      title: 'Förhandsgranska recept',
      recipeTitle: 'Titel',
      description: 'Beskrivning',
      noDescription: 'Ingen beskrivning tillagd för detta recept.',
      categories: 'Kategorier',
      cuisines: 'Kök',
      includeWeekly: 'Inkludera i veckolistor',
      yes: 'Ja',
      no: 'Nej',
      of: '',
      ingredients: 'Ingredienser',
      instructions: 'Instruktioner',
    },
    recipeDetailCard: {
      ingredients: 'Ingredienser',
      instructions: 'Instruktioner',
      of: ''
    },
    homePage: {
      recipe: 'Recept'
    },
  }
} as const

