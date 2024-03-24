import { useAuth } from "@/contexts/Auth";

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
      <div className="level-left">
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
          <button className="button is-link  mb-0" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CurrentUser;
