import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import UserMasterFilterPopover from "@/pages/userMaster/components/organism/userMasterFilterPopover";
import type { User } from "@/pages/userMaster/components/organism/userDataTable";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";

interface UsersMasterSectionProps {
  onAdd: () => void;
  users: User[];
  onFiltersChange: (users: User[]) => void;
}

const UsersMasterSectionHeader = ({
  onAdd,
  users,
  onFiltersChange,
}: UsersMasterSectionProps) => {
  return (
    <div className="module-header">
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "3xl",
          weight: "bold",
          text: "Users Master",
        }}
      />

      <div className="module-header-buttons">
        <UserMasterFilterPopover
          users={users}
          onFiltersChange={onFiltersChange}
        />
        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New User"
          onClick={onAdd}
        />
      </div>
    </div>
  );
};

export default UsersMasterSectionHeader;
