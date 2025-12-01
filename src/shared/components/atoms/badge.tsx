import {
  Badge as BadgeShadcn,
  type BadgeProps,
} from "@/shared/components/shadcn/badge";

const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <BadgeShadcn className={className} {...props}>
      {children}
    </BadgeShadcn>
  );
};

export default Badge;
