import Button from "@/shared/components/atoms/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/atoms/dialog";
import { Typography } from "@/shared/components/atoms/Typography";
import type { User } from "@/pages/userMaster/components/organism/userDataTable";

interface UserDeleteDialogProps {
    open: boolean;
    title: string;
    user: User | null;
    onOpenChange: () => void;
    onConfirm: () => void;
}

const UserDeleteDialog = ({
    open,
    title,
    user,
    onOpenChange,
    onConfirm,
}: UserDeleteDialogProps) => {
    const name = user?.name ?? "";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {name ? (
                            <Typography component="p" variant="sm">
                                Are you sure you want to delete this{" "}
                                <Typography
                                    component="span"
                                    variant="sm"
                                    weight="semiBold"
                                    className="text-red-500"
                                >
                                    {name}
                                </Typography>
                                ?
                            </Typography>
                        ) : (
                            <Typography component="p" variant="sm">
                                Are you sure you want to delete this user?
                            </Typography>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-row justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange()}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        className="cursor-pointer bg-red-500 text-white hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserDeleteDialog;
