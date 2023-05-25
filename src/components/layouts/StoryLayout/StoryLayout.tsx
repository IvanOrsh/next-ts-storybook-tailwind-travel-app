import { PropsWithChildren } from "react";

import classNames from "classnames";

import RootLayout from "../../../app/layout";

type StoryArgsProps = {
  darkMode: boolean;
  className: string;
  noPadding?: boolean;
};

const StoryLayout = (args: PropsWithChildren<StoryArgsProps>) => {
  return (
    <RootLayout>
      <div
        className={classNames({ "dark bg-gray-900": args.darkMode }, "-m-4")}
      >
        <div className={classNames(args.className, { "p-4": args.noPadding })}>
          {args.children}
        </div>
      </div>
    </RootLayout>
  );
};

export default StoryLayout;
