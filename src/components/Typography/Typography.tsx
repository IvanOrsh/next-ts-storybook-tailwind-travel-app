import { PropsWithChildren } from "react";

import classNames from "classnames";

/*
xs: ["12px", "18px"],
sm: ["14px", "20px"],
md: ["16px", "24px"],
lg: ["18px", "28px"],
xl: ["20px", "30px"],

h6: ["24px", "32px"],
h5: ["30px", "38px"],
h4: ["36px", "44px"],
h3: ["48px", "60px"],
h2: ["60px", "72px"],
h1: ["72px", "90px"],
*/

type TypographyVariant =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "h6"
  | "h5"
  | "h4"
  | "h3"
  | "h2"
  | "h1";

type TypographyWeightOption = "regular" | "medium" | "semibold" | "bold";

type TypographyWeightValue = `font-${TypographyWeightOption}`;

export interface TypographyProps {
  variant: TypographyVariant;
  customColor?: string;
  customWeight?: TypographyWeightOption;
  className?: string;
}

const TypographyVariantClasses: Record<TypographyVariant, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  h6: "text-h6",
  h5: "text-h5",
  h4: "text-h4",
  h3: "text-h3",
  h2: "text-h2",
  h1: "text-h1",
};

const TypographyWeightClasses: Record<
  TypographyWeightOption,
  TypographyWeightValue
> = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const Typography = ({
  variant = "md",
  customColor,
  customWeight = "regular",
  className,
  children,
}: PropsWithChildren<TypographyProps>) => {
  const TypographyVariantClassName = TypographyVariantClasses[variant];
  const TypographyWeightClassName = TypographyWeightClasses[customWeight];

  // h1-h6 should have corresponding component
  // others should be p
  const isHeading = variant.startsWith("h");
  const Component = (isHeading ? variant : "p") as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={classNames(
        TypographyVariantClassName,
        TypographyWeightClassName,
        className,
        {
          ["tracking-tight"]: ["h1", "h2", "h3"].includes(variant),
          ["text-black dark:text-white"]: !customColor,
        },
        customColor
      )}
    >
      {children}
    </Component>
  );
};

export default Typography;
