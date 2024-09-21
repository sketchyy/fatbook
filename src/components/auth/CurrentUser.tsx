import { useAuth } from "@/context/Auth";
import Button from "@/components/ui/Button";
import { Level, LevelItem, LevelLeft, LevelRight } from "@/components/ui/Level";

function CurrentUser() {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    signOut();
  };

  const avatarUrl = user.user_metadata?.avatar_url;
  const displayName = user.user_metadata?.name
    ? user.user_metadata.name.split(" ")[0]
    : user.email;

  return (
    <Level>
      <LevelLeft className="level is-mobile mb-0">
        <LevelItem className="mr-2">
          <figure className="image">
            <img className="is-rounded" src={avatarUrl} alt="" />
          </figure>
        </LevelItem>
        <LevelItem className="mr-4">
          <div>Hello, {displayName}</div>
        </LevelItem>
      </LevelLeft>
      <LevelRight>
        <LevelItem>
          <Button color="link" className="mb-0" onClick={handleLogout}>
            Logout
          </Button>
        </LevelItem>
      </LevelRight>
    </Level>
  );
}

export default CurrentUser;
