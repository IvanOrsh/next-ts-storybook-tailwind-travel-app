import { images } from "../data/images";

type UserAvatarProps = {
  darkMode: boolean;
};

export const UserAvatar = () => {
  return (
    // image, user info - flex-direction: row;
    <div className="w-70 ml-6 mt-6 flex">
      <img
        src={images.demoAvatar}
        alt="avatar"
        className="h-10 w-10 cursor-pointer select-none rounded-full"
      />
      {/* use info: flex-direction: column */}
      <div className="ml-3 flex flex-col justify-between">
        <p className="text-sm font-medium text-gray-700 dark:text-white">
          Veronica Woods
        </p>
        <p className="text-sm font-normal text-gray-500 dark:text-white">
          veronica@example.com
        </p>
      </div>
    </div>
  );
};
