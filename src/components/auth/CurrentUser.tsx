import { useAuth } from "@/context/Auth";
import Button from "@/components/ui/Button";

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
    <div className="level is-mobile">
      <div className="level-left level is-mobile mb-0">
        <div className="level-item mr-2">
          <figure className="image">
            <img className="is-rounded" src={avatarUrl} alt="" />
          </figure>
        </div>
        <div className="level-item mr-4">
          <div>Hello, {displayName}</div>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <Button color="link" className="mb-0" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CurrentUser;
