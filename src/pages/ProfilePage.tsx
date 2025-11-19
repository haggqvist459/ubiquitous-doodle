
import { useAppSelector } from "@/redux/hooks";
import { PageContainer, Heading, LoadingComponent, Input, SignOut } from "@/components";
import { useLanguage } from "@/contexts";
import { translateText } from "@/utils";

const ProfilePage = () => {

  const favourites = useAppSelector(state => state.favourites.favouriteList)
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
          <div className="w-full h-72 overflow-y-auto mb-2 border-b border-red-600">
            {favourites.length === 0 ? (
              <LoadingComponent height="" />
            ) : (
              favourites.map(favourite => (
                <div className="flex flex-col border-b my-2" key={favourite.recipeId}>
                  <span className="font-medium text-primary-text">{favourite.title}</span>
                  <span className="font-light text-primary-text">
                    {new Date(favourite.createdAt).toLocaleDateString()}
                  </span>
                </div>
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