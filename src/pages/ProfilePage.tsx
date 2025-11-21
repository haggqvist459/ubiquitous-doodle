
import { PageContainer, Heading, LoadingComponent, Input, SignOut } from "@/components";
import { FavouriteListItem } from "@/features/favourites";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";
import { useFavourites } from "@/features/favourites";

const ProfilePage = () => {

  const  favourites = useFavourites()
  const { language } = useLanguage()
  
  return (
    <PageContainer>
      <div className="my-5 px-5 flex justify-between items-center">
        <Heading title={translateText("profile", 'title', language)} />
        <div onClick={() => { }}>
          <SignOut />
        </div>
      </div>
      <div className="h-[80vh] flex flex-col">
        <div className="flex-shrink-0 px-5">
          <Heading title={translateText('profile', 'favouriteRecipes', language)} headingType="sub-heading" />
          <div className="w-full h-72 overflow-y-auto mb-2">
            {favourites.length === 0 ? (
              <LoadingComponent height="" />
            ) : (
              favourites.map(favourite => (
                <FavouriteListItem favourite={favourite} key={favourite.recipeId}/>
              ))
            )}
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="flex flex-col space-y-5 px-5 lg:flex-row lg:space-x-4">
            <div className="space-y-2 mt-5">
              <Heading title={translateText('profile', 'changeEmail', language)} headingType="sub-heading" />
              <Input
                id="newEmail"
                label={translateText('profile', 'newEmail', language)}
                placeholder="..."
                onChange={() => { }}
                value=""
              />
            </div>
            <div className="space-y-2">
              <Heading title={translateText('profile', 'updatePassword', language)} headingType="sub-heading" />
              <Input
                id="newPassword"
                label={translateText('profile', 'newPassword', language)}
                placeholder="..."
                onChange={() => { }}
                value=""
              />
              <Input
                id="confirmPassword"
                label={translateText('profile', 'confirmPassword', language)}
                placeholder="..."
                onChange={() => { }}
                value=""
              />
            </div>
            <div className="space-y-2">
              <Heading title={translateText('profile', 'validateChanges', language)} headingType="sub-heading" />
              <Input
                id="currentPassword"
                label={translateText('profile', 'currentPassword', language)}
                placeholder="..."
                onChange={() => { }}
                value=""
              />
            </div>
            <button
              className="w-full rounded bg-primary border border-primary hover:border-primary-text"
            >
              {translateText('buttons', 'confirm', language)}
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ProfilePage;