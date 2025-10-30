import { useState, useEffect } from 'react'
import { PageContainer, Header } from "@/components";
import { RecipeList } from "@/features/recipeList/components";


const HomePage = () => {

  const [recipeList, setRecipeList] = useState([])
  const [loading, setLoading] = useState(false)
  

  return (
    <PageContainer>
      <Header title="Recipes"/>
      <RecipeList />
    </PageContainer>
  );
  
}

export default HomePage;